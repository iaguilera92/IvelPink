import { Container, Grid, Card, CardActionArea, CardMedia, Typography, Box, Button, useTheme, useMediaQuery, } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { FaHubspot } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import "./css/Features.css"; // Importamos el CSS

// DATOS
const features = [
  { id: 1, title: "Nachito trabajando...", desc: "Diseñamos sitios web modernos, rápidos y adaptables para impulsar tus emprendimientos.", image: "https://www.chio-lecca.edu.pe/cdn/shop/articles/chio-lecca-blog-tecnicas-de-costura.jpg?v=1703181447" },
  { id: 2, title: "Amando a su mujer", desc: "Soporte evolutivo y mantenimiento de sistemas, brindamos soporte TI para el mantenimiento de tus sistemas.", image: "https://deposeguro.com/wp-content/uploads/2024/04/taller-de-costura-1.jpg" },
  { id: 3, title: "Mi novia hermosa", desc: "Desarrollo de sistemas a medida, creamos software y sitios web personalizados para tu negocio.", image: "https://static.wixstatic.com/media/f41b81_0ebad24c16ac43a28277ad2b0bba0905~mv2.jpg/v1/fill/w_520,h_349,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/f41b81_0ebad24c16ac43a28277ad2b0bba0905~mv2.jpg" }
];


// EFECTOS
const StyledCardActionArea = styled(CardActionArea)({
  position: "relative",
  "& .card-media": {
    filter: "brightness(1.05) saturate(1.2) hue-rotate(-20deg)", // 🎨 efecto rosado base
    transition: "transform 0.6s ease, filter 0.6s ease",
  },
  "&:hover .overlay": {
    top: 0,
    height: "100%",
    backgroundColor: "rgba(191, 64, 128, 0.8)", // 🌸 fondo rosado
  },
  "&:hover .additional": {
    opacity: 1,
  },
  "&:hover .card-media": {
    transform: "scale(1.3)",
    filter: "brightness(1.2) saturate(1.5) hue-rotate(-30deg)", // 💖 más intensidad al hover
  },
});

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: 0,
  right: 0,
  height: "75%",
  backgroundColor: "rgba(255, 105, 180, 0.4)", // 💖 rosado translúcido (HotPink)
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: theme.spacing(2),
  transition: "all 0.3s ease",
}));


const AdditionalContent = styled(Box)({ opacity: 0, transition: "opacity 0.3s ease" });


