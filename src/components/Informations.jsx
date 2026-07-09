import { Box, Typography, Container, Button } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import DesignServicesRoundedIcon from "@mui/icons-material/DesignServicesRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import StraightenRoundedIcon from "@mui/icons-material/StraightenRounded";

const wsp = "https://api.whatsapp.com/send?phone=56979897336&text=%C2%A1Hola!%20Quiero%20cotizar%20un%20pedido%20de%20confección.";

const pasos = [
  {
    step: "01",
    icon: <WhatsAppIcon sx={{ fontSize: 28, color: "#fff" }} />,
    title: "Contáctanos",
    description: "Escríbenos por WhatsApp o correo con tu idea, diseño o muestra.",
    color: "#d4477a",
    glow: "rgba(212,71,122,0.3)",
  },
  {
    step: "02",
    icon: <DesignServicesRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />,
    title: "Envía tu diseño",
    description: "Comparte tu muestra, molde o referencia y definimos tallas y telas.",
    color: "#e8628c",
    glow: "rgba(232,98,140,0.3)",
  },
  {
    step: "03",
    icon: <PrecisionManufacturingRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />,
    title: "Producción",
    description: "Confeccionamos tu pedido con calidad profesional y control en cada etapa.",
    color: "#ff5e9d",
    glow: "rgba(255,94,157,0.3)",
  },
  {
    step: "04",
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />,
    title: "Entrega",
    description: "Recibe tus prendas terminadas. Envíos a todo Chile o retiro en taller.",
    color: "#ff8ec5",
    glow: "rgba(255,142,197,0.3)",
  },
];

const servicios = [
  {
    icon: <CheckroomRoundedIcon sx={{ fontSize: 30, color: "#fff" }} />,
    title: "Producción por mayor",
    description: "Fabricamos lotes de prendas para marcas, empresas y emprendedores con calidad consistente.",
    color: "#d4477a",
    glow: "rgba(212,71,122,0.25)",
  },
  {
    icon: <StorefrontRoundedIcon sx={{ fontSize: 30, color: "#fff" }} />,
    title: "Confección de taller",
    description: "Prendas confeccionadas en nuestro taller, listas para entrega o personalizadas a pedido.",
    color: "#e8628c",
    glow: "rgba(232,98,140,0.25)",
  },
  {
    icon: <LocalShippingRoundedIcon sx={{ fontSize: 30, color: "#fff" }} />,
    title: "Envíos a todo Chile",
    description: "Despachamos tus pedidos a cualquier punto del país con seguimiento y puntualidad.",
    color: "#ff5e9d",
    glow: "rgba(255,94,157,0.25)",
  },
  {
    icon: <StraightenRoundedIcon sx={{ fontSize: 30, color: "#fff" }} />,
    title: "Costura y arreglos",
    description: "Composturas, ajustes y trabajos a medida con acabado profesional.",
    color: "#ff8ec5",
    glow: "rgba(255,142,197,0.25)",
  },
];

