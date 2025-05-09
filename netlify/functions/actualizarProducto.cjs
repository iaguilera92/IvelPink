const AWS = require("aws-sdk");
const XLSX = require("xlsx");
require("dotenv").config(); // para local

const BUCKET_NAME = process.env.BUCKET_NAME;
const REGION = process.env.MY_AWS_REGION || "us-east-1";
const FILE_KEY = "Productos.xlsx"; // <-- adaptado al nuevo archivo

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
    console.log("📥 Petición recibida en actualizarProducto.cjs");

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
            body: JSON.stringify({ message: "Falta el body" }),
        };
    }

    try {
        const { producto } = JSON.parse(event.body);
        const id = producto.IdProducto;

        if (!id || !producto.NombreProducto) {
            return {
                statusCode: 400,
                headers: corsHeaders,
                body: JSON.stringify({ message: "Falta el IdProducto o NombreProducto" }),
            };
        }

        console.log("✅ Producto recibido:", producto.NombreProducto, "-", id);

        const s3Data = await s3.getObject({ Bucket: BUCKET_NAME, Key: FILE_KEY }).promise();
        const workbook = XLSX.read(s3Data.Body, { type: "buffer" });
        const hoja = workbook.Sheets[workbook.SheetNames[0]];
        let datos = XLSX.utils.sheet_to_json(hoja);

        // 🔁 Filtrar el producto anterior
        datos = datos.filter(row => row["IdProducto"] !== id);

        // ✅ Insertar el nuevo producto
        const nuevoProducto = {
            IdProducto: id,
            NombreProducto: producto.NombreProducto,
            Descripcion: producto.Descripcion,
            Valor: producto.Valor,
            Stock: producto.Stock,
            ImageUrl: producto.ImageUrl,
            ConDescuento: producto.ConDescuento ? true : false,
            VideoUrl: producto.VideoUrl || ""
        };

        datos.push(nuevoProducto);

        // Sobrescribir Excel
        const nuevaHoja = XLSX.utils.json_to_sheet(datos);
        workbook.Sheets[workbook.SheetNames[0]] = nuevaHoja;
        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        await s3.putObject({
            Bucket: BUCKET_NAME,
            Key: FILE_KEY,
            Body: buffer,
            ContentType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }).promise();

        console.log("✅ Producto actualizado exitosamente.");

        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Producto actualizado exitosamente." }),
        };
    } catch (error) {
        console.error("❌ Error al actualizar:", error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ message: "Error al actualizar el producto en S3" }),
        };
    }
};