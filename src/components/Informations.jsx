import { Box, Typography, Container, Grid, Button, ListItem, ListItemIcon, ListItemText, useMediaQuery, useTheme, IconButton } from "@mui/material";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTshirt } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from 'react-intersection-observer';
import { useOutletContext } from "react-router-dom";
import { Checkroom, Storefront, DesignServices, LocalShipping } from "@mui/icons-material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import "./css/Informations.css";
import "swiper/css";

const promotions = [
  {
    id: 1,
    title: "🏭Producción para mayoristas",
    description: "Traenos tu muestra y producimos lo que necesites: vestidos, pantalones, polerones y más, para colegios, empresas, eventos o uso personal.",
    image: "/Informations-1.webp",
    price: "Consulta con nosotros",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3))",
    textColor: "white",
    descriptors: [
      "✅ Priorizamos tus pedidos.",
      "⚡ Producción ágil y confiable.",
      "🧵 Costuras resistentes.",
      "📦 Entrega puntual garantizada.",
      "🤝 Diseños y tallas a medida.",
      "🚀 Impulsa tu negocio."
    ]
  },
  {
    id: 2,
    title: "✂️Confección de nuestro taller",
    description: "Ofrecemos prendas confeccionadas en nuestro taller, listas para entrega inmediata o con personalización a pedido.",
    image: "/Informations-2.webp",
    price: "Consulta con nosotros",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "🧵 Hecho a mano con detalle.",
      "🎨 Diseños exclusivos propios.",
      "👕 Calidad en cada prenda.",
      "🏭 Control total de producción.",
      "📐 Ajustes y tallas precisas.",
      "✨ Estilo único garantizado."
    ]
  },
  {
    id: 3,
    title: "🚚Envíos a todo Chile",
    description: "Realizamos envíos de nuestras confecciones a todo Chile, con atención dedicada, rapidez y seguimiento constante.",
    image: "/Informations-3.webp",
    price: "Consulta con nosotros",
    bgColor: "linear-gradient(180deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.2))",
    textColor: "white",
    descriptors: [
      "📦 Entregas rápidas y seguras.",
      "🚀 Despachos a todo Chile.",
      "⏱️ Cumplimos los plazos.",
      "🏠 Directo a tu puerta.",
      "🌎 Cobertura nacional completa.",
      "🤝 Confianza en cada envío."
    ]
  }
];