function Informations({ informationsRef, triggerInformations }) {
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        background: "#fef0f5",
        pt: { xs: 3, sm: 4 },
        pb: { xs: 5, sm: 7 },
        overflow: "hidden",
      }}
    >
      {/* ===== SECCIÓN 1: Tu pedido en 4 pasos ===== */}
      <Container sx={{ maxWidth: { xs: "980px !important", md: "1100px !important" } }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 52, sm: 62 },
                height: { xs: 52, sm: 62 },
                borderRadius: "18px",
                background: "linear-gradient(135deg, #3a1028 0%, #d4477a 100%)",
                boxShadow: "0 8px 24px rgba(212,71,122,0.28)",
                mb: 1.8,
              }}
            >
              <ContentCutRoundedIcon sx={{ fontSize: { xs: 28, sm: 34 }, color: "#fff" }} />
            </Box>

            <Box sx={{ mb: 1 }}>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.7rem", sm: "0.78rem" },
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#d4477a",
                  bgcolor: "rgba(212,71,122,0.08)",
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 99,
                }}
              >
                Tu pedido en 4 pasos
              </Box>
            </Box>

            <Typography
              sx={{
                mt: 0.8,
                color: "#6b5a60",
                fontSize: { xs: "0.88rem", sm: "0.98rem" },
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              De tu mensaje a tu puerta en pocos pasos
            </Typography>
          </Box>

          {/* Cards de pasos */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 28px 1fr 28px 1fr 28px 1fr" },
              gap: { xs: 1.5, sm: 2 },
              alignItems: "stretch",
            }}
          >
            {pasos.map((paso, i) => {
              const isLast = i === pasos.length - 1;
              return (
                <React.Fragment key={paso.step}>
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                    style={{ height: "100%" }}
                  >
                    <Box
                      sx={{
                        position: "relative",
                        borderRadius: 4,
                        background: isLast
                          ? "linear-gradient(135deg, #a06200 0%, #e8970a 25%, #ffd000 50%, #e8970a 75%, #a06200 100%)"
                          : "#ffffff",
                        overflow: isLast ? "hidden" : "visible",
                        "@keyframes goldShine": {
                          "0%": { left: "-80%" },
                          "60%": { left: "130%" },
                          "100%": { left: "130%" },
                        },
                        ...(isLast && {
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: "-30%",
                            left: "-80%",
                            width: "55%",
                            height: "160%",
                            background: "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,255,220,0.82) 50%, rgba(255,255,255,0) 100%)",
                            transform: "skewX(-14deg)",
                            animation: "goldShine 2.2s ease-in-out infinite",
                            pointerEvents: "none",
                            zIndex: 2,
                          },
                        }),
                        border: isLast ? "none" : "1px solid rgba(100,60,70,0.07)",
                        boxShadow: isLast
                          ? "0 12px 36px rgba(196,146,0,0.35)"
                          : "0 8px 28px rgba(0,0,0,0.06)",
                        px: { xs: 1.8, sm: 2.2 },
                        py: { xs: 2.2, sm: 2.8 },
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: 1.5,
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: isLast
                            ? "0 20px 44px rgba(196,146,0,0.45)"
                            : `0 16px 36px rgba(0,0,0,0.1), 0 0 0 2px ${paso.color}22`,
                        },
                      }}
                    >
                      {isLast && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 10,
                            right: 12,
                            background: "rgba(255,255,255,0.25)",
                            fontSize: "1.1rem",
                            lineHeight: 1,
                            px: 0.8,
                            py: 0.4,
                            borderRadius: 99,
                            zIndex: 3,
                          }}
                        >
                          🎉
                        </Box>
                      )}

                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          right: 14,
                          fontFamily: "'Poppins', sans-serif",
                          fontWeight: 900,
                          fontSize: "2.2rem",
                          color: isLast ? "rgba(255,255,255,0.08)" : "rgba(100,60,70,0.06)",
                          lineHeight: 1,
                          userSelect: "none",
                        }}
                      >
                        {paso.step}
                      </Box>

                      <Box
                        sx={{
                          width: 58,
                          height: 58,
                          borderRadius: "16px",
                          background: isLast
                            ? "rgba(255,255,255,0.18)"
                            : `linear-gradient(135deg, ${paso.color} 0%, ${paso.color}cc 100%)`,
                          boxShadow: isLast
                            ? "0 8px 20px rgba(0,0,0,0.15)"
                            : `0 8px 20px ${paso.glow}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {paso.icon}
                      </Box>

                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "'Poppins', sans-serif",
                            fontWeight: 800,
                            fontSize: { xs: "0.92rem", sm: "1rem" },
                            color: isLast ? "#ffffff" : "#2a1520",
                            lineHeight: 1.2,
                            mb: 0.7,
                          }}
                        >
                          {paso.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: isLast ? "rgba(255,255,255,0.75)" : "#7a6068",
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                            lineHeight: 1.6,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {paso.description}
                        </Typography>
                      </Box>

                      {!isLast && (
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: 3,
                            borderRadius: "0 0 16px 16px",
                            background: `linear-gradient(90deg, ${paso.color}, ${paso.color}66)`,
                          }}
                        />
                      )}
                    </Box>
                  </motion.div>

                  {i < pasos.length - 1 && (
                    <Box
                      sx={{
                        display: { xs: "none", md: "flex" },
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <ArrowForwardRoundedIcon
                        sx={{ color: pasos[i].color, fontSize: 22, opacity: 0.5 }}
                      />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </Box>

        </motion.div>
      </Container>

      {/* ===== SECCIÓN 2: Nuestros Servicios ===== */}
      <Container sx={{ maxWidth: { xs: "980px !important", md: "1100px !important" }, mt: { xs: 6, sm: 8 } }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
            <Box
              component="span"
              sx={{
                display: "inline-block",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "0.7rem", sm: "0.78rem" },
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#d4477a",
                bgcolor: "rgba(212,71,122,0.08)",
                px: 1.5,
                py: 0.4,
                borderRadius: 99,
                mb: 1.5,
              }}
            >
              Lo que hacemos
            </Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.4rem", sm: "1.8rem" },
                color: "#2a1520",
                lineHeight: 1.2,
                mt: 1,
              }}
            >
              Nuestros Servicios
            </Typography>
            <Typography
              sx={{
                mt: 1,
                color: "#6b5a60",
                fontSize: { xs: "0.85rem", sm: "0.95rem" },
                fontFamily: "'Poppins', sans-serif",
                maxWidth: 500,
                mx: "auto",
              }}
            >
              Soluciones de confección para cada necesidad de tu negocio
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: { xs: 2, sm: 2.5 },
            }}
          >
            {servicios.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1, ease: "easeOut" }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: 4,
                    border: "1px solid rgba(100,60,70,0.07)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
                    px: { xs: 2.2, sm: 2.5 },
                    py: { xs: 2.8, sm: 3.2 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.8,
                    textAlign: "center",
                    alignItems: "center",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: `0 16px 40px rgba(0,0,0,0.1), 0 0 0 2px ${s.color}22`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: "18px",
                      background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}cc 100%)`,
                      boxShadow: `0 8px 22px ${s.glow}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {s.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "0.95rem", sm: "1rem" },
                      color: "#2a1520",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "#7a6068",
                      fontSize: { xs: "0.8rem", sm: "0.84rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {s.description}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}

export default Informations;
