import { useState, useEffect, useRef, useMemo } from "react";
import { Container, Typography, Box, Snackbar, Alert, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import "./css/Hero.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

function Hero({ informationsRef, setVideoReady }) {
  const [currentText, setCurrentText] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [canAdvance, setCanAdvance] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const heroRef = useRef(null);
  const [mostrarTransicion, setMostrarTransicion] = useState(false);

  const titulos = [
    { title: "Producción para mayoristas", description: "" },
    { title: "Venta de prendas", description: "" },
    { title: "Confección a la medida", description: "" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = document.getElementById("background-video");
    const observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? video?.play() : video?.pause();
    }, { threshold: 0.3 });

    if (video) observer.observe(video);
    return () => video && observer.unobserve(video);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsHeroVisible(entry.isIntersecting);
    }, { threshold: 0.3 });

    if (heroRef.current) observer.observe(heroRef.current);
    return () => heroRef.current && observer.unobserve(heroRef.current);
  }, []);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (loadingVideo) setLoadingVideo(false);
    }, 3000);
    return () => clearTimeout(fallback);
  }, [loadingVideo]);

  const TypingText = ({ text, isMobile, onAnimationComplete }) => {
    const letters = text.split("");
    const [visibleLetters, setVisibleLetters] = useState([]);
    const [exitingLetters, setExitingLetters] = useState([]);

    useEffect(() => {
      const entranceDuration = 2000;
      const exitDuration = 2000;
      const visibleDuration = 2000;
      const totalDuration = entranceDuration + visibleDuration + exitDuration;

      let enterTimers = [];
      let exitTimers = [];
      let visibilityTimer;
      let completeTimer;

      setVisibleLetters([]);
      setExitingLetters([]);

      letters.forEach((_, i) => {
        enterTimers.push(setTimeout(() => {
          setVisibleLetters((prev) => [...prev, i]);
        }, i * (entranceDuration / letters.length)));
      });

      visibilityTimer = setTimeout(() => {
        letters.forEach((_, i) => {
          exitTimers.push(setTimeout(() => {
            setExitingLetters((prev) => [...prev, i]);
          }, i * (exitDuration / letters.length)));
        });
      }, entranceDuration + visibleDuration);

      completeTimer = setTimeout(() => {
        onAnimationComplete();
      }, totalDuration);

      return () => {
        enterTimers.forEach(clearTimeout);
        exitTimers.forEach(clearTimeout);
        clearTimeout(visibilityTimer);
        clearTimeout(completeTimer);
      };
    }, [text]);


    return (

      <Typography
        variant="h3"
        gutterBottom
        className="text"
        sx={{
          fontSize: isMobile ? "1.64rem !important" : "2.5rem !important",
          whiteSpace: "pre",
          textAlign: "center",
          position: "relative",
          display: "inline-block",
        }}
      >
        {letters.map((char, index) => {
          const isVisible = visibleLetters.includes(index);
          const isExiting = exitingLetters.includes(index);

          return (
            <motion.span
              key={`${char}-${index}-${text}`}
              initial={{ y: -30, opacity: 0 }}
              animate={
                isExiting
                  ? { y: -30, opacity: 0 }
                  : isVisible
                    ? { y: 0, opacity: 1 }
                    : {}
              }
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{
                position: "relative",
                display: "inline-block",
                whiteSpace: "pre",
              }}
            >
              {char}
            </motion.span>
          );
        })}
      </Typography>
    );
  };

  const memoizedTypingText = useMemo(() => (
    <TypingText
      text={titulos[currentText].title}
      isMobile={isMobile}
      onAnimationComplete={() => {
        if (isHeroVisible && canAdvance) {
          setCanAdvance(false);
          setCurrentText((prev) => {
            const next = (prev + 1) % titulos.length;
            return next;
          });
          setTimeout(() => setCanAdvance(true), 100);
        }
      }}
    />
  ), [currentText, isHeroVisible, isMobile, canAdvance]);

  return (
    <>
      {mostrarTransicion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'hsl(322.86deg 95.45% 91.37%)',
            zIndex: 9999,
          }}
        />
      )}

      <Box
        ref={heroRef}
        sx={{
          position: "relative",
          height: "400px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {loadingVideo && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 2,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={60} sx={{ color: "#ffffff" }} />
            </Box>
          )}
          <video
            autoPlay
            muted
            loop
            playsInline
            id="background-video"
            onLoadedData={() => {
              console.log("🎥 Componentes cargados");
              setLoadingVideo(false);
              if (setVideoReady) setVideoReady(true);
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              pointerEvents: "none",
            }}
            disablePictureInPicture
            controlsList="nodownload nofullscreen noremoteplayback"
          >
            <source src="video-inicio-1.mp4" type="video/mp4" />
          </video>
        </Box>

        {!loadingVideo && (
          <Container
            sx={{
              position: "relative",
              color: "white",
              zIndex: 2,
              perspective: "1000px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "150px",
              }}
            >
              {memoizedTypingText}

              {showButton && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <Box sx={{ mt: isMobile ? 4 : 1 }}>
                    <button
                      className="btn-3"
                      onClick={() => {
                        navigate('/catalogo');
                      }}
                    >
                      <span>Nuestro Catálogo</span>
                    </button>
                  </Box>
                </motion.div>
              )}
            </Box>
          </Container>
        )}

        <Snackbar
          open={openAlert}
          autoHideDuration={4000}
          onClose={() => setOpenAlert(false)}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={() => setOpenAlert(false)} severity="success" sx={{ width: "100%" }}>
            Revisa nuestros servicios y catálogo ¡Bienvenido!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}

export default Hero;
