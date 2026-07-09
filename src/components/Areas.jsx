import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, Box, Container, useMediaQuery, useTheme } from "@mui/material";
import "@fontsource/poppins";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const data = [
  {
    count: 50000,
    text: "Prendas confeccionadas con amor y detalle",
    image: "Area-1.webp",
  },
  {
    count: 120,
    text: "Clientes felices con diseños personalizados",
    image: "Area-2.webp",
  },
  {
    count: 15,
    text: "Años de experiencia en costura profesional",
    image: "Area-3.webp",
  },
  {
    count: 30,
    text: "Hilos usados por día en creaciones",
    image: "Area-4.avif",
  },
];

const Areas = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [delayed, setDelayed] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const videosRef = useRef([]);

  const { ref: sectionRef, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView && !hasAnimated) {
      const timer = setTimeout(() => setHasAnimated(true), 2600);
      return () => clearTimeout(timer);
    }
  }, [inView, hasAnimated]);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setDelayed(true), 1700);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  useEffect(() => {
    data.forEach((_, index) => {
      if (inView && videosRef.current[index]) {
        videosRef.current[index].play().catch(() => {});
      }
    });
  }, [inView]);

  const splitTextIntoWords = (text) => {
    return text.split(" ").map((word, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: delayed ? 1 : 0,
          x: delayed ? 0 : "100%",
        }}
        transition={{
          delay: 0.2 + index * 0.2,
          duration: 1,
          ease: "easeOut",
        }}
        style={{ display: "inline-block", marginRight: "5px" }}
      >
        {word}
      </motion.span>
    ));
  };

  return (
    <Box
      ref={sectionRef}
      sx={{
        position: 'relative',
        background: { xs: "#fef0f5", md: "linear-gradient(180deg, #fef0f5 0%, #fef0f5 50%, #ffffff 100%)" },
        minHeight: isMobile ? "65vh" : "auto",
        pt: { xs: 4, md: 8 },
        pb: { xs: 8, md: 10 },
        px: 2,
        marginTop: { xs: "-40px", md: "-120px" },
      }}
    >
      <Container sx={{ maxWidth: { xs: "980px !important", md: "1100px !important" } }}>
      <Grid container spacing={4} alignItems="center" pt={12}>
        {/* Contadores */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Grid container spacing={4}>
              {data.map((item, index) => (
                <Grid item xs={6} sm={6} md={6} key={index}>
                  <Box
                    sx={{
                      textAlign: "center",
                      color: "white",
                      borderRadius: 2,
                      width: "100%",
                      height: 150,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: "'Poppins', sans-serif",
                      perspective: "1000px",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        transformStyle: "preserve-3d",
                        transition: "transform 2.6s",
                        transitionDelay: inView ? "0.8s" : "0s",
                        transform: inView || hasAnimated ? "rotateY(180deg)" : "rotateY(0deg)",
                        position: "relative",
                      }}
                    >
                      {/* Cara trasera: Información */}
                      <Box
                        sx={{
                          position: "absolute",
                          backfaceVisibility: "hidden",
                          width: isMobile ? "115%" : "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          backgroundColor: "rgba(24, 26, 27, 0.9)",
                          borderRadius: 2,
                          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          zIndex: 2,
                          transform: "rotateY(180deg)",
                        }}
                      >
                        <Box
                          sx={{
                            minWidth: "100px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="h3"
                            gutterBottom
                            sx={{
                              fontFamily: "'Saira', Sans-serif",
                              fontWeight: "700",
                              minWidth: "80px",
                              textAlign: "center",
                              marginBottom: "0.15em",
                              fontSize: isMobile ? "2.6rem" : "2.2rem",
                            }}
                          >
                            +{delayed ? <CountUp start={0} end={item.count} duration={3.1} separator="." /> : "0"}
                          </Typography>
                          <Box
                            sx={{
                              textAlign: "center",
                              maxWidth: isMobile ? "100%" : "90%",
                              fontSize: isMobile ? "0.93rem" : "1.1rem",
                              fontFamily: "'Oswald', sans-serif",
                            }}
                          >
                            {splitTextIntoWords(item.text)}
                          </Box>
                        </Box>
                      </Box>

                      {/* Cara delantera: Imagen */}
                      {item.image.endsWith(".mp4") ? (
                        <video
                          ref={(el) => (videosRef.current[index] = el)}
                          src={item.image}
                          muted
                          playsInline
                          style={{
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 8,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                      ) : (
                        <img
                          src={item.image}
                          alt="imagen"
                          style={{
                            position: "absolute",
                            backfaceVisibility: "hidden",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: 8,
                            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Grid>

        {/* Video con texto */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: isMobile ? "250px" : "340px",
                borderRadius: 3,
                overflow: "hidden",
                boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
                mt: isMobile ? 4 : 0,
              }}
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                disablePictureInPicture
                controlsList="nodownload nofullscreen noremoteplayback"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              >
                <source src="video-inicio-1.mp4" type="video/mp4" />
              </video>

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.2) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 3,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: { xs: "1.2rem", sm: "1.6rem", md: "1.8rem" },
                    color: "#fff",
                    textAlign: "center",
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    lineHeight: 1.3,
                    mb: 1,
                  }}
                >
                  Tu idea, nuestra costura
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Albert Sans', sans-serif",
                    fontWeight: 400,
                    fontSize: { xs: "0.78rem", sm: "0.95rem" },
                    color: "rgba(255,255,255,0.85)",
                    textAlign: "center",
                    textShadow: "0 1px 6px rgba(0,0,0,0.4)",
                    maxWidth: 360,
                    lineHeight: 1.5,
                  }}
                >
                  Transformamos tus diseños en producción real.
                  Vestidos, bikinis, pijamas y más, con la calidad que tu marca necesita.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Areas;
