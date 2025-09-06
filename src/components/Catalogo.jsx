import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Snackbar, Box, Alert, useTheme, useMediaQuery, Button } from '@mui/material';
import './css/Catalogo.css';
import { motion } from 'framer-motion';
import Productos from './Productos';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Grid } from '@mui/material';
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from '@mui/material';
import { Virtual } from 'swiper/modules';
import { cargarProductos } from '../helpers/HelperProductos';
import Cargando from './Cargando';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const location = useLocation();
  const [snackbar, setSnackbar] = useState({ open: false, type: 'success', message: '' });
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const FormatearPesos = (valor) => `$${valor.toLocaleString('es-CL')}`;
  const CalcularValorOld = (valor) => FormatearPesos(valor + 10000);
  const [productoActivo, setProductoActivo] = useState({});
  const [showArrow, setShowArrow] = useState({});

  const [videoFullScreenProducto, setVideoFullScreenProducto] = useState(null);
  const [mostrarControlesVideo, setMostrarControlesVideo] = useState(false);
  const [animarFlecha, setAnimarFlecha] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [entered, setEntered] = useState(false);
  const NAV_FADE_MS = 1000;
  const swiperRefs = useRef({});
  const fechaActual = new Date().toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  useEffect(() => {
    let cancelado = false;
    const cargarDatos = async () => {
      if (cancelado) return;
      const timestamp = new Date().getTime();
      const urlConCacheBust = `https://ivelpink.s3.us-east-2.amazonaws.com/Productos.xlsx?t=${timestamp}`;

      let datos = await cargarProductos(urlConCacheBust);

      const conStock = datos.filter(p => Number(p.Stock) > 0);
      const sinStock = datos.filter(p => Number(p.Stock) === 0);
      conStock.sort((a, b) => (a.Orden || 9999) - (b.Orden || 9999));

      const productosOrdenados = [...conStock, ...sinStock];

      if (!cancelado) {
        setProductos(productosOrdenados);

        const imagenes = productosOrdenados.map((p) => p.ImageUrl);
        let cargadas = 0;

        if (imagenes.length === 0) {
          setTimeout(() => setIsLoaded(true), 1000); // 👈 mínimo 1s
          return;
        }

        const verificarCarga = () => {
          cargadas++;
          if (cargadas === imagenes.length) {
            setTimeout(() => setIsLoaded(true), 1500); // 👈 mínimo 1s
          }
        };

        imagenes.forEach((src) => {
          const img = new Image();
          img.onload = verificarCarga;
          img.onerror = verificarCarga;
          img.src = src;
        });
      }
    };

    cargarDatos();
    return () => { cancelado = true; };
  }, []);



  useEffect(() => {
    if (location.state?.snackbar) {
      setSnackbar(location.state.snackbar);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const chunkProductos = (arr, size) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }
    return chunks;
  };

  const grupos = chunkProductos(productos, 5);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setProductoActivo((prev) => ({
        ...prev,
        0: prev?.[0] === 0 ? null : 0, // gira si no está girado
      }));
    }, 3000); // 3 segundos

    return () => clearTimeout(timeout);
  }, []);



  useEffect(() => {
    if (videoFullScreenProducto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [videoFullScreenProducto]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimarFlecha(false);
    }, 3000); // ⏱️ dura aprox. 3 segundos para mostrar 2 movimientos

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'; // ← impide la restauración automática
    }

    window.scrollTo(0, 0); // fuerza el inicio al tope
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setEntered(true);
    }
  }, [isLoaded]);

  return (
    <Box key={isLoaded ? 'loaded' : 'loading'}>
      {isLoaded ? (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: entered ? 1 : 0, y: 0 }}
          transition={{ duration: NAV_FADE_MS / 1000, ease: [0.22, 1, 0.36, 1] }} // 0.42s
          className="route-fade"
          style={{ minHeight: '100vh' }}
        >
          <Container
            maxWidth={false}
            disableGutters
            sx={{
              overflowX: "hidden",        // 👈 solo esto
              minHeight: "100vh",
              width: "100%",
              py: 14,
              px: 1.2,
              position: "relative",
              backgroundImage: isMobile
                ? "url(fondo-blizz-ivelpink.webp)"
                : "url(fondo-blizz-ivelpink.webp)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          >

            {
              isMobile ? (
                grupos.map((grupo, grupoIndex) => (
                  <Box key={`swiper-container-${grupoIndex}`} sx={{ position: 'relative', py: 0 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        px: 0,
                        mb: 0,
                        position: 'relative',
                        zIndex: 20,
                        height: 30,
                      }}
                    >
                      {/* Título con ícono estilo reels */}
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          ml: 1,
                        }}
                      >
                        {/* Columna 1: Ícono centrado */}
                        <Box
                          component="img"
                          loading="lazy"
                          decoding="async"
                          src="cine.png"
                          alt="Reels icon"
                          sx={{
                            width: 16,
                            height: 16,
                            filter: 'invert(1)',
                            alignSelf: 'center',
                            mt: 0,
                          }}
                        />

                        {/* Columna 2: Título + Fecha */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            color: 'white',
                            fontFamily: '"Segoe UI", sans-serif',
                            lineHeight: 1.2,
                          }}
                        >
                          <Box sx={{ fontWeight: 'bold', fontSize: '0.85rem' }}>
                            {grupoIndex === 0 ? 'Explora el catálogo' : 'Más productos activos..'}
                          </Box>
                          {grupoIndex === 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 1.5, duration: 0.5, ease: 'easeOut' }}
                            >
                              <Box sx={{ fontWeight: 400, fontSize: '0.75rem', opacity: 0.9 }}>
                                Última actualización de stock{' '}
                                <Box component="span" sx={{ fontWeight: 'bold' }}>
                                  {fechaActual}
                                </Box>
                              </Box>

                            </motion.div>
                          )}
                        </Box>
                      </Box>


                      {/* Flecha o espacio */}
                      <Box sx={{ width: 40, textAlign: 'right' }}>
                        {showArrow[grupoIndex] !== false ? (   // 👈 muestra solo si no es el último slide
                          animarFlecha ? (
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: 1, ease: "easeInOut" }}
                            >
                              <IconButton
                                onClick={() => {
                                  const swiper = swiperRefs.current[grupoIndex];
                                  if (swiper) swiper.slideNext();
                                }}
                                sx={{
                                  color: "white",
                                  boxShadow: "none",
                                  padding: 0.5,
                                  "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
                                }}
                              >
                                <ArrowForwardIcon fontSize="large" sx={{ fontSize: "24px" }} />
                              </IconButton>
                            </motion.div>
                          ) : (
                            <IconButton
                              onClick={() => {
                                const swiper = swiperRefs.current[grupoIndex];
                                if (swiper) swiper.slideNext();
                              }}
                              sx={{
                                color: "white",
                                boxShadow: "none",
                                padding: 0.5,
                                "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
                              }}
                            >
                              <ArrowForwardIcon fontSize="large" sx={{ fontSize: "24px" }} />
                            </IconButton>
                          )
                        ) : (
                          <Box sx={{ width: 40 }} />
                        )}
                      </Box>

                    </Box>


                    <Swiper
                      modules={[Virtual]}
                      watchSlidesProgress
                      onSwiper={(swiper) => (swiperRefs.current[grupoIndex] = swiper)}
                      spaceBetween={12}
                      slidesPerView={'auto'}
                      centeredSlides={false}
                      touchRatio={1.2}
                      threshold={5}
                      style={{
                        padding: '16px 10px',
                        paddingRight: '20px',
                        overflow: 'visible'
                      }}
                      onSlideChange={(swiper) =>
                        setShowArrow((prev) => ({ ...prev, [grupoIndex]: !swiper.isEnd }))
                      }
                    >
                      {grupo.map((producto, index) => {
                        const productoIndexGlobal = index + grupoIndex * 5;
                        const isGirado = productoActivo[grupoIndex] === index;

                        return (
                          <SwiperSlide
                            key={producto.IdProducto}
                            style={{
                              width: isMobile ? '45vw' : '18vw',
                              maxWidth: isMobile ? '200px' : '260px',
                              scrollSnapAlign: 'start',
                              overflow: 'visible'
                            }}
                          >
                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                              <Productos
                                index={productoIndexGlobal}
                                producto={producto}
                                girado={isGirado}
                                onGirar={() => {
                                  setProductoActivo((prevState) => ({
                                    ...prevState,
                                    [grupoIndex]: prevState[grupoIndex] === index ? null : index
                                  }));
                                }}
                                FormatearPesos={FormatearPesos}
                                CalcularValorOld={CalcularValorOld}
                                onVisualizarMobile={setVideoFullScreenProducto}
                              />

                            </Box>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                  </Box>

                ))
              ) : (
                <>
                  <Grid container spacing={2}>
                    {/* Columna izquierda con productos */}
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 0,
                        }}
                      >
                        <Box
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            color: "white",
                            ml: 1,
                          }}
                        >
                          Catálogo de productos
                        </Box>

                        <Box sx={{ width: 40, textAlign: "right" }}>
                          {showArrow.desktop !== false ? (
                            animarFlecha ? (
                              <motion.div
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: 1, ease: "easeInOut" }}
                              >
                                <IconButton
                                  onClick={() => {
                                    const swiper = swiperRefs.current.desktop;
                                    if (swiper) swiper.slideNext();
                                  }}
                                  sx={{
                                    color: "white",
                                    boxShadow: "none",
                                    padding: 0.5,
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
                                  }}
                                >
                                  <ArrowForwardIcon fontSize="large" sx={{ fontSize: "24px" }} />
                                </IconButton>
                              </motion.div>
                            ) : (
                              <IconButton
                                onClick={() => {
                                  const swiper = swiperRefs.current.desktop;
                                  if (swiper) swiper.slideNext();
                                }}
                                sx={{
                                  color: "white",
                                  boxShadow: "none",
                                  padding: 0.5,
                                  "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
                                }}
                              >
                                <ArrowForwardIcon fontSize="large" sx={{ fontSize: "24px" }} />
                              </IconButton>
                            )
                          ) : (
                            <Box sx={{ width: 40 }} />
                          )}
                        </Box>
                      </Box>

                      <Swiper
                        modules={[Virtual]}
                        slidesPerView={1}
                        spaceBetween={20}
                        onSwiper={(swiper) => (swiperRefs.current.desktop = swiper)}
                        style={{ padding: "10px" }}
                      >
                        {chunkProductos(productos, 8).map((grupo, grupoIndex) => (
                          <SwiperSlide key={`desktop-slide-${grupoIndex}`}>
                            <Grid container spacing={2}>
                              {Array.from({ length: 9 }).map((_, slotIndex) => {
                                const producto = grupo[slotIndex];
                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={4} // 12/4 = 3 columnas por fila
                                    key={producto ? producto.IdProducto : `empty-${slotIndex}`}
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {producto ? (
                                      <Box
                                        sx={{
                                          width: { xs: "45vw", md: "32vw" },
                                          maxWidth: { xs: "220px", md: "240px" },
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <Productos
                                          index={slotIndex}
                                          producto={producto}
                                          girado={productoActivo === slotIndex}
                                          onGirar={() =>
                                            setProductoActivo(
                                              productoActivo === slotIndex ? null : slotIndex
                                            )
                                          }
                                          FormatearPesos={FormatearPesos}
                                          CalcularValorOld={CalcularValorOld}
                                        />
                                      </Box>
                                    ) : (
                                      <Box
                                        sx={{
                                          width: { xs: "45vw", md: "12vw" },
                                          maxWidth: { xs: "200px", md: "220px" },
                                        }}
                                      />
                                    )}
                                  </Grid>
                                );
                              })}
                            </Grid>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </Grid>

                    {/* Columna derecha con imagen */}
                    <Grid item xs={12} md={6}>
                      <Box
                        component="img"
                        src="catalogo-img.png"
                        alt="Catálogo"
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Grid>
                  </Grid>

                </>
              )}



            <Snackbar
              open={snackbar.open}
              autoHideDuration={4000}
              onClose={() => setSnackbar({ ...snackbar, open: false })}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                severity={snackbar.type}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                sx={{ width: '100%', maxWidth: 360 }}
              >
                {snackbar.message}
              </Alert>
            </Snackbar>



            {videoFullScreenProducto && (
              <Box
                component={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                sx={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  width: '100vw',
                  height: '100vh',
                  bgcolor: 'black',
                  zIndex: 9999,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  overflowY: 'auto',
                  py: 4
                }}
              >

                <video
                  key={videoFullScreenProducto?.IdProducto}
                  src={videoFullScreenProducto?.VideoUrl}
                  autoPlay
                  muted
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  controlsList="nodownload"
                  controls={mostrarControlesVideo} // solo si el usuario toca
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    backgroundColor: 'black',
                  }}
                  onClick={() => setMostrarControlesVideo(true)} // tap = muestra controles
                  onCanPlay={(e) => {
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(() => {
                        // Ignorar: el navegador bloqueó el autoplay
                      });
                    }
                  }}
                />

                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    bgcolor: '#25D366',
                    color: 'white',
                    textTransform: 'none',
                    fontSize: '1rem',
                    px: 4,
                    py: 1,
                    borderRadius: '30px',
                    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)'
                  }}
                  onClick={() => {
                    const mensaje = `Me interesó el ${videoFullScreenProducto.NombreProducto}, ¿sigue disponible?`;
                    const telefono = '56979897336';
                    const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                    window.open(urlWhatsapp, '_blank');
                  }}
                >
                  Me interesa!
                </Button>

                <Button
                  onClick={() => setVideoFullScreenProducto(null)}
                  sx={{
                    mt: 1,
                    color: 'white',
                    textTransform: 'none'
                  }}
                >
                  Cerrar
                </Button>
              </Box>
            )}
          </Container>
        </motion.div>
      ) :
        (
          <Cargando />
        )}
    </Box>
  )
};

export default Catalogo;
