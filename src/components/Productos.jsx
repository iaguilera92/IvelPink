import React, { useRef, useEffect, useState } from 'react';
import { Box, Card, Typography, Button, Stack } from '@mui/material';
import { motion } from 'framer-motion';

const Productos = ({ producto, girado, onGirar, FormatearPesos, onVisualizarMobile }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const botonWhatsappRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (girado && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0; // Reinicia claramente el video al inicio
      videoRef.current.play();          // Reproduce claramente el video
    }
  }, [girado]);

  const handleFullScreen = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (videoRef.current) {
      const video = videoRef.current;

      if (isMobile) {
        // ✅ MÓVIL: Safari o Chrome
        if (video.webkitEnterFullscreen) {
          video.webkitEnterFullscreen(); // Safari iOS
          video.currentTime = 0;
          video.play();
        } else if (video.requestFullscreen) {
          video.requestFullscreen();
          video.currentTime = 0;
          video.play();
        }
      } else if (containerRef.current) {
        // ✅ DESKTOP: usa tu código actual
        const container = containerRef.current;

        const afterFullscreen = () => {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window,
          });
          video.dispatchEvent(clickEvent);

          video.currentTime = 0;
          video.muted = true;
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch((error) => {
              console.warn('No se pudo reproducir el video:', error);
            });
          }

          document.removeEventListener('fullscreenchange', afterFullscreen);
          document.removeEventListener('webkitfullscreenchange', afterFullscreen);
        };

        document.addEventListener('fullscreenchange', afterFullscreen);
        document.addEventListener('webkitfullscreenchange', afterFullscreen);

        container.requestFullscreen?.() ||
          container.webkitRequestFullscreen?.() ||
          container.mozRequestFullScreen?.() ||
          container.msRequestFullscreen?.();
      }
    }
  };


  useEffect(() => {
    const contenedor = containerRef.current;
    const botonWhatsapp = botonWhatsappRef.current;

    const mostrarBoton = () => {
      if (botonWhatsapp) botonWhatsapp.style.display = 'block';
    };
    const ocultarBoton = () => {
      if (botonWhatsapp) botonWhatsapp.style.display = 'none';
    };

    const fullscreenChangeHandler = () => {
      if (
        document.fullscreenElement === contenedor ||
        document.webkitFullscreenElement === contenedor
      ) {
        mostrarBoton();
      } else {
        ocultarBoton();
      }
    };

    document.addEventListener('fullscreenchange', fullscreenChangeHandler);
    document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
      document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    };
  }, [producto.IdProducto]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (girado) {
      video.currentTime = 0;
      setTimeout(() => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => console.warn("Error al reproducir:", err));
        }
      }, 100);
    } else {
      video.pause();
    }
  }, [girado]);



  return (
    <Box
      className="productos-card"
      sx={{
        width: '100%',
        height: { xs: 220, sm: 260 },
        mx: 'auto',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Box
        onClick={() => {
          if (producto.Stock > 0) onGirar();
        }}
        sx={{
          width: '100%',
          height: '100%',
          perspective: 1200,
          cursor: 'pointer',
          position: 'relative'
        }}
      >

        <motion.div
          animate={{ rotateY: girado ? 180 : 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{
            willChange: 'transform',
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Cara frontal */}
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden', // Safari fix
              zIndex: 2, // Asegura que esté sobre la trasera cuando se ve
              transform: 'rotateY(0deg)',
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              border: '2px solid white',
            }}
          >
            <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
              <Box
                sx={{
                  position: 'absolute',
                  top: 3,
                  right: 3,
                  zIndex: 2,
                  width: 25,
                  height: 25,
                  borderRadius: '50%',
                  bgcolor:
                    producto.Stock >= 10
                      ? '#4CAF50'
                      : producto.Stock > 0
                        ? '#FFA000'
                        : '#F44336',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                  pointerEvents: 'none',
                }}
              >
                {producto.Stock}
              </Box>
              <Box
                component="img"
                decode="async"
                loading="lazy"
                src={producto.ImageUrl}
                alt={producto.NombreProducto}
                onLoad={() => setIsImageLoaded(true)}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  filter: producto.Stock === 0
                    ? 'grayscale(100%) brightness(0.5)'
                    : (isImageLoaded ? 'none' : 'blur(12px) brightness(0.7)'),
                  transition: 'filter 0.6s ease',
                }}
              />
              {producto.Stock === 0 && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    bgcolor: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3,
                    pointerEvents: 'none',
                    textAlign: 'center',
                    px: 2
                  }}
                >
                  <Typography
                    sx={{
                      color: 'white',
                      fontSize: '1rem',
                      whiteSpace: 'pre-line'
                    }}
                  >
                    {"Reponiendo stock.\nDisponible pronto..."}
                  </Typography>
                </Box>
              )}


              <Box
                sx={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 2,
                  p: { xs: 1, sm: 1.5 },
                  background: 'rgba(0,0,0,0.6)',
                  color: 'white',
                  pointerEvents: girado ? 'none' : 'auto',
                }}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  sx={{ width: '100%' }}
                >
                  {/* Botón Visualizar - más chico */}
                  <Button
                    variant="outlined"
                    sx={{
                      flex: 0.7, // 🔹 más angosto aún
                      minWidth: 0,
                      fontSize: { xs: '0.6rem', sm: '0.7rem' }, // 🔹 más pequeño
                      borderRadius: '8px',
                      py: { xs: 0.25, sm: 0.4 },
                      borderColor: '#FFF',
                      color: '#FFF',
                      textTransform: 'none',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                      if (isMobile) {
                        onVisualizarMobile(producto);
                      } else {
                        handleFullScreen();
                      }
                    }}
                  >
                    Ver
                  </Button>

                  {/* Precio */}
                  <Box
                    sx={{
                      flex: 1.2,
                      minWidth: 70,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: 1,
                    }}
                  >
                    <Typography
                      fontWeight="bold"
                      sx={{
                        fontFamily: '"RC Type Cond", Arial, sans-serif',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        color: producto.Stock === 0 ? '#FF5252' : producto.ConDescuento ? '#00e676' : '#FFFFFF',
                        textAlign: 'center',
                      }}
                    >
                      {producto.Stock === 0 ? 'Agotado' : FormatearPesos(producto.Valor)}
                    </Typography>
                    {producto.ConDescuento && (
                      <Typography
                        sx={{
                          fontSize: { xs: '0.6rem', sm: '0.65rem' },
                          color: '#ccc',
                          textDecoration: 'line-through',
                        }}
                      >
                        {FormatearPesos(producto.Valor + 3000)}
                      </Typography>
                    )}
                  </Box>

                  {/* Botón Solicitar - más ancho */}
                  <Button
                    variant="contained"
                    disabled={producto.Stock === 0}
                    sx={{
                      flex: 1.5, // 🔹 más ancho que todos
                      minWidth: 0,
                      fontSize: { xs: '0.65rem', sm: '0.7rem' }, // 🔹 tipografía más pequeña
                      borderRadius: '8px',
                      py: { xs: 0.25, sm: 0.4 },
                      bgcolor: '#FFF',
                      color: '#222',
                      textTransform: 'none',
                      opacity: producto.Stock === 0 ? 0.4 : 1,
                      cursor: producto.Stock === 0 ? 'not-allowed' : 'pointer',
                      '&:hover': {
                        bgcolor: producto.Stock === 0 ? '#FFF' : '#f0f0f0',
                      },
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (producto.Stock === 0) return;
                      const mensaje = `Me interesó el ${producto.NombreProducto}, ¿sigue disponible?`;
                      const telefono = '56979897336';
                      const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                      window.open(urlWhatsapp, '_blank');
                    }}
                  >
                    Solicitar
                  </Button>
                </Stack>
              </Box>

            </Card>
          </Box>


          {/* Cara trasera */}
          <Box
            ref={containerRef}
            sx={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              zIndex: 1,
              borderRadius: 3,
              overflow: 'hidden',
              boxShadow: 4,
              border: '2px solid white',
            }}
          >

            <Card sx={{ width: '100%', height: '100%', position: 'relative' }}>
              {girado && (
                <Box
                  component="video"
                  ref={videoRef}
                  src={producto.VideoUrl}
                  poster={producto.ImageUrl}
                  muted
                  playsInline
                  preload={girado ? 'auto' : 'none'}
                  decode="async"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 60%', // 💡 Esto asegura que el recorte comience desde arriba
                    backgroundColor: 'black',
                    borderRadius: 0,
                    zIndex: 2,
                  }}
                  onEnded={() => {
                    onGirar();
                  }}
                />

              )}
              {/* Botón "Me interesa!" siempre visible en fullscreen */}
              <Button
                ref={botonWhatsappRef}
                variant="contained"
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  bgcolor: '#25D366',
                  color: '#FFFFFF',
                  textTransform: 'none',
                  fontSize: '1rem',
                  borderRadius: '20px',
                  px: 3,
                  py: 1,
                  zIndex: 9999,
                  display: 'none', // ← lo controlamos desde el fullscreen listener
                  boxShadow: '0px 4px 10px rgba(0,0,0,0.3)',
                  '@media (max-width: 600px)': {
                    fontSize: '0.95rem',
                    px: 2,
                    py: 0.8,
                  }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  const mensaje = `Me interesó el ${producto.NombreProducto}, ¿sigue disponible?`;
                  const telefono = '56979897336';
                  const urlWhatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                  window.open(urlWhatsapp, '_blank');
                }}
              >
                Me interesa!
              </Button>


            </Card>
          </Box>

        </motion.div>
      </Box >
    </Box >
  );
};

export default Productos;
