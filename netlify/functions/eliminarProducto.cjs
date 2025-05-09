const AWS = require("aws-sdk");
const xlsx = require("xlsx");
require("dotenv").config(); // para entorno local

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || "us-east-1";
const FILE_KEY = "Productos.xlsx"; // ✅ Excel de productos

if (process.env.MY_AWS_ACCESS_KEY_ID && process.env.MY_AWS_SECRET_ACCESS_KEY) {
    AWS.config.update({
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
        region: REGION,
    });
} else {
    AWS.config.update({ region: REGION }); // producción
}

const s3 = new AWS.S3();

const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async function (event) {
    console.log("📥 Petición recibida en eliminarProducto.cjs");

    if (event.httpMethod === "OPTIONS") {
        return { statusCode: 200, headers, body: "OK" };
    }

    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ message: "Método no permitido. Usa POST." }),
        };
    }

    const { IdProducto } = JSON.parse(event.body || "{}");

    if (!IdProducto) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ message: "Falta el campo IdProducto" }),
        };
    }

    try {
        const file = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        console.log("📥 Archivo Excel descargado");

        const workbook = xlsx.read(file.Body);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        console.log(`📊 Total de filas en Excel: ${data.length}`);

        console.log("🗑️ Eliminando producto con IdProducto:", IdProducto);

        const actualizados = data.filter(row => row.IdProducto !== IdProducto);

        console.log(`🧹 Filas después de eliminar: ${actualizados.length}`);

        const newSheet = xlsx.utils.json_to_sheet(actualizados);
        const newWorkbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(newWorkbook, newSheet, sheetName);
        const buffer = xlsx.write(newWorkbook, { bookType: "xlsx", type: "buffer" });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: buffer,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }).promise();

        console.log("✅ Excel actualizado y subido");

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "Producto eliminado correctamente" }),
        };
    } catch (error) {
        console.error("❌ Error al eliminar producto:", error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ message: "Error al eliminar producto", error: error.message }),
        };
    }
};
