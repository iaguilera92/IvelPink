import * as XLSX from "xlsx";

// Función para transformar cada fila en un producto válido
function transformarProductos(data) {
  return data.map((row) => ({
    IdProducto: Number(row["IdProducto"]),
    NombreProducto: row["NombreProducto"],
    Descripcion: row["Descripcion"] || "",
    Valor: Number(row["Valor"]) || 0,
    Stock: Number(row["Stock"]) || 0,
    ImageUrl: row["ImageUrl"] || "",
    ConDescuento: String(row["ConDescuento"]).toLowerCase() === "true",
    VideoUrl: row["VideoUrl"] || "",
    Orden: Number(row["Orden"]) || 9999,
  }));
}

// Función principal exportada
export const cargarProductos = async (urlExcel) => {
  try {
    const response = await fetch(urlExcel);
    if (!response.ok) throw new Error("No se pudo obtener el archivo Excel");

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(hoja);

    return transformarProductos(jsonData);
  } catch (error) {
    console.error("❌ Error al cargar productos desde el Excel:", error);
    return [];
  }
};
