// DialogTrabajos.jsx
import React, { useEffect, useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  IconButton, Slide, Chip, LinearProgress,
  Box, Button, Typography, useTheme, useMediaQuery
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import Trabajos from "./Trabajos";
import { cargarTrabajos } from "../helpers/HelperTrabajos";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function RelojAnimado() {
  return (
    <Box
      sx={{
        position: "relative",
        width: 28,
        height: 28,
        borderRadius: "50%",
        border: "2px solid #ff5e9d", // 🌸 borde rosado fuerte
        bgcolor: "#fff0f6", // 💗 fondo rosado pastel
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 6px rgba(0,0,0,.2) inset, 0 0 6px rgba(255,94,157,.4)", // glow rosado
      }}
    >
      {/* Aguja */}
      <Box
        sx={{
          position: "absolute",
          width: 2,
          height: "40%",
          bgcolor: "#ff4081", // 🌸 aguja vibrante
          borderRadius: 1,
          bottom: "50%",           // ⬅️ anclamos al centro exacto
          left: "47%",
          transform: "translateX(-50%)",
          transformOrigin: "bottom center", // pivote en el centro del reloj
          animation: "spin 5s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "translateX(-50%) rotate(0deg)" },
            "100%": { transform: "translateX(-50%) rotate(360deg)" },
          },
        }}
      />

      {/* Centro */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 6,
          height: 6,
          borderRadius: "50%",
          bgcolor: "#ff4081",
          transform: "translate(-50%, -50%)",
          zIndex: 2,
        }}
      />
    </Box>
  );
}


const ContadorAnimado = ({ value, delay = 0.5, duration = 2 }) => {
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    // Suscripción a cambios
    const unsubscribe = count.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });

    // Animación
    const controls = animate(count, value, {
      duration,
      delay,
      ease: "easeOut",
    });

    return () => {
      unsubscribe();
      controls.stop();
    };
  }, [value, delay, duration]);

  return <span>{display}</span>;
};


