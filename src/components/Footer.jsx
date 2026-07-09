import { Box, Container, Typography, Link, keyframes, useMediaQuery, useTheme, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" },
  }),
};

const SocialIcon = ({ href, Icon, gradient }) => (
  <IconButton
    component="a"
    href={href}
    target="_blank"
    rel="noopener"
    sx={{
      width: 42,
      height: 42,
      background: "rgba(255,255,255,0.08)",
      backdropFilter: "blur(4px)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(255,255,255,0.7)",
      transition: "all 0.3s ease",
      "&:hover": {
        background: gradient,
        color: "#fff",
        transform: "translateY(-3px)",
        boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
        border: "1px solid transparent",
      },
    }}
  >
    <Icon sx={{ fontSize: 20 }} />
  </IconButton>
);

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [version, setVersion] = useState("");

  useEffect(() => {
    fetch("/version.json")
      .then((res) => res.json())
      .then((data) => setVersion(data.version))
      .catch(() => {});
  }, []);

  const contactItems = [
    { icon: <PhoneRoundedIcon sx={{ fontSize: 18 }} />, text: "+56 987654321", href: "tel:+56987654321" },
    { icon: <EmailRoundedIcon sx={{ fontSize: 18 }} />, text: "ivelpink.cl@gmail.com", href: "mailto:ivelpink.cl@gmail.com" },
    { icon: <PlaceRoundedIcon sx={{ fontSize: 18 }} />, text: "Patricio Canto #6978, Renca, Santiago" },
  ];

  const links = [
    { label: "Catálogo", onClick: () => navigate("/catalogo") },
    { label: "Nosotros", onClick: () => navigate("/nosotros") },
    { label: "Contacto", onClick: () => navigate("/contacto") },
    { label: "Administración", onClick: () => navigate("/administracion") },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "white",
      }}
    >
      {/* Fondo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url(/fondo-footer.avif)",
          backgroundSize: "cover",
          backgroundPosition: "center 80%",
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, rgba(15,15,20,0.92) 0%, rgba(10,10,15,0.96) 100%)",
          },
        }}
      />

      {/* Línea superior decorativa */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          height: "3px",
          background: "linear-gradient(90deg, transparent, #ff5e9d, #ff8ec5, #ff5e9d, transparent)",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{ position: "relative", zIndex: 1, pt: { xs: 5, sm: 6 }, pb: { xs: 3, sm: 4 } }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1.2fr 0.8fr 0.8fr 1fr" },
            gap: { xs: 4, sm: 5 },
            mb: { xs: 4, sm: 5 },
          }}
        >
          {/* Col 1: Logo + descripción */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={0}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <img
                src="/logo-oficial.png"
                alt="IvelPink"
                style={{ height: "70px", marginBottom: "14px", cursor: "pointer" }}
                onClick={() => navigate("/")}
              />
              <Typography
                sx={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.7,
                  maxWidth: 280,
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                Taller de costura profesional. Confecciones por mayor para empresas, pymes y emprendedores.
              </Typography>
            </Box>
          </motion.div>

          {/* Col 2: Enlaces */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={1}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#ff8ec5",
                  mb: 2,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Navegación
              </Typography>
              {links.map((link, i) => (
                <Typography
                  key={i}
                  onClick={link.onClick}
                  sx={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.55)",
                    mb: 1,
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    "&:hover": { color: "#fff", transform: "translateX(4px)" },
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  {link.label === "Administración" && <AdminPanelSettingsIcon sx={{ fontSize: 15 }} />}
                  {link.label}
                </Typography>
              ))}
            </Box>
          </motion.div>

          {/* Col 3: Contacto */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={2}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#ff8ec5",
                  mb: 2,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Contacto
              </Typography>
              {contactItems.map((item, i) => (
                <Box
                  key={i}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1.2,
                    color: "rgba(255,255,255,0.55)",
                    transition: "color 0.25s",
                    "&:hover": { color: "#fff" },
                  }}
                >
                  <Box sx={{ color: "#ff8ec5", display: "flex" }}>{item.icon}</Box>
                  {item.href ? (
                    <Link
                      href={item.href}
                      sx={{
                        fontFamily: "'Albert Sans', sans-serif",
                        fontSize: "0.78rem",
                        color: "inherit",
                        textDecoration: "none",
                        "&:hover": { textDecoration: "none" },
                      }}
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <Typography sx={{ fontFamily: "'Albert Sans', sans-serif", fontSize: "0.78rem" }}>
                      {item.text}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </motion.div>

          {/* Col 4: Redes */}
          <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} custom={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "center" : "flex-start" }}>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  color: "#ff8ec5",
                  mb: 2,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                Síguenos
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                <SocialIcon
                  href="https://www.instagram.com/ivelpink.cl/?hl=es-la"
                  Icon={InstagramIcon}
                  gradient="linear-gradient(45deg, #cf198c, #f41242)"
                />
                <SocialIcon
                  href="https://www.facebook.com/people/Ivelpink/61573460535717/#"
                  Icon={FacebookIcon}
                  gradient="linear-gradient(45deg, #00B5F5, #002A8F)"
                />
                <SocialIcon
                  href="https://www.linkedin.com/company/mittarentacar/?viewAsMember=true"
                  Icon={LinkedInIcon}
                  gradient="linear-gradient(45deg, #00B5F5, #0077b7)"
                />
              </Box>
            </Box>
          </motion.div>
        </Box>

        {/* Separador */}
        <Box
          sx={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
            mb: 3,
          }}
        />

        {/* Bottom bar */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            IvelPink {new Date().getFullYear()} {version && `- v${version}`}
          </Typography>
          <Typography
            onClick={() => window.open("http://plataformas-web.cl", "_blank")}
            sx={{
              fontFamily: "'Albert Sans', sans-serif",
              fontSize: "0.7rem",
              color: "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "color 0.25s",
              "&:hover": { color: "rgba(255,255,255,0.6)" },
            }}
          >
            Desarrollado por plataformas-web.cl
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
