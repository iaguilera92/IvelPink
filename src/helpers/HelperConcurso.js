import * as XLSX from "xlsx";

// Parsea el Excel de Concurso en estructura simple por IdConcurso
function parsearConcurso(data) {
  const concursos = new Map();

  for (const row of data) {
    const id = row["IdConcurso"];
    if (!concursos.has(id)) {
      concursos.set(id, {
        IdConcurso: id,
        CodigoConcurso: row["CodigoConcurso"],
        InstagramParticipante: row["InstagramParticipante"] || "",
        CorreoParticipante: row["CorreoParticipante"] || "",
        TelefonoParticipante: row["TelefonoParticipante"] || "",
        Participa: row["Participa"] || 0,
        FechaRegistro: row["FechaRegistro"] || "",
        Ganador: row["Ganador"] || 0,
        Notificado: row["Notificado"] || 0,
      });
    }
  }

  return Array.from(concursos.values());
}

// Carga y busca si un código existe en el Excel
export const ValidarCodigoConcurso = async (urlExcel, codigoInput) => {
  try {
    const response = await fetch(urlExcel);
    if (!response.ok) throw new Error("No se pudo obtener el archivo Excel");

    const arrayBuffer = await response.arrayBuffer();
    const data = new Uint8Array(arrayBuffer);
    const workbook = XLSX.read(data, { type: "array" });

    const hoja = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(hoja);

    const concursos = parsearConcurso(jsonData);
    const codigo = codigoInput.trim().toUpperCase();

    const match = concursos.find(c => c.CodigoConcurso?.toUpperCase() === codigo);
    return match || null;
  } catch (error) {
    console.error("❌ Error al validar código de concurso:", error);
    return null;
  }
};