export default function DialogTrabajos({
  open,
  onClose,
  trabajos = [],
  primaryLabel = "Ver Servicios",
  onPrimaryClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [armed, setArmed] = React.useState(false);
  const [localTrabajos, setLocalTrabajos] = useState(trabajos);

  const mayoristas = localTrabajos.filter(t => t.TipoTrabajo === 2).length;
  const confeccionesIvelPink = localTrabajos.filter(t => t.TipoTrabajo === 1).length;
  const [showContent, setShowContent] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const ultimaFecha = React.useMemo(() => {
    if (!localTrabajos.length) return null;

    const ultimaFechaReal = new Date(
      Math.max(...localTrabajos.map(t => new Date(t.FechaCreacion).getTime()))
    );

    const hoy = new Date();
    const limite = new Date(hoy);
    limite.setDate(hoy.getDate() - 3);

    const fechaFinal = ultimaFechaReal < limite ? limite : ultimaFechaReal;
    return fechaFinal.toLocaleDateString("es-CL");
  }, [localTrabajos]);



  //EXPANSIÓN
  useEffect(() => {
    let timer;
    if (open) {
      setShowContent(true);
      setExpanded(false);
      timer = setTimeout(() => setExpanded(true), 2000);
    } else {
      setShowContent(false);
    }
    return () => clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    let t;
    if (open) {
      setArmed(false); // reset
      t = setTimeout(() => setArmed(true), 600); // espera cada vez que se abre
    }
    return () => clearTimeout(t);
  }, [open]);

  // ACTUALIZAR TRABAJOS S3
  useEffect(() => {
    if (open) {
      const timestamp = Date.now();
      cargarTrabajos(
        `https://ivelpink.s3.us-east-2.amazonaws.com/Trabajos.xlsx?t=${timestamp}`
      ).then((data) => {
        // 🔹 Filtrar solo los trabajos activos (Estado = 1)
        const activos = data.filter(t => Number(t.Estado) === 1);
        setLocalTrabajos(activos);
      });
    }
  }, [open]);


  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      scroll="body"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          mt: { xs: 0, sm: -3 },
          borderRadius: 2,
          border: "1px solid white",
          boxShadow: "0 24px 64px rgba(0,0,0,.45)",
          overflow: "hidden",
          "& .MuiDialogContent-root": { marginTop: 0 },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "#FFF",
          fontFamily: "'Poppins', sans-serif",
          py: { xs: 1, sm: 1.5 },
          borderBottom: "1px solid rgba(255,167,38,.35)",
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/fondo-celeste.avif')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 0,

            // Desktop
            backgroundSize: "130%",
            animation: "zoomInDesktop 2.5s ease-out forwards",

            // Mobile override
            "@media (max-width:600px)": {
              backgroundSize: "250%",              // 👈 inicia súper cerca
              animation: "zoomInMobile 2.5s ease-out forwards",
            },

            "@keyframes zoomInDesktop": {
              "0%": { backgroundSize: "150%" },
              "100%": { backgroundSize: "110%" },
            },
            "@keyframes zoomInMobile": {
              "0%": { backgroundSize: "270%" },   // 👈 más zoom inicial en mobile
              "100%": { backgroundSize: "140%" }, // 👈 termina aún con presencia
            },
          },

          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.45)", // overlay oscuro
            zIndex: 1,
          },

          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >

        {/* Botón cerrar */}
        <IconButton
          aria-label="Cerrar"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#FFF",
            zIndex: 4, // 👈 más arriba que ::before y ::after
            "&:hover": { backgroundColor: "rgba(255,255,255,.15)" },

            // animación al abrir
            animation: open ? "spinTwice 0.6s ease-in-out" : "none",
            animationFillMode: "forwards",
            "@keyframes spinTwice": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(720deg)" },
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>


        {/* Fila: ícono reloj + título */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 3,
            gap: { xs: 0.8, sm: 1.2 }, // más compacto en mobile
            px: { xs: 1.2, sm: 2 },
            py: { xs: 0.5, sm: 0.8 },
            borderRadius: "999px",
            bgcolor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 14px rgba(0,0,0,.35)",
          }}
        >
          <RelojAnimado />
          <Typography
            variant="h6" // 👈 más chico que h5
            component="span"
            sx={{
              fontWeight: 800,
              letterSpacing: { xs: "0.3px", sm: "1px" },
              fontFamily: "'Poppins', sans-serif",
              color: "#fff",
              fontSize: { xs: "1rem", sm: "1.25rem" }, // ajuste fino
            }}
          >
            Confecciones Activas
          </Typography>
        </Box>



        {localTrabajos.length > 0 ? (
          <Box
            sx={{
              mt: isMobile ? 0.5 : 1,
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              flexDirection: "row",
              flexWrap: "nowrap",
            }}
          >
            {/* Mayoristas */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: 120, sm: 160 }, // más pequeño en mobile
                textAlign: "center",
                px: { xs: 1, sm: 2 },
                py: { xs: 1.2, sm: 2 },
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(100,181,246,0.9), rgba(3,169,244,0.7))",
                // 💧 celeste claro → aqua
                boxShadow: {
                  xs: "0 4px 14px rgba(0,0,0,.25), 0 0 12px rgba(100,181,246,.45)",
                  sm: "0 6px 20px rgba(0,0,0,.35), 0 0 16px rgba(3,169,244,.5)",
                },
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 55, sm: 70 },
                  height: { xs: 55, sm: 70 },
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.15)",
                  border: { xs: "2px solid #fff", sm: "3px solid #fff" },
                  mb: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: "#fff",
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  <ContadorAnimado value={mayoristas} delay={0.5} duration={2} />
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.59rem", sm: "0.875rem" },
                }}
              >
                Mayoristas en producción
              </Typography>
            </Box>

            {/* confeccionesIvelPink */}
            <Box
              sx={{
                flex: 1,
                minWidth: { xs: 120, sm: 160 }, // más pequeño en mobile
                textAlign: "center",
                px: { xs: 1, sm: 2 },
                py: { xs: 1.2, sm: 2 },
                borderRadius: 3,
                background: "linear-gradient(135deg, rgba(100,181,246,0.9), rgba(3,169,244,0.7))",
                boxShadow: {
                  xs: "0 4px 14px rgba(0,0,0,.25), 0 0 12px rgba(100,181,246,.45)",
                  sm: "0 6px 20px rgba(0,0,0,.35), 0 0 16px rgba(3,169,244,.5)",
                },
                color: "#fff",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: { xs: 55, sm: 70 },
                  height: { xs: 55, sm: 70 },
                  borderRadius: "50%",
                  bgcolor: "rgba(255,255,255,0.15)",
                  border: { xs: "2px solid #fff", sm: "3px solid #fff" },
                  mb: 1,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 900,
                    color: "#fff",
                    fontSize: { xs: "1.5rem", sm: "2rem" },
                  }}
                >
                  <ContadorAnimado value={confeccionesIvelPink} delay={0.5} duration={2} />
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  whiteSpace: "nowrap",
                  fontSize: { xs: "0.59rem", sm: "0.875rem" },
                }}
              >
                Confecciones IvelPink
              </Typography>
            </Box>

          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{
              color: "#5D4037",
              mt: 2,
              display: "block",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            Sin trabajos activos por ahora
          </Typography>
        )}




      </DialogTitle>

      <AnimatePresence>
        {showContent && (
          <motion.div
            key="dialogContent"
            initial={false}
            animate={expanded ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            style={{ overflow: "hidden" }} // evita que se vea raro al colapsar
          >
            <DialogContent
              sx={{
                background: "linear-gradient(180deg, #E3F2FD 0%, #E1F5FE 100%)",
                py: 0.5,
                px: 1.2,
                mb: 0,
              }}
            >
              <Box sx={{ mt: { xs: 0.5, sm: 0.5 } }}>
                {localTrabajos
                  .slice()
                  .sort((a, b) => {
                    if (a.TipoTrabajo === 1 && b.TipoTrabajo !== 1) return 1;
                    if (a.TipoTrabajo !== 1 && b.TipoTrabajo === 1) return -1;

                    if (a.TipoTrabajo === 2 && b.TipoTrabajo !== 2) return -1;
                    if (a.TipoTrabajo !== 2 && b.TipoTrabajo === 2) return 1;

                    const ratioA = a.StockSolicitado > 0 ? a.StockActual / a.StockSolicitado : 0;
                    const ratioB = b.StockSolicitado > 0 ? b.StockActual / b.StockSolicitado : 0;

                    return ratioA - ratioB;
                  })
                  .map((t) => {
                    const completado = t.StockSolicitado > 0 && t.StockActual >= t.StockSolicitado;
                    return (
                      <Box
                        key={`${t.Trabajo}-${t.Id}`}
                        sx={{
                          border: "1px solid rgba(25,118,210,0.25)",
                          borderRadius: 1,
                          py: 0.3,
                          px: 1.2,
                          background: completado
                            ? "linear-gradient(180deg, #ffeef5 0%, #ffffff 100%)"
                            : "#fff",

                          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                          mb: 0.4,
                        }}
                      >
                        <Trabajos trabajo={t} />
                      </Box>
                    );
                  })}
              </Box>

              {/* Fecha última actualización */}
              {ultimaFecha && (
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ fontSize: "0.65rem", fontWeight: 500, color: "#1976d2", lineHeight: 1.1 }}
                  >
                    📅 Última actualización: {ultimaFecha}
                  </Typography>
                </Box>
              )}


            </DialogContent>


          </motion.div>
        )}
      </AnimatePresence>


      {/* Actions */}
      <DialogActions
        sx={{
          px: 2,
          py: 0.6,
          background: "linear-gradient(90deg,#BBDEFB,#90CAF9)", // 💧 celeste más fuerte
          borderTop: "1px solid rgba(33,150,243,.35)", // azul un poco más marcado
        }}
      >

        <Button onClick={onClose} sx={{ color: "#0277BD", fontWeight: 700 }}>
          Cerrar
        </Button>

        {onPrimaryClick && (
          <Button
            variant="contained"
            onClick={onPrimaryClick}
            sx={{
              height: 34,
              position: "relative",
              overflow: "hidden",
              minWidth: 140,
              textTransform: "none",
              fontWeight: 700,
              color: "#fff",
              border: armed ? "none" : "2px solid #fff",
              background: "transparent", // siempre transparente
              boxShadow: armed ? "0 6px 18px rgba(33,150,243,.35)" : "none", // glow celeste
              transition: "all 0.3s ease",

              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background: "linear-gradient(90deg,#4FC3F7,#0288D1)", // celeste → azul
                transform: armed ? "scale(1)" : "scale(0)",
                transformOrigin: "center center",
                transition: "transform 0.6s ease",
                zIndex: 0,
              },
              "& span": {
                position: "relative",
                zIndex: 1,
              },
              "&:hover::before": {
                background: expanded
                  ? "linear-gradient(90deg,#81D4FA,#039BE5)" // hover más vibrante
                  : "rgba(255,255,255,0.15)",
              },
            }}
          >
            <span>{primaryLabel}</span>
          </Button>
        )}
      </DialogActions>

    </Dialog >
  );
}
