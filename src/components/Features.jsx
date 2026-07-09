import { Container, Typography, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./css/Features.css";

const allImages = Array.from({ length: 16 }, (_, i) => `/trabajo-${i + 1}.jpg`);

const row1 = allImages.slice(0, 6);
const row2 = allImages.slice(6, 11);
const row3 = allImages.slice(11, 16);

function MarqueeRow({ images, duration, reverse = false }) {
  const doubled = [...images, ...images];

  return (
    <Box
      className="marquee-track"
      sx={{
        display: "flex",
        gap: { xs: "8px", sm: "12px" },
        width: "max-content",
        animation: `${reverse ? "marqueeRight" : "marqueeLeft"} ${duration}s linear infinite`,
        "&:hover": {
          animationPlayState: "paused",
        },
      }}
    >
      {doubled.map((src, i) => (
        <Box
          key={i}
          sx={{
            width: { xs: 140, sm: 200, md: 240 },
            height: { xs: 140, sm: 200, md: 240 },
            borderRadius: { xs: "10px", sm: "14px" },
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
            cursor: "pointer",
            transition: "transform 0.4s ease, box-shadow 0.4s ease",
            "&:hover": {
              transform: "scale(1.08)",
              zIndex: 2,
              boxShadow: "0 8px 30px rgba(212,71,122,0.4)",
            },
            "&:hover img": {
              transform: "scale(1.05)",
            },
            "&:hover .img-overlay": {
              opacity: 1,
            },
          }}
        >
          <Box
            component="img"
            src={src}
            alt={`Trabajo`}
            loading="lazy"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              transition: "transform 0.5s ease",
            }}
          />
          <Box
            className="img-overlay"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "linear-gradient(180deg, transparent, rgba(212,71,122,0.45))",
              opacity: 0,
              transition: "opacity 0.4s ease",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}

function Features({ videoReady, informationsRef }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  const scrollToRef = (refEl, offset = -80) =>
    refEl?.current && window.scrollTo({ top: refEl.current.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });

  return (
    <Box
      ref={ref}
      sx={{
        background: "#fef0f5",
        pt: { xs: 3, sm: 4 },
        pb: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 }, px: 2 }}>
          <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, mb: 1.5 }}>
            <Box sx={{ width: 30, height: "1.5px", backgroundColor: "rgba(212,71,122,0.35)" }} />
            <CheckroomRoundedIcon sx={{ fontSize: 14, color: "#d4477a" }} />
            <Box sx={{ width: 30, height: "1.5px", backgroundColor: "rgba(212,71,122,0.35)" }} />
          </Box>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", sm: "2rem" },
              color: "#3a1028",
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Nuestros Trabajos
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Albert Sans', sans-serif",
              fontWeight: 400,
              fontSize: { xs: "0.8rem", sm: "0.95rem" },
              color: "rgba(80,30,50,0.6)",
              maxWidth: 480,
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Cada prenda refleja nuestro compromiso con la calidad.
            Conoce lo que podemos hacer por tu marca.
          </Typography>
        </Box>
      </motion.div>

      {/* 3 filas marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: "8px", sm: "12px" } }}>
          <Box sx={{ overflow: "hidden" }}>
            <MarqueeRow images={row1} duration={28} />
          </Box>
          <Box sx={{ overflow: "hidden" }}>
            <MarqueeRow images={row2} duration={32} reverse />
          </Box>
          <Box sx={{ overflow: "hidden" }}>
            <MarqueeRow images={row3} duration={25} />
          </Box>
        </Box>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <Container sx={{ maxWidth: { xs: "980px !important", md: "1100px !important" }, mt: { xs: 4, sm: 5 } }}>
        <Box
          sx={{
            py: { xs: 3, sm: 3.5 },
            px: { xs: 2, sm: 4 },
            borderRadius: 4,
            background: "linear-gradient(135deg, #3a1028 0%, #d4477a 100%)",
            textAlign: "center",
            boxShadow: "0 12px 32px rgba(212,71,122,0.25)",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "1.05rem", sm: "1.35rem" },
              color: "#ffffff",
              mb: { xs: 1.8, sm: 2.2 },
            }}
          >
            ¿Listo para hacer tu pedido?
          </Typography>
          <Button
            component="a"
            href="https://api.whatsapp.com/send?phone=56979897336&text=%C2%A1Hola!%20Quiero%20solicitar%20una%20cotizaci%C3%B3n%20de%20confección."
            target="_blank"
            rel="noopener"
            variant="contained"
            startIcon={<WhatsAppIcon />}
            sx={{
              background: "#25D366",
              color: "#fff",
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: { xs: "0.9rem", sm: "1rem" },
              px: { xs: 3.5, sm: 5 },
              py: { xs: 1.2, sm: 1.5 },
              borderRadius: 99,
              textTransform: "none",
              boxShadow: "0 4px 18px rgba(37,211,102,0.4)",
              "&:hover": {
                background: "#1ebe5a",
                boxShadow: "0 6px 22px rgba(37,211,102,0.55)",
              },
            }}
          >
            Escríbenos por WhatsApp
          </Button>
        </Box>
        </Container>
      </motion.div>
    </Box>
  );
}

export default Features;
