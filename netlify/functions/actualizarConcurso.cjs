const AWS = require("aws-sdk");
const XLSX = require("xlsx");
require("dotenv").config(); // para desarrollo local

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || "us-east-1";
const FILE_KEY = "Concurso.xlsx";

if (process.env.MY_AWS_ACCESS_KEY_ID && process.env.MY_AWS_SECRET_ACCESS_KEY) {
    AWS.config.update({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        region: REGION,
    });
} else {
    AWS.config.update({ region: REGION });
}

const s3 = new AWS.S3();

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
    console.log("📥 Petición recibida en registrarParticipacion.cjs");

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers: corsHeaders, body: "OK" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Método no permitido. Usa POST." }),
        };
    }

    if (!event.body) {
        return {
            statusCode: 400,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Falta el body." }),
        };
    }

    try {
        const { participante } = JSON.parse(event.body);

        if (!participante?.Codigo || !participante?.Instagram || !participante?.Email || !participante?.Telefono) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ message: "Faltan campos obligatorios: Codigo, Instagram, Email, Telefono." }),
            };
        }

        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        const workbook = XLSX.read(s3Data.Body, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const hoja = workbook.Sheets[sheetName];
        let filas = XLSX.utils.sheet_to_json(hoja);

        let encontrado = false;
        filas = filas.map((fila) => {
            if (fila.Codigo?.toString().toUpperCase().trim() === participante.Codigo.toUpperCase().trim()) {
                encontrado = true;
                return {
                    ...fila,
                    Participa: 1,
                    Instagram: participante.Instagram,
                    Email: participante.Email,
                    Telefono: participante.Telefono,
                };
            }
            return fila;
        });

        if (!encontrado) {
            return {
                statusCode: 404,
                headers: corsHeaders,
                body: JSON.stringify({ message: "Código no encontrado en el Excel." }),
            };
        }

        const nuevaHoja = XLSX.utils.json_to_sheet(filas);
        workbook.Sheets[sheetName] = nuevaHoja;

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: buffer,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }).promise();

        console.log("✅ Participación registrada con éxito");

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Participación registrada correctamente." }),
        };
    } catch (error) {
        console.error("❌ Error:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Error al registrar participación." }),
        };
    }
};
