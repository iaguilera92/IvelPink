import { Box, Typography, Chip, LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useMotionValue, animate } from "framer-motion";
import { useEffect, useState } from "react";

const BarraAnimada = ({ stockActual, stockSolicitado }) => {
  const progress = useMotionValue(0);
  const [valor, setValor] = useState(0);

  const ratio = stockSolicitado > 0 ? stockActual / stockSolicitado : 0;
  const progressValue = Math.min(100, Math.round(ratio * 100));

  const getGradient = (val) => {
    if (val < 20) return "linear-gradient(90deg,#ff8a80,#e57373)";
    if (val < 30) return "linear-gradient(90deg,#ef5350,#e53935)";
    if (val < 70) return "linear-gradient(90deg,#ffb74d,#fb8c00)";
    return "linear-gradient(90deg,#81c784,#388e3c)";
  };

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setValor(latest);
    });

    const controls = animate(progress, progressValue, {
      delay: 0.5,
      duration: 2,
      ease: "easeInOut"
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [progressValue]);

  return (
    <Box>
      <LinearProgress
        variant="determinate"
        value={valor}
        sx={{
          height: 15,
          borderRadius: 6,
          bgcolor: "rgba(0,0,0,.08)",
          overflow: "hidden",
          "& .MuiLinearProgress-bar": {
            borderRadius: 6,
            background: `${getGradient(valor)} !important`,
            transition: "transform 0.6s ease-in-out",
          },
        }}
      />
    </Box>
  );
};

const Trabajos = ({ trabajo }) => {
  const stockActual = Number(trabajo.StockActual) || 0;
  const stockSolicitado = Number(trabajo.StockSolicitado) || 0;

  const completado = stockActual >= stockSolicitado;
  const iniciando = stockActual === 0;
  const ratio = stockSolicitado > 0 ? stockActual / stockSolicitado : 0;
  const enUltimosAjustes = !completado && ratio >= 0.7; // 👈 nuevo estado
  const enCurso = !iniciando && !completado && !enUltimosAjustes;


  const getColor = () => {
    if (completado) return "#2e7d32";      // verde
    if (enUltimosAjustes) return "#388e3c"; // verde más oscuro
    if (iniciando) return "#ef5350";       // rojo
    if (enCurso) return "#ef6c00";         // naranjo
    return "#757575";
  };

  return (
    <Box sx={{ mb: 0 }}>
      {/* Cabecera */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.75,
          gap: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.6, // espacio entre texto y logo
            maxWidth: { xs: "65%", sm: "75%" },
            overflow: "hidden"
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              color: "#4E342E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={trabajo.Trabajo}
          >
            {trabajo.Trabajo}
          </Typography>

          {trabajo.TipoTrabajo === 1 && (
            <Box
              component="img"
              src="/logo-ivelpink.png"
              alt="logo ivelpink"
              sx={{
                width: 55,
                height: 15,
                marginTop: -0.1,
                flexShrink: 0, // evita que se achique
              }}
            />
          )}
        </Box>


        <Chip
          size="small"
          icon={
            completado ? (
              <CheckCircleIcon sx={{ fontSize: 13 }} />
            ) : enUltimosAjustes ? (
              <HourglassBottomIcon sx={{ fontSize: 13 }} />
            ) : iniciando ? (
              <ErrorOutlineIcon sx={{ fontSize: 13 }} />
            ) : (
              <HourglassBottomIcon sx={{ fontSize: 13 }} />
            )
          }
          label={
            completado
              ? "Completado"
              : enUltimosAjustes
                ? "Finalizando"
                : iniciando
                  ? "Iniciando"
                  : "En Proceso"
          }
          sx={{
            fontSize: "0.65rem",
            height: 20,
            fontWeight: 600,
            bgcolor: completado
              ? "rgba(46,125,50,0.15)"
              : enUltimosAjustes
                ? "rgba(56,142,60,0.15)"
                : iniciando
                  ? "rgba(229,115,115,0.2)"
                  : "rgba(251,140,0,0.15)",
            color: getColor(),
            "& .MuiChip-icon": {
              fontSize: 16,
              marginLeft: "-2px",
              color: "inherit",
            },
            "& .MuiChip-label": {
              px: 0.6,
            },
          }}
        />

      </Box>

      {/* Barra */}
      <BarraAnimada stockActual={stockActual} stockSolicitado={stockSolicitado} />

      {/* Footer */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 0.5,
          px: 0.2,
        }}
      >
        <Typography
          variant="caption"
          sx={{ fontWeight: 600, color: getColor() }}
        >
          {completado
            ? "🎉 ¡Listo!"
            : enUltimosAjustes
              ? "✂️ Últimos ajustes"
              : enCurso
                ? "🧵 En costura"
                : "🪡 Iniciando"}
        </Typography>

        <Typography
          variant="caption"
          sx={{ fontWeight: 700, color: getColor() }}
        >
          {stockActual}/{stockSolicitado}
        </Typography>
      </Box>
    </Box>
  );
};

export default Trabajos;
