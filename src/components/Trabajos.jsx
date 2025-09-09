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
    const unsubscribe = progress.on("change", (latest) => setValor(latest));
    const controls = animate(progress, progressValue, {
      delay: 0.3,
      duration: 1.5,
      ease: "easeInOut",
    });
    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [progressValue]);

  return (
    <LinearProgress
      variant="determinate"
      value={valor}
      sx={{
        height: 8,
        borderRadius: 4,
        bgcolor: "rgba(0,0,0,.06)",
        position: "relative",
        overflow: "hidden",
        "& .MuiLinearProgress-bar": {
          borderRadius: 4,
          backgroundImage: getGradient(valor),
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          transition: "transform 1s ease-in-out 0.5s",
        },
        ...(valor >= 70 && {
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-40%",
            width: "40%",
            height: "100%",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.5) 50%, rgba(255,255,255,0) 100%)",
            animation: "shine 2.5s infinite",
          },
        }),
        "@keyframes shine": {
          "0%": { left: "-40%" },
          "100%": { left: "120%" },
        },
      }}
    />
  );
};

const Trabajos = ({ trabajo }) => {
  const stockActual = Number(trabajo.StockActual) || 0;
  const stockSolicitado = Number(trabajo.StockSolicitado) || 0;

  const ratio = stockSolicitado > 0 ? stockActual / stockSolicitado : 0;
  const porcentaje = Math.min(100, Math.round(ratio * 100));

  const completado = stockActual >= stockSolicitado && stockSolicitado > 0;
  const iniciando = stockActual === 0;
  const enUltimosAjustes = !completado && ratio >= 0.7;
  const enCurso = !iniciando && !completado && !enUltimosAjustes;

  const getColor = () => {
    if (completado) return "#2e7d32";
    if (enUltimosAjustes) return "#388e3c";
    if (iniciando) return "#ef5350";
    if (enCurso) return "#ef6c00";
    return "#757575";
  };

  return (
    <Box sx={{ mb: 0.5 }}>
      {/* Cabecera */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 0.5,
          gap: 0.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            maxWidth: { xs: "65%", sm: "75%" },
            overflow: "hidden",
          }}
        >
          <Typography
            sx={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#4E342E",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
            }}
            title={trabajo.Trabajo}
          >
            {trabajo.Trabajo}
            {completado && (
              <Box component="span" sx={{ ml: "-1px" }}>
                🌷
              </Box>
            )}
          </Typography>



          {trabajo.TipoTrabajo === 1 && (
            <Box
              component="img"
              src="/logo-ivelpink.png"
              alt="logo ivelpink"
              sx={{
                width: 48,
                height: 13,
                ml: -0.3,
                mt: "-1px",
                flexShrink: 0,
              }}
            />
          )}
        </Box>

        <Chip
          size="small"
          icon={
            completado ? (
              <CheckCircleIcon sx={{ fontSize: 11 }} />
            ) : enUltimosAjustes ? (
              <HourglassBottomIcon sx={{ fontSize: 11 }} />
            ) : iniciando ? (
              <ErrorOutlineIcon sx={{ fontSize: 11 }} />
            ) : (
              <HourglassBottomIcon sx={{ fontSize: 11 }} />
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
            fontWeight: 500,
            height: 18,
            bgcolor: completado
              ? "rgba(46,125,50,0.15)"
              : enUltimosAjustes
                ? "rgba(56,142,60,0.15)"
                : iniciando
                  ? "rgba(229,115,115,0.2)"
                  : "rgba(251,140,0,0.15)",
            color: getColor(),
            "& .MuiChip-icon": {
              color: "inherit",
              fontSize: 11,
              ml: "4px",
              mr: "-6px",
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
          mt: 0.4,
          px: 0.2,
        }}
      >
        <Typography
          sx={{ fontSize: "0.7rem", fontWeight: 500, color: getColor() }}
        >
          {completado
            ? "🏭 En producción"
            : enUltimosAjustes
              ? "✂️ Últimos ajustes"
              : enCurso
                ? "🧵 En costura"
                : "🪡 Iniciando"}
        </Typography>

        <Typography
          sx={{ fontSize: "0.7rem", fontWeight: 600, color: getColor() }}
        >
          {stockActual}/{stockSolicitado}
        </Typography>
      </Box>
    </Box>
  );
};

export default Trabajos;
