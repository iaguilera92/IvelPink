import { Container, Grid, Alert, CardActionArea, Snackbar, Typography, Box, Button, useTheme, useMediaQuery, } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import "./css/Features.css"; // Importamos el CSS
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import ConcursoRegistrar from "./ConcursoRegistrar";

dayjs.extend(duration);

// DATOS
const features = [
  { imageSrc: '/producto4.webp', label: 'Pijamas' },
  { imageSrc: 'https://m.media-amazon.com/images/I/71d9aL875PL._AC_UY580_.jpg', label: 'Invierno' },
  { imageSrc: '/productos/producto-5.webp', label: 'Accesorios' },
  { imageSrc: 'https://img.ltwebstatic.com/images3_pi/2023/07/21/16899049705cd10efc724e3b9c5d715c6f1a20faa8_thumbnail_405x.webp', label: 'Verano' },
  { imageSrc: 'https://img.ltwebstatic.com/images3_pi/2025/03/20/3a/17424556395aa953a27574ca9beac76a8ca40d94ba_thumbnail_405x.webp', label: 'Shorts' },
];

const disabledLabels = ['Verano', 'Jeans', 'Shorts'];


// EFECTOS
function Features({ videoReady }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const navigate = useNavigate();
  const [buttonRef, buttonInView] = useInView({ triggerOnce: true, rootMargin: '0px 0px -20% 0px' });
  const [timeLeft, setTimeLeft] = useState("");
  const deadline = dayjs("2025-08-20T19:00:00").toDate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  //APARICIÓN
  const cardAnimation = {
    hidden: { opacity: 0, x: 150 },
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, delay: 1 + index * 0.3, ease: "easeOut" },
    }),
  };
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = deadline - now;

      if (diff <= 0) {
        setTimeLeft("Finalizado");
        clearInterval(timer);
      } else {
        const d = dayjs.duration(diff);
        const days = Math.floor(d.asDays());
        const hours = d.hours();
        const minutes = d.minutes();

        setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
              if (isMobile && index >= features.length - 2) return null;

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
                          mb: 0,
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
          <Box sx={{ display: "flex", justifyContent: "center", my: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{
                minHeight: "60px",
                display: "flex",
                justifyContent: "center",
              }}
            >

              <Button
                onClick={() => setDialogOpen(true)}
                variant="contained"
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
                  background: "linear-gradient(0deg, #81d4fa 0%, #b2ebf2 100%)", // 💧 celeste pastel degradado
                  "&:hover": {
                    width: { xs: "100%", sm: "470px" },
                    background: "linear-gradient(0deg, #4fc3f7 0%, #b2ebf2 100%)", // Hover más vibrante
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


                {/* Ícono fijo a la izquierda */}
                <Box sx={{ position: "relative", display: "flex", alignItems: "center" }}>
                  <Box
                    component="span"
                    className={`icon ${hasAnimated ? "animate" : ""}`}
                    sx={{
                      position: "absolute",
                      left: 0,
                      display: "flex",
                      alignItems: "center",
                      opacity: hasAnimated ? 0 : 1,
                      transform: hasAnimated ? "translateX(10px)" : "translateX(0)",
                      transition: "all 1s ease",
                      zIndex: 2,
                    }}
                  >
                    <span style={{ fontSize: "1.3rem" }}>🌷</span>
                  </Box>
                </Box>

                {/* Texto: Concurso (Tiempo xx) */}
                <Box
                  component="span"
                  className={`letter ${hasAnimated ? "animate" : ""}`}
                  sx={{
                    ml: 1.5,
                    display: "flex",
                    alignItems: "center",
                    fontSize: isMobile ? "11px" : "15px",
                    fontWeight: 600,
                    transition: "all 1s ease",
                    transform: hasAnimated ? "translateX(0)" : "translateX(15px)",
                    whiteSpace: "nowrap",
                    gap: "4px",
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 700,
                      color: "#3b0a2a", // vino oscuro, muy legible sobre fondo rosado
                      textShadow: "0 1px 1px rgba(255,255,255,0.3)",
                    }}
                  >
                    Concurso
                  </Box>
                  <Box
                    component="span"
                    sx={{
                      fontWeight: 400,
                      fontSize: isMobile ? "10px" : "13px",
                      color: "#4a4a4a", // gris oscuro para contraste
                      fontStyle: "italic",
                    }}
                  >
                    (Empieza en {timeLeft})
                  </Box>
                </Box>

              </Button>

            </motion.div>
          </Box>
        </Box>
      </Container >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          variant="filled"
          sx={{ width: '100%', backgroundColor: '#99d7f2', color: '#fff', fontWeight: 600 }}
        >
          En construcción 🚧
        </Alert>
      </Snackbar>
      <ConcursoRegistrar open={dialogOpen} onClose={() => setDialogOpen(false)} />

    </Box >
  );
}

export default Features;
