import { Box, Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import ContentCutRoundedIcon from "@mui/icons-material/ContentCutRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import CheckroomRoundedIcon from "@mui/icons-material/CheckroomRounded";
import DiamondRoundedIcon from "@mui/icons-material/DiamondRounded";
import HandshakeRoundedIcon from "@mui/icons-material/HandshakeRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";

const valores = [
  { icon: <DiamondRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />, title: "Calidad", desc: "Cada prenda pasa por un riguroso control para garantizar acabados impecables." },
  { icon: <HandshakeRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />, title: "Compromiso", desc: "Cumplimos plazos y trabajamos codo a codo con cada cliente." },
  { icon: <ContentCutRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />, title: "Detalle", desc: "Costuras precisas y terminaciones profesionales en cada pieza." },
  { icon: <LocalShippingRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />, title: "Cobertura", desc: "Envíos a todo Chile para que tu negocio no tenga límites." },
];

const Nosotros = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Box sx={{ background: "linear-gradient(180deg, #fef0f5 0%, #fef0f5 70%, #ffffff 100%)", minHeight: "100vh", pt: { xs: 14, sm: 16 }, pb: { xs: 6, sm: 8 } }}>
      <Container sx={{ maxWidth: { xs: "960px !important", md: "1100px !important" } }}>

        {/* ===== HERO NOSOTROS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 5, sm: 7 } }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: { xs: 56, sm: 68 },
                height: { xs: 56, sm: 68 },
                borderRadius: "20px",
                background: "linear-gradient(135deg, #3a1028 0%, #d4477a 100%)",
                boxShadow: "0 8px 28px rgba(212,71,122,0.3)",
                mb: 2,
              }}
            >
              <GroupsRoundedIcon sx={{ fontSize: { xs: 30, sm: 36 }, color: "#fff" }} />
            </Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                fontSize: { xs: "1.8rem", sm: "2.4rem" },
                color: "#2a1520",
                lineHeight: 1.2,
                mb: 1,
              }}
            >
              Nosotros
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                color: "#7a6068",
                fontSize: { xs: "0.9rem", sm: "1rem" },
                maxWidth: 500,
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Conoce la historia detrás de cada puntada
            </Typography>
          </Box>
        </motion.div>

        {/* ===== QUIÉNES SOMOS ===== */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              gap: { xs: 3, sm: 5 },
              alignItems: "center",
              mb: { xs: 6, sm: 8 },
            }}
          >
            <Box>
              <Box
                component="span"
                sx={{
                  display: "inline-block",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#d4477a",
                  bgcolor: "rgba(212,71,122,0.08)",
                  px: 1.5,
                  py: 0.4,
                  borderRadius: 99,
                  mb: 2,
                }}
              >
                Nuestra historia
              </Box>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.3rem", sm: "1.7rem" },
                  color: "#2a1520",
                  lineHeight: 1.3,
                  mb: 2,
                }}
              >
                ¿Quiénes somos?
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#6b5060",
                  fontSize: { xs: "0.88rem", sm: "0.95rem" },
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Somos una empresa familiar con amplia experiencia en el rubro de la confección y venta de ropa por mayor, ofreciendo productos de alta calidad para todas las temporadas.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#6b5060",
                  fontSize: { xs: "0.88rem", sm: "0.95rem" },
                  lineHeight: 1.8,
                  mb: 2,
                }}
              >
                Nos especializamos en prendas para dama, caballero y niños, con diseños exclusivos y tejidos de primera categoría, ideales para boutiques, tiendas de ropa y emprendedores.
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  color: "#6b5060",
                  fontSize: { xs: "0.88rem", sm: "0.95rem" },
                  lineHeight: 1.8,
                }}
              >
                Ofrecemos un catálogo variado y renovado constantemente, con precios competitivos y atención personalizada para ayudar a nuestros clientes a potenciar sus ventas.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 5,
                  p: { xs: 3, sm: 4 },
                  boxShadow: "0 12px 40px rgba(212,71,122,0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src="/logo-oficial.png"
                  alt="IvelPink Logo"
                  style={{ maxWidth: isMobile ? "220px" : "300px", height: "auto" }}
                />
              </Box>
            </Box>
          </Box>
        </motion.div>

        {/* ===== BANNER CENTRAL ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Box
            sx={{
              position: "relative",
              borderRadius: 4,
              overflow: "hidden",
              mb: { xs: 6, sm: 8 },
              height: { xs: 160, sm: 200 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                backgroundImage: "url(/Informations-2.webp)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(135deg, rgba(58,16,40,0.75) 0%, rgba(212,71,122,0.6) 100%)",
                },
              }}
            />
            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 3,
              }}
            >
              <CheckroomRoundedIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: "rgba(255,255,255,0.9)", mb: 1 }} />
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", sm: "1.6rem" },
                  color: "#fff",
                  textAlign: "center",
                  textShadow: "0 2px 12px rgba(0,0,0,0.3)",
                }}
              >
                Diseñamos y confeccionamos moda con pasión
              </Typography>
            </Box>
          </Box>
        </motion.div>

        {/* ===== MISIÓN Y VISIÓN ===== */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: { xs: 2.5, sm: 3 },
            mb: { xs: 6, sm: 8 },
          }}
        >
          {[
            {
              icon: <FlagRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />,
              title: "Misión",
              text: "Ofrecer prendas de vestir de excelente calidad y diseño, confeccionadas con dedicación y detalle, para satisfacer las necesidades de nuestros clientes mayoristas y minoristas, proporcionando moda para todas las temporadas.",
              color: "#d4477a",
            },
            {
              icon: <RocketLaunchRoundedIcon sx={{ fontSize: 28, color: "#fff" }} />,
              title: "Visión",
              text: "Ser reconocidos como un referente en la industria textil y de confección, destacando por nuestra innovación en diseño, compromiso con la calidad y excelencia en el servicio, impulsando el crecimiento de nuestros clientes en el mercado nacional e internacional.",
              color: "#e8628c",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
              style={{ height: "100%" }}
            >
              <Box
                sx={{
                  background: "#fff",
                  borderRadius: 4,
                  border: "1px solid rgba(100,60,70,0.07)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
                  px: { xs: 2.5, sm: 3 },
                  py: { xs: 3, sm: 3.5 },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  position: "relative",
                  overflow: "hidden",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 16px 40px rgba(0,0,0,0.1), 0 0 0 2px ${item.color}22`,
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    borderRadius: "0 0 16px 16px",
                    background: `linear-gradient(90deg, ${item.color}, ${item.color}66)`,
                  }}
                />
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: "16px",
                    background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}cc 100%)`,
                    boxShadow: `0 8px 20px ${item.color}40`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "1.1rem", sm: "1.25rem" },
                    color: "#2a1520",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    color: "#6b5060",
                    fontSize: { xs: "0.85rem", sm: "0.9rem" },
                    lineHeight: 1.7,
                  }}
                >
                  {item.text}
                </Typography>
              </Box>
            </motion.div>
          ))}
        </Box>

        {/* ===== VALORES ===== */}
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
                fontSize: "0.75rem",
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
              Lo que nos define
            </Box>
            <Typography
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "1.3rem", sm: "1.7rem" },
                color: "#2a1520",
                mt: 1,
              }}
            >
              Nuestros Valores
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr 1fr", md: "1fr 1fr 1fr 1fr" },
              gap: { xs: 1.5, sm: 2.5 },
            }}
          >
            {valores.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                style={{ height: "100%" }}
              >
                <Box
                  sx={{
                    background: "#fff",
                    borderRadius: 4,
                    border: "1px solid rgba(100,60,70,0.07)",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.05)",
                    px: { xs: 1.8, sm: 2.5 },
                    py: { xs: 2.5, sm: 3 },
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    gap: 1.5,
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 14px 36px rgba(212,71,122,0.12)",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 54,
                      height: 54,
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #d4477a 0%, #e8628ccc 100%)",
                      boxShadow: "0 6px 18px rgba(212,71,122,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {v.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 700,
                      fontSize: { xs: "0.9rem", sm: "1rem" },
                      color: "#2a1520",
                    }}
                  >
                    {v.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Poppins', sans-serif",
                      color: "#7a6068",
                      fontSize: { xs: "0.78rem", sm: "0.84rem" },
                      lineHeight: 1.6,
                    }}
                  >
                    {v.desc}
                  </Typography>
                </Box>
              </motion.div>
            ))}
          </Box>
        </motion.div>

      </Container>
    </Box>
  );
};

export default Nosotros;
