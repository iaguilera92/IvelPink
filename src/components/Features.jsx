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
import DialogTrabajos from "./DialogTrabajos";
import { cargarTrabajos } from "../helpers/HelperTrabajos";
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

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
function Features({ videoReady, informationsRef }) {

  const theme = useTheme();
  const timestamp = Date.now();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState("");
  const deadline = dayjs("2025-09-20T15:00:00").toDate();

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [trabajos, setTrabajos] = useState([]);
  const [openTrabajos, setOpenTrabajos] = useState(false);
  const scrollToRef = (ref, offset = -80) => ref?.current && window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });

  // handlers
  const handleTrabajosClick = () => setOpenTrabajos(true);
  const handleCloseTrabajos = () => setOpenTrabajos(false);

  //TRABAJOS S3
  useEffect(() => {
    cargarTrabajos(`https://ivelpink.s3.us-east-2.amazonaws.com/Trabajos.xlsx?t=${timestamp}`)
      .then(setTrabajos);
  }, []);


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

  // TRABAJOS ACTIVOS
  const trabajosActivos = trabajos.filter(t => Number(t.Estado) === 1);

  // Ahora cuentas sobre los activos
  const mayoristas = trabajosActivos.filter(t => Number(t.TipoTrabajo) === 2).length;
  const confeccionesIvelPink = trabajosActivos.filter(t => Number(t.TipoTrabajo) === 1).length;

  return (
    <Box
      sx={{
        backgroundImage: 'url(fondo-blizz-ivelpink.webp)',
        backgroundSize: 'cover',  // Asegura que la imagen cubra todo el contenedor
        backgroundPosition: 'center',  // Centra la imagen en el fondo
        backgroundAttachment: 'fixed',  // Asegura que la imagen de fondo no se mueva al hacer scroll
        py: 2,
        paddingBottom: "15px",
        color: "white",  // Ajusta el color del texto para que sea visible sobre el fondo
        overflowY: 'visible'
      }}
    >
      <Container sx={{ py: 0, maxWidth: "1500px !important", overflow: 'hidden' }}>
        <Box ref={ref} sx={{ mt: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
            }
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: isMobile ? 0.8 : 0.3,
            }}
            style={{
              minHeight: "60px",
              display: "flex",
              justifyContent: "center",
              marginTop: "0px",
              marginBottom: "5px",
            }}
          >

            <Button
              onClick={handleTrabajosClick}
              sx={{
                width: isMobile ? "360px" : "520px",
                minWidth: "360px !important",
                height: "50px",
                textTransform: "none",
                fontFamily: "Albert Sans, sans-serif",
                fontWeight: 600,
                color: "#fff",
                background:
                  "linear-gradient(0deg, rgba(135,206,250,1) 0%, rgba(0,191,255,1) 100%)", // celeste claro → aqua
                position: "relative",
                overflow: "hidden",
                justifyContent: "center",
                gap: 0,
                boxShadow: `
      0 6px 14px rgba(0,0,0,0.2),
      0 0 18px rgba(135,206,250,0.6),
      inset 0 0 6px rgba(255,255,255,0.25)
    `,
                border: "1px solid white",

                "&:hover": {
                  background:
                    "linear-gradient(0deg, rgba(160,220,255,1) 0%, rgba(30,200,255,1) 100%)",
                  boxShadow: `
        0 8px 18px rgba(0,0,0,0.25),
        0 0 22px rgba(100,200,255,0.7),
        inset 0 0 8px rgba(255,255,255,0.25)
      `,
                },

                "&::after": {
                  content: '""',
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.4) 50%, transparent 100%)",
                  transform: "translateX(-100%)",
                  animation: "sheen 3s ease-in-out infinite",
                  pointerEvents: "none",
                },

                "@keyframes sheen": {
                  "0%": { transform: "translateX(-120%)" },
                  "100%": { transform: "translateX(120%)" },
                },
              }}
            >
              {/* ⏩ Pop al contenido */}
              <motion.div
                initial={{ scale: 0.9 }} // parte un poco más chico
                animate={hasAnimated ? { scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: isMobile ? 1.5 : 1, // 🔑 espera 1s después de hasAnimated
                }}
                style={{ display: "flex", alignItems: "center", gap: 0 }}
              >
                {/* Reloj */}
                <AccessTimeFilledRoundedIcon
                  sx={{
                    fontSize: { xs: 18, sm: 22 },
                    animation: "clock 12s linear infinite",
                    transformOrigin: "50% 50%",
                    filter: "drop-shadow(0 0 4px rgba(255,167,38,.35))",
                    "@keyframes clock": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                />


                {/* Texto + chips */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    gap: { xs: 1.1, sm: 1 },
                    overflow: "hidden",
                    fontSize: { xs: "0.65rem", sm: "0.9rem" },
                  }}
                >
                  <span>En Producción:</span>

                  <Box
                    sx={{
                      minWidth: { xs: 90, sm: 120 },
                      textAlign: "center",
                      px: { xs: 0.6, sm: 1.2 },
                      py: 0.4,
                      borderRadius: "8px",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #4fc3f7, #0288d1)", // celeste → azul medio
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,.85)",
                      boxShadow: `
      0 0 6px rgba(79,195,247,.6),
      inset 0 0 6px rgba(255,255,255,0.25)
    `,
                      whiteSpace: "nowrap",
                      position: "relative",
                      zIndex: 1,
                      transition: "all .25s ease",
                      "&:hover": {
                        borderColor: "#fff",
                        boxShadow: `
        0 0 10px rgba(79,195,247,.8),
        inset 0 0 8px rgba(255,255,255,0.35)
      `,
                        background: "linear-gradient(135deg, #81d4fa, #039be5)",
                      },
                    }}
                  >
                    {mayoristas}{" "}
                    {mayoristas === 1 ? "Mayorista" : "Mayoristas"}
                  </Box>


                  <Box
                    sx={{
                      minWidth: { xs: 90, sm: 120 },
                      textAlign: "center",
                      px: { xs: 0.6, sm: 1.2 },
                      py: 0.4,
                      borderRadius: "8px",
                      fontWeight: 700,
                      background: "linear-gradient(135deg, #4fc3f7, #0288d1)", // celeste → azul medio
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,.85)",
                      boxShadow: `
      0 0 6px rgba(79,195,247,.6),
      inset 0 0 6px rgba(255,255,255,0.25)
    `,
                      whiteSpace: "nowrap",
                      position: "relative",
                      zIndex: 1,
                      transition: "all .25s ease",
                      "&:hover": {
                        borderColor: "#fff",
                        boxShadow: `
        0 0 10px rgba(79,195,247,.8),
        inset 0 0 8px rgba(255,255,255,0.35)
      `,
                        background: "linear-gradient(135deg, #81d4fa, #039be5)",
                      },
                    }}
                  >
                    {confeccionesIvelPink} {confeccionesIvelPink === 1 ? "Confección" : "Confecciones"}
                  </Box>
                </Box>

                {/* Flecha */}
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  whileTap={{ scale: 0.85 }}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <ChevronRightRoundedIcon
                    sx={{
                      fontSize: { xs: 18, sm: 22 },
                      transition: "transform .25s ease",
                      ".MuiButton-root:hover &": {
                        transform: "translateX(6px)",
                      },
                    }}
                  />
                </motion.div>
              </motion.div>
            </Button>
          </motion.div>

          {/* CONCURSO */}
          <Box sx={{ display: "flex", justifyContent: "center", my: 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
              }
              transition={{
                duration: 0.8,
                ease: "easeOut",
                delay: isMobile ? 0.8 : 0.3,
              }}
              style={{
                minHeight: "60px",
                display: "flex",
                justifyContent: "center",
                marginTop: "0px",
                marginBottom: "5px",
              }}
            >
              <Button
                onClick={() => setDialogOpen(true)}
                variant="contained"
                sx={{
                  width: isMobile ? "360px" : "520px",
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
                  height: "50px",
                  color: "#fff",
                  background: "linear-gradient(0deg, #ba68c8 0%, #e1bee7 100%)", // 💜 morado claro degradado
                  boxShadow: `
      0 6px 14px rgba(0,0,0,0.2),
      0 0 18px rgba(186,104,200,0.5),
      inset 0 0 6px rgba(255,255,255,0.2)
    `,
                  transition: "all .25s ease",

                  "&:hover": {
                    background: "linear-gradient(0deg, #ab47bc 0%, #d1c4e9 100%)",
                    boxShadow: `
    0 8px 18px rgba(0,0,0,0.25),
    0 0 22px rgba(171,71,188,0.65),
    inset 0 0 8px rgba(255,255,255,0.25)
  `,
                  },
                  "&:hover .icon": {
                    opacity: 1,
                    transform: "translateX(-10px)",
                  },
                  "&:hover .letter": {
                    transform: "translateX(15px)",
                  },

                  "&::after": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(120deg, transparent 0%, rgba(255,255,255,.35) 50%, transparent 100%)",
                    transform: "translateX(-100%)",
                    animation: "sheen 3s ease-in-out infinite",
                    pointerEvents: "none",
                  },

                  "@keyframes sheen": {
                    "0%": { transform: "translateX(-120%)" },
                    "100%": { transform: "translateX(120%)" },
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

          <Grid container spacing={2} justifyContent="center" mt={0.8}>

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
      <DialogTrabajos
        open={openTrabajos}
        onClose={handleCloseTrabajos}
        trabajos={trabajosActivos}
        primaryLabel="Ver Servicios"
        onPrimaryClick={() => { handleCloseTrabajos(); scrollToRef(informationsRef); }}
      />
    </Box >
  );
}

export default Features;