function Features({ videoReady }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const navigate = useNavigate();
  const [buttonRef, buttonInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -20% 0px' });


  //EVITAR ANIMACIÓN DUPLICADA
  useEffect(() => {
    let timer;
    if (inView && !hasAnimated) {
      if (videoReady) {
        timer = setTimeout(() => {
          setHasAnimated(true);
        }, 0);
      }
    }
    return () => clearTimeout(timer);
  }, [videoReady, inView, hasAnimated]);

  const handleContactClick = (title) => {
    const mensaje = `¡Hola! Me interesó ${encodeURIComponent(title)} ¿Me comentas?`;
    window.open(`https://api.whatsapp.com/send?phone=56979897336&text=${mensaje}`, "_blank");
  };

  //APARICIÓN
  const cardAnimation = {
    hidden: { opacity: 0, x: 150 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 1 + index * 0.3, ease: "easeOut" },
    }),
  };

  return (
    <Box
      sx={{
        backgroundImage: 'url(fondo-blizz-ivelpink.png)',
        backgroundSize: 'cover',  // Asegura que la imagen cubra todo el contenedor
        backgroundPosition: 'center',  // Centra la imagen en el fondo
        backgroundAttachment: 'fixed',  // Asegura que la imagen de fondo no se mueva al hacer scroll
        py: 4,
        paddingBottom: "15px",
        color: "white",  // Ajusta el color del texto para que sea visible sobre el fondo
        overflowY: 'visible'
      }}
    >
      <Container sx={{ py: 0, maxWidth: "1500px !important", overflow: 'hidden' }}>
        <Box ref={ref}>
          <Grid container spacing={2}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={4} key={feature.id}>
                <motion.div
                  initial="hidden"
                  animate={hasAnimated ? "visible" : "hidden"}
                  variants={cardAnimation}
                  custom={index}
                >
                  <Card sx={{ position: "relative", overflow: "hidden" }}>
                    <StyledCardActionArea href={feature.link} target="_self">
                      <CardMedia
                        className="card-media"
                        component="img"
                        image={feature.image}
                        alt={feature.title}
                        sx={{
                          height: isMobile ? 205 : 250,
                          transition: "transform 1s",
                        }}
                      />
                      <Overlay className="overlay">
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            marginTop: isMobile ? "20px" : "30px",
                            mb: 1,
                            textAlign: "left",
                            width: "100%",
                            marginLeft: "9px",
                            fontSize: isMobile ? "1.15rem" : "1.4rem",
                          }}
                        >
                          {feature.title}
                        </Typography>

                        <AdditionalContent className="additional">
                          <Typography
                            variant="body2"
                            sx={{ mb: 1, px: 1, fontSize: "1rem" }}
                          >
                            {feature.desc}
                          </Typography>

                          {/* ✅ Botón personalizado, fuera del <button> de CardActionArea */}
                          <Box sx={{ textAlign: "center", mt: 2 }}>
                            <Box
                              component="span"
                              role="button"
                              tabIndex={0}
                              className="btn-3-features"
                              sx={{
                                zIndex: 5,
                                cursor: "pointer",
                                display: "inline-block",
                              }}
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleContactClick(feature.title);
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleContactClick(feature.title);
                                }
                              }}
                            >
                              <span>Contratar</span>
                            </Box>
                          </Box>
                        </AdditionalContent>
                      </Overlay>
                    </StyledCardActionArea>
                  </Card>

                </motion.div>
              </Grid>
            ))}
          </Grid>
          <br />
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <motion.div
              ref={buttonRef}
              initial={{ opacity: 0, y: 50 }}
              animate={
                isMobile
                  ? (buttonInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 })
                  : (hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 })
              }
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                minHeight: "60px",
                display: "flex",
                justifyContent: "center",
              }}
            >

              <Button
                onClick={() => { navigate('/servicios'); }}
                variant="contained"
                target="_self"
                sx={{
                  textTransform: "none",
                  fontWeight: "bold",
                  letterSpacing: "3.1px",
                  fontFamily: "albert sans, sans-serif",
                  border: "1px solid white",
                  fontSize: { xs: "10px", sm: "1.1rem" },
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  width: { xs: "100%", sm: "460px" },
                  maxWidth: "460px",
                  height: "50px",
                  backgroundColor: "rgb(255, 94, 157) ",
                  transition: "width 0.3s ease",
                  "&:hover": {
                    width: { xs: "100%", sm: "470px" },
                    backgroundColor: "rgb(255, 94, 157)",
                  },
                  "&:hover .icon": {
                    opacity: 1,
                    transform: "translateX(-10px)",
                  },
                  "&:hover .letter": {
                    transform: "translateX(15px)",
                  },
                }}
              >
                <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Box
                    component="span"
                    className={`icon ${hasAnimated ? "animate" : ""}`} // Activar animación al estar en vista
                    sx={{
                      position: "absolute",
                      left: 0,
                      display: "flex",
                      alignItems: "center",
                      opacity: hasAnimated ? 0 : 1,  // Al hacer scroll, se oculta el icono
                      transform: hasAnimated ? "translateX(10px)" : "translateX(0)", // Mover el icono a la derecha
                      transition: "all 1s ease", // Transición suave
                      zIndex: 2,
                    }}
                  >
                    <FaHubspot style={{ color: "#fff", fontSize: "1.5rem" }} />
                  </Box>
                </Box>
                <Box
                  component="span"
                  fontSize={isMobile ? "11px" : "15px"}
                  className={`letter ${hasAnimated ? "animate" : ""}`} // Activar animación al estar en vista
                  sx={{
                    ml: 1,
                    transition: "all 1s ease", // Transición suave
                    transform: hasAnimated ? "translateX(0)" : "translateX(15px)", // Inicialmente a la derecha (15px)
                  }}
                >
                  + SOLUCIONES PARA TU EMPRESA
                </Box>
              </Button>
            </motion.div>
          </Box>
        </Box>
      </Container >
    </Box >
  );
}

export default Features;
