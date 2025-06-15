import { Container, Grid, Card, CardActionArea, CardMedia, Typography, Box, Button, useTheme, useMediaQuery, } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { FaTshirt } from "react-icons/fa";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import "./css/Features.css"; // Importamos el CSS

// DATOS
const features = [
  { imageSrc: '/producto4.webp', label: 'Pijamas' },
  { imageSrc: 'https://m.media-amazon.com/images/I/71d9aL875PL._AC_UY580_.jpg', label: 'Invierno' },
  { imageSrc: 'https://img.ltwebstatic.com/images3_pi/2023/07/21/16899049705cd10efc724e3b9c5d715c6f1a20faa8_thumbnail_405x.webp', label: 'Verano' },
  { imageSrc: 'https://img.ltwebstatic.com/images3_pi/2024/12/21/45/173476402702f144f0c5cba6439964db6031d6b08b_thumbnail_405x.webp', label: 'Jeans' },
  { imageSrc: 'https://img.ltwebstatic.com/images3_pi/2025/03/20/3a/17424556395aa953a27574ca9beac76a8ca40d94ba_thumbnail_405x.webp', label: 'Shorts' },
];

const disabledLabels = ['Verano', 'Jeans', 'Shorts'];


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
        backgroundImage: 'url(fondo-blizz-ivelpink.webp)',
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
        <Box ref={ref} sx={{ mt: 0 }}>
          <Grid container spacing={2} justifyContent="center">
            {features.map((feature, index) => {
              const isDisabled = disabledLabels.includes(feature.label);

              return (
                <Grid item xs={4} sm={3} md={1.2} key={index}>
                  <motion.div
                    initial="hidden"
                    animate={hasAnimated ? "visible" : "hidden"}
                    variants={cardAnimation}
                    custom={index}
                  >
                    <Box
                      onClick={() => {
                        if (!isDisabled) navigate('/catalogo');
                      }}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        opacity: isDisabled ? 0.5 : 1,
                        pointerEvents: isDisabled ? "none" : "auto",
                      }}
                    >
                      <Box
                        sx={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          overflow: 'hidden',
                          backgroundColor: '#fff',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                          mb: 1,
                          filter: isDisabled ? 'grayscale(100%) brightness(0.9)' : 'none',
                        }}
                      >
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: '50%',
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            mb: 1,
                            position: 'relative',
                            filter: isDisabled ? 'grayscale(100%) brightness(0.9)' : 'none',
                          }}
                        >
                          <img
                            src={feature.imageSrc}
                            alt={feature.label}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                            }}
                          />

                          {isDisabled && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '-20%',
                                width: '140%',
                                height: '3px',
                                backgroundColor: 'rgba(255, 0, 0, 0.6)', // rojo traslúcido o usa blanco si prefieres
                                transform: 'rotate(-45deg) translateY(-50%)',
                                transformOrigin: 'center',
                                zIndex: 2,
                              }}
                            />
                          )}
                        </Box>


                      </Box>
                      <Typography
                        variant="body1"
                        sx={{
                          fontWeight: 500,
                          color: isDisabled ? '#aaa' : '#fff',
                          fontFamily: '"Poppins", sans-serif',
                          letterSpacing: '0.3px',
                        }}
                      >
                        {feature.label}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              );
            })}


          </Grid>

          <br />
          <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
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
                onClick={() => { navigate('/catalogo'); }}
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
                    <FaTshirt style={{ color: "#fff", fontSize: "1.5rem" }} />
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
                  NUESTRAS OFERTAS
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