function Informations({ informationsRef, triggerInformations }) {

  // Controla la vista del componente
  const [isGrabbing, setIsGrabbing] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: false, });

  const [shouldAnimate, setShouldAnimate] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [showArrow, setShowArrow] = useState(true);
  const [animationKey, setAnimationKey] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [showPopularBadge, setShowPopularBadge] = useState(false);

  const { ref: swiperRef, inView: swiperInView } = useInView({ threshold: 0.2, triggerOnce: true, });

  //CANCELAR PRIMERA ANIMACIÓN
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasAnimated2, setHasAnimated2] = useState(false);

  useEffect(() => {
    if (inView) {
      setShouldAnimate(true); // 🔹 Activa la animación cuando el componente es visible
    }
  }, [inView]);

  //ANIMACIÓN DESCRIPTORES
  useEffect(() => {
    if (swiperInView && swiperInstance && !hasAnimated) {
      swiperInstance.slideTo(0, 1500); // mueve del último al primero
      setHasAnimated(true);
    }
  }, [swiperInView, swiperInstance, hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      const timeout = setTimeout(() => {
        setShowPopularBadge(true);
      }, 2000); // Delay de 3 segundos después que el swiper terminó su animación
      return () => clearTimeout(timeout);
    }
  }, [hasAnimated]);


  //EVITAR ANIMACIÓN DUPLICADA
  useEffect(() => {
    if (inView && !hasAnimated2) {
      const timer = setTimeout(() => {
        setHasAnimated2(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [inView, hasAnimated2]);

  const handleContactClick = (title) => {
    const mensaje = `¡Hola! Me interesó la promoción de ${encodeURIComponent(title)} ¿Me comentas?`;
    window.open(`https://api.whatsapp.com/send?phone=56979897336&text=${mensaje}`, "_blank");
  };
  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 10,
        backgroundImage: 'url(fondo-blizz-ivelpink.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        py: isMobile ? 8 : 3,
        pt: 1,
        marginTop: "0",
        marginBottom: "-10px",
        color: "white",
        overflow: 'hidden',
        borderBottomLeftRadius: isMobile ? '90px' : '120px',
        borderBottomRightRadius: isMobile ? '90px' : '120px',
      }}
    >

      <Container sx={{ textAlign: "center", color: "white", maxWidth: "1400px !important", paddingLeft: isMobile ? "0" : "24px", paddingRight: isMobile ? "0" : "24px" }}>

        <Box sx={{ position: "relative", textAlign: "center", mb: 2 }} ref={ref}>

          <Box
            sx={{
              width: 25,
              height: 25,
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid white",
              mx: "auto",
              mb: 0.5,
            }}
          >
            <motion.div
              initial={{ rotate: 0 }}
              animate={inView || hasAnimated2 ? { rotate: 360 } : {}} // 🔹 Solo se activa cuando `shouldAnimate` es `true`
              transition={{
                duration: 0.3,
                delay: 0.3,
                repeat: 1, // Se repite una vez más (total: dos veces)
                ease: "linear", // Movimiento fluido
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <FaTshirt size={17} color="black" />
            </motion.div>
          </Box>

          <motion.div
            initial={{ opacity: 0, y: 80 }} // ⬇️ Aparece más abajo
            animate={inView || hasAnimated2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Typography
              variant="h3"
              gutterBottom
              sx={{
                fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                fontSize: { xs: "1.5rem", md: "2rem" },
                paddingLeft: { xs: "40px", md: "30px" },
                paddingRight: { xs: "40px", md: "30px" },
                letterSpacing: "3px",
                my: 0,
                display: "inline-block",
                position: "relative",
                zIndex: 1,
                backgroundColor: "transparent",
                color: "white",
                "::after": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: "-5px",
                  height: "10px",
                  backgroundColor: "transparent",
                  zIndex: 2,
                },
              }}
            >
              Estilo, calidad y elegancia femenina
            </Typography>
          </motion.div>


          {/* Línea debajo del título con animación (con retraso de 2 segundos) */}
          <motion.hr
            initial={{ opacity: 0 }} // Comienza invisible
            animate={inView || hasAnimated2 ? { opacity: 1 } : {}} // Aparece completamente
            transition={{ duration: 0.8, delay: 1 }} // Aparece después de 1s y dura 1s
            style={{
              position: "absolute",
              top: isMobile ? "calc(80% - 30px)" : "calc(100% - 30px)", // Ajusta la posición
              left: "5%",
              width: "90%", // Mantiene su tamaño desde el inicio
              border: "1px solid white",
              zIndex: 0,
              background: "white",
              clipPath: "polygon(0% 0%, 0% 0%, 19% 100%, 0% 100%, 0% 0%, 100% 0%, 80% 100%, 100% 100%, 100% 0%)",
            }}
          />

        </Box>
        <Grid container spacing={3} sx={{ mt: 2 }}>

          {/* Columna de los íconos */}
          <Grid item xs={12} md={6}>
            {[
              {
                icon: <Checkroom sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Producción para mayoristas.",
                desc: "Elabora lotes de prendas personalizadas para clientes a gran escala.",
                hideLine: false,
              },
              {
                icon: <Storefront sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Venta directa de nuestras confecciones.",
                desc: "Comercializamos ropa confeccionada en nuestro propio taller, con calidad y estilo.",
                hideLine: false,
              },
              {
                icon: <LocalShipping sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Envíos a todo Chile.",
                desc: "Despacha tus productos desde el taller a cualquier parte del país.",
                hideLine: false,
              },
              {
                icon: <DesignServices sx={{ color: "white", fontSize: "2.2rem" }} />,
                text: "Servicios de costura y arreglos.",
                desc: "Ofrece composturas, ajustes y trabajos a medida con acabado profesional.",
                hideLine: true,
              },
            ]
              .map((item, index) => {
                const { ref: itemRef, inView: itemInView } = useInView({
                  threshold: 0.43,
                  triggerOnce: true,
                });

                return (
                  <motion.div
                    key={`animated-${index}-${animationKey}`} // 👈 clave dinámica
                    ref={itemRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={itemInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      delay: 0.2 * index,
                      duration: 0.5,
                    }}
                  >
                    <ListItem
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        zIndex: 2,
                        paddingLeft: isMobile ? "0" : "16px",
                        paddingRight: isMobile ? "0" : "16px",
                      }}
                    >
                      <ListItemIcon sx={{ zIndex: 2 }}>
                        <Box
                          sx={{
                            position: "relative",
                            width: 100,
                            height: 85,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {!item.hideLine && (
                            <motion.div
                              initial={{ height: 0 }}
                              animate={itemInView ? { height: 40 } : { height: 0 }}
                              transition={{
                                delay: 0.2 * index,
                                duration: 1,
                                ease: "easeInOut",
                              }}
                              style={{
                                position: "absolute",
                                top: "80%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "2px",
                                backgroundImage:
                                  "linear-gradient(white 40%, rgba(255,255,255,0) 0%)",
                                backgroundPosition: "left",
                                backgroundSize: "2px 6px",
                                backgroundRepeat: "repeat-y",
                                zIndex: 1,
                              }}
                            />
                          )}

                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: "50%",
                              border: "2px solid white",
                              backgroundColor: "rgb(233 144 181)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              zIndex: 2,
                            }}
                          >
                            {item.icon}
                            <motion.div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                backgroundColor: "rgba(255, 255, 255, 0.2)",
                                zIndex: 1,
                                animation: "pulsacion 1s ease-in-out 0.1s infinite",
                              }}
                            />
                          </Box>
                        </Box>
                      </ListItemIcon>

                      <ListItemText
                        sx={{
                          fontFamily: "'Montserrat', Helvetica, Arial, sans-serif !important",
                          "& .MuiListItemText-primary": {
                            fontSize: isMobile ? "0.99rem" : "1.2rem",
                          },
                          "& .MuiListItemText-secondary": {
                            color: "white",
                          },
                        }}
                        primary={item.text}
                        secondary={item.desc}
                      />
                    </ListItem>
                  </motion.div>
                );
              })}
          </Grid>


          <Grid item xs={12} md={6} sx={{ mt: -4 }}>
            <Typography
              component={motion.h5}
              initial={{ opacity: 0, y: 20 }}
              animate={showPopularBadge ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              sx={{
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 800,
                mb: 1,
                textAlign: isMobile ? "center" : "left",
                textTransform: "uppercase",
                letterSpacing: "2px",
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                background: "linear-gradient(90deg, #ffffff, #f5f5f5)",
                WebkitBackgroundClip: "text",
                textShadow: "0 2px 10px rgba(0,0,0,0.35)",
                position: "relative",
                color: "white",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -2,
                  left: 0,
                  width: showPopularBadge ? "100%" : "0%", // 👈 cambiamos solo el width dinámico
                  height: "3px",
                  borderRadius: "3px",
                  background: "linear-gradient(90deg, #4facfe, #00f2fe)",
                  transition: "width 0.6s ease-out",
                },
              }}
            >
              Nuestros Servicios
            </Typography>
            <Box ref={swiperRef} sx={{ display: isMobile ? "block" : "block", position: "relative", px: 1, pt: 2, pb: 1, overflow: "hidden" }}>
              <Swiper
                style={{ overflow: "visible" }}
                spaceBetween={isMobile ? 15 : 15}
                slidesPerView={isMobile ? 1.07 : 1.5}
                onSwiper={setSwiperInstance}
                initialSlide={promotions.length - 1}
                centeredSlides={false}
                pagination={{ clickable: true }}
                onSlideChange={(swiper) => setShowArrow(swiper.activeIndex !== 2)}
              >
                {promotions.map((promo, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        cursor: "grab",
                        "&:active": { cursor: "grabbing" },
                        height: "420px",
                        position: "relative",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          zIndex: 0,      // 👈 este contexto queda detrás
                          pointerEvents: "none", // evita bloquear clics de la card
                        }}
                      >
                        {promo.id === 1 && (
                          <motion.div
                            initial={{ opacity: 0, y: 60 }}
                            animate={showPopularBadge ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            style={{
                              position: "absolute",
                              top: "-16px",
                              left: 8,
                              background: "linear-gradient(#f14c2e, #d8452e)",
                              color: "white",
                              borderTopLeftRadius: "8px",
                              borderTopRightRadius: "8px",
                              padding: "6px 16px",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              height: "22px",
                              minWidth: "110px",
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 6,
                              boxShadow: "0 0 12px 2px rgba(255, 105, 0, 0.6)",
                              border: "2px solid #ff6a00",
                            }}
                          >
                            Popular
                          </motion.div>
                        )}
                      </Box>

                      {/* Card Principal (encima) */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "100%",
                          mt: 2,
                          borderRadius: "16px",
                          overflow: "hidden",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                          position: "relative",
                          bgcolor: "white",
                          zIndex: 2,   // 👈 card siempre sobre el badge
                        }}
                      >

                        {/* Imagen de fondo con overlay */}
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${promo.image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            "&::after": {
                              content: '""',
                              position: "absolute",
                              inset: 0,
                              background:
                                promo.bgColor ||
                                "linear-gradient(180deg, rgba(0,0,0,0.75), rgba(0,0,0,0.3))",
                            },
                            zIndex: 0,
                          }}
                        />

                        {/* Contenido */}
                        <Box
                          sx={{
                            position: "relative",
                            zIndex: 2,
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",

                          }}
                        >
                          {/* Título y descripción */}
                          <Box sx={{ mb: 1 }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontFamily: "'Poppins', sans-serif",
                                fontWeight: 800,
                                fontSize: isMobile ? "1.05rem" : "1.15rem",
                                textAlign: "left",
                                color: promo.textColor || "white",
                                mb: 2,
                                textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                              }}
                            >
                              {promo.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                textAlign: "left",
                                fontSize: "0.73rem",
                                color: "#f5f5f5",
                                background: "rgba(0,0,0,0.4)",
                                borderRadius: "6px",
                                p: 1,
                                lineHeight: 1.3,
                                display: "flex",
                                alignItems: "center",
                                minHeight: 45,
                              }}
                            >
                              {promo.description}
                            </Typography>

                          </Box>
                          {/* Lista de descriptores */}
                          <Box component="ul" sx={{ pl: 2, mb: 5 }}>
                            {promo.descriptors?.map((desc, i) => (
                              <Typography
                                key={i}
                                component="li"
                                variant="body2"
                                sx={{
                                  color: "#eee",
                                  fontSize: "0.85rem",
                                  lineHeight: 1.5,
                                  mb: 0.5,
                                  listStyle: "none",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  gap: "8px",
                                }}
                              >
                                {desc}
                              </Typography>
                            ))}
                          </Box>
                          {/* Botón Cotizar (queda abajo gracias a mt:auto) */}
                          <motion.button
                            onClick={() => handleContactClick(promo.title)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            style={{
                              background: "linear-gradient(90deg, #FF9800, #F57C00)",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              width: "90%",
                              padding: "10px 20px",
                              mt: "auto",
                              fontWeight: 700,
                              fontSize: "0.95rem",
                              cursor: "pointer",
                              boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px",
                            }}
                          >
                            <Box
                              component="img"
                              src="/clic.jpg"
                              alt="Ícono de clic"
                              sx={{
                                width: 20,
                                height: 20,
                                userSelect: "none",
                                filter: "invert(1) brightness(2)",
                              }}
                            />  Cotizar
                          </motion.button>
                        </Box>
                      </Box>
                    </Box>
                  </SwiperSlide>
                ))}

              </Swiper>

              {
                showArrow && swiperInstance && (
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: -4, right: 10, zIndex: 10 }}
                  >
                    <IconButton
                      onClick={() => swiperInstance.slideNext()}
                      sx={{
                        color: "white",
                        transition: "opacity 0.3s ease-in-out",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        padding: 0,
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      <ArrowForwardIcon fontSize="large" sx={{ fontSize: "23px" }} />
                    </IconButton>
                  </motion.div>
                )
              }
            </Box>
          </Grid>



        </Grid>



      </Container>
    </Box>
  );
};

export default Informations;
