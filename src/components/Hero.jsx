import { useState, useEffect, useRef } from "react";
import { Container, Typography, Box, Button, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import "./css/Hero.css";
import { useNavigate } from "react-router-dom";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import PrecisionManufacturingRoundedIcon from "@mui/icons-material/PrecisionManufacturingRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import Groups2RoundedIcon from "@mui/icons-material/Groups2Rounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import PersonalizarBikini from "./PersonalizarBikini";

const features = [
  { icon: <PrecisionManufacturingRoundedIcon />, label: "Producción\npor mayor" },
  { icon: <VerifiedRoundedIcon />, label: "Calidad\ngarantizada" },
  { icon: <Groups2RoundedIcon />, label: "Atención a\npymes y empresas" },
  { icon: <LocalShippingRoundedIcon />, label: "Entregas a\ntodo Chile" },
];

function Hero({ informationsRef, setVideoReady }) {
  const [showContent, setShowContent] = useState(false);
  const [openPersonalizar, setOpenPersonalizar] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
      if (setVideoReady) setVideoReady(true);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  const scrollToRef = (ref, offset = -80) =>
    ref?.current && window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });

  const fadeUp = (delay) => ({
    initial: { opacity: 0, y: 25 },
    animate: showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
  });

  return (
    <Box
      ref={heroRef}
      sx={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: { xs: "url(/fondo-hero-mobile.avif)", md: "url(/fondo-hero.avif)" },
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Overlay claro lateral */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isMobile
            ? "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.25) 100%)"
            : "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 65%, transparent 100%)",
          zIndex: 1,
        }}
      />

      {/* Contenido principal */}
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 2 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              maxWidth: isMobile ? "100%" : "550px",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {/* Título */}
            <motion.div {...fadeUp(0.1)}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "1.8rem", sm: "2.4rem", md: "2.8rem" },
                  color: "#fff",
                  lineHeight: 1.15,
                  mb: 0,
                }}
              >
                Confección por Mayor
              </Typography>
            </motion.div>

            <motion.div {...fadeUp(0.25)}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontStyle: "italic",
                  fontSize: { xs: "1.1rem", sm: "1.6rem", md: "2rem" },
                  color: "#ff8ec5",
                  lineHeight: 1.2,
                  whiteSpace: "nowrap",
                  mb: 1.5,
                }}
              >
                para Marcas, Empresas y Pymes
              </Typography>
            </motion.div>

            {/* Corazón separador */}
            <motion.div {...fadeUp(0.35)}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2, maxWidth: 420, width: "100%", mx: isMobile ? "auto" : 0 }}>
                <Box sx={{ flex: 1, height: "1.5px", backgroundColor: "rgba(255,142,197,0.5)" }} />
                <FavoriteRoundedIcon sx={{ fontSize: 16, color: "#ff8ec5" }} />
                <Box sx={{ flex: 1, height: "1.5px", backgroundColor: "rgba(255,142,197,0.5)" }} />
              </Box>
            </motion.div>

            {/* Descripción */}
            <motion.div {...fadeUp(0.45)}>
              <Typography
                sx={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontWeight: 400,
                  fontSize: { xs: "0.85rem", sm: "1rem" },
                  color: "rgba(255,255,255,0.8)",
                  lineHeight: 1.7,
                  maxWidth: 420,
                  mb: 3.5,
                  mx: isMobile ? "auto" : 0,
                }}
              >
                Fabricamos prendas con calidad profesional,
                tiempos de entrega confiables y atención personalizada.
              </Typography>
            </motion.div>

            {/* Botones CTA */}
            <motion.div {...fadeUp(0.55)}>
              <Box sx={{ display: "flex", gap: { xs: 1, sm: 2 }, flexWrap: "nowrap", justifyContent: isMobile ? "center" : "flex-start", mb: 4.5 }}>
                <Button
                  onClick={() => scrollToRef(informationsRef)}
                  startIcon={<ContentCutRoundedIcon />}
                  sx={{
                    px: { xs: 1.5, sm: 3.5 },
                    py: 1.3,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: "0.72rem", sm: "0.92rem" },
                    whiteSpace: "nowrap",
                    color: "#fff",
                    background: "linear-gradient(135deg, #e8628c 0%, #d4477a 100%)",
                    boxShadow: "0 4px 18px rgba(212,71,122,0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(135deg, #d4477a 0%, #c03a6a 100%)",
                      boxShadow: "0 6px 24px rgba(212,71,122,0.4)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Solicitar Cotización
                </Button>
                <Button
                  onClick={() => setOpenPersonalizar(true)}
                  startIcon={<CheckroomRoundedIcon />}
                  sx={{
                    px: { xs: 1.5, sm: 3.5 },
                    py: 1.3,
                    borderRadius: "14px",
                    textTransform: "none",
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 600,
                    fontSize: { xs: "0.72rem", sm: "0.92rem" },
                    whiteSpace: "nowrap",
                    color: "#fff",
                    backgroundColor: "transparent",
                    border: "2px solid rgba(255,255,255,0.6)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                      borderColor: "#fff",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Personaliza tu bikini
                </Button>
              </Box>
            </motion.div>

            {/* Features badges */}
            <motion.div {...fadeUp(0.7)}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(4, auto)" },
                  gap: { xs: 1.5, sm: 3 },
                  justifyContent: isMobile ? "center" : "flex-start",
                  justifyItems: isMobile ? "stretch" : "flex-start",
                }}
              >
                {features.map((f, i) => (
                  <Box
                    key={i}
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "row", sm: "column" },
                      alignItems: "center",
                      textAlign: { xs: "left", sm: "center" },
                      gap: { xs: 1.2, sm: 0.6 },
                      position: "relative",
                      backgroundColor: { xs: "rgba(255,255,255,0.08)", sm: "transparent" },
                      borderRadius: { xs: "12px", sm: 0 },
                      px: { xs: 1.5, sm: 0 },
                      py: { xs: 1.2, sm: 0 },
                      pr: { xs: 1.5, sm: i < features.length - 1 ? 3 : 0 },
                      "&::after": i < features.length - 1 ? {
                        content: '""',
                        position: "absolute",
                        right: 0,
                        top: "15%",
                        height: "70%",
                        width: "1px",
                        backgroundColor: "rgba(255,255,255,0.12)",
                        display: { xs: "none", sm: "block" },
                      } : {},
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 42, sm: 44 },
                        height: { xs: 42, sm: 44 },
                        minWidth: { xs: 42, sm: 44 },
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "rgba(255,142,197,0.12)",
                        border: "1px solid rgba(255,142,197,0.2)",
                        color: "#ff8ec5",
                        "& .MuiSvgIcon-root": { fontSize: { xs: 22, sm: 22 } },
                      }}
                    >
                      {f.icon}
                    </Box>
                    <Typography
                      sx={{
                        fontFamily: "'Albert Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: { xs: "0.75rem", sm: "0.73rem" },
                        color: "rgba(255,255,255,0.9)",
                        lineHeight: 1.35,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {f.label}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      <PersonalizarBikini open={openPersonalizar} onClose={() => setOpenPersonalizar(false)} />
    </Box>
  );
}

export default Hero;
