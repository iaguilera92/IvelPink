import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Grid, Card, CardMedia, useTheme, useMediaQuery, Snackbar, Alert, } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from "react-intersection-observer";

const Evidencias = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef();
    const videosRef = useRef([]);
    const [scrollY, setScrollY] = useState(0);
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true, rootMargin: '0px 0px -30% 0px' });
    const [hasAnimated, setHasAnimated] = useState(false);
    const { ref: videoRef, inView: videoInView } = useInView({
        threshold: 0.3,
        triggerOnce: true,
    });
    const { ref: imagenRef, inView: imagenInView } = useInView({
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px',
        triggerOnce: false, // para que solo se dispare una vez
    });

    const letterVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: { delay: 0.4 + i * 0.04 }, // puedes ajustar el tiempo
        }),
    };
    const textoAnimado = "Nuestros trabajos";
    const handleSnackbarClose = (_, reason) => {
        if (reason === 'clickaway') return;
        setSnackbarOpen(false);
    };

    // Reproducción automática solo si es visible
    useEffect(() => {
        const observers = videosRef.current.map((video) => {
            if (!video) return null;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) video.play();
                    else video.pause();
                },
                { threshold: 0.3 }
            );
            observer.observe(video);
            return observer;
        });

        return () => {
            observers.forEach((observer, index) => {
                if (observer && videosRef.current[index]) {
                    observer.unobserve(videosRef.current[index]);
                }
            });
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setVisible(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isMobile) {
            const handleScroll = () => setScrollY(window.scrollY);
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isMobile]);

    useEffect(() => {
        if (imagenInView && videosRef.current[0]) {
            videosRef.current[0].play().catch(() => { });
        }
    }, [imagenInView]);

    return (
        <Box sx={{ width: '100%', position: 'relative', mt: '-80px' }}>
            {/* Sección 1 */}

            {/* Contenedor con el texto en movimiento */}
            <Box
                sx={{
                    position: 'relative',
                    height: isMobile ? '60vh' : '40vh',
                    pt: { xs: 8, sm: 10 },
                    backgroundImage: `url('fondo-areas1.avif')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'scroll',
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1, // importante para layering
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        overflow: 'hidden',
                        position: 'absolute',
                        top: '30px',
                        left: 0,
                        right: 0,
                        zIndex: 2,
                    }}
                >
                    <motion.div
                        initial={{ x: '100vw' }}
                        animate={{ x: '-100%' }}
                        transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                        style={{
                            display: 'inline-block',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: { xs: '2.2rem', sm: '2.8rem', md: '3.5rem' },
                                fontWeight: 600,
                                color: 'white',
                                fontFamily: `'Montserrat', 'Segoe UI', sans-serif`,
                                textShadow: '1px 1px 4px rgba(0,0,0,0.2)',
                                px: 4,
                            }}
                        >
                            Tu marca, tan única como un {' '}<span style={{ color: '#99D7F2' }}>tulipán entre rosas.</span>

                        </Typography>
                    </motion.div>
                </Box>
                {/* Imagen + video */}
                <Box
                    ref={imagenRef}
                    sx={{
                        position: 'absolute', // 🚀 clave!
                        bottom: '5%', // 🚀 hace que sobresalga un 10% en Sección 2
                        left: '27%',
                        transform: 'translateX(0%)',
                        width: '100%',
                        maxWidth: '250px',
                        aspectRatio: '572 / 788',
                        zIndex: 3,
                        pointerEvents: 'none', // para que no bloquee clics
                    }}
                >
                    {/* Video detrás */}
                    <motion.video
                        src="/video-mano-celular.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        ref={(el) => (videosRef.current[0] = el)}
                        initial={{ x: 300, opacity: 0 }}
                        animate={imagenInView ? { x: '0%', opacity: 1 } : { x: 300, opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            position: 'absolute',
                            top: '5%',
                            left: '12%',
                            width: '54.4%',
                            height: '81.7%',
                            objectFit: 'cover',
                            borderRadius: '10px',
                            zIndex: 0,
                            backgroundColor: 'black',
                        }}
                    />

                    {/* Imagen PNG encima */}
                    <motion.img
                        src="/mano-celular.png"
                        alt="Decorativo"
                        initial={{ x: 300, opacity: 0 }}
                        animate={imagenInView ? { x: '0%', opacity: 1 } : { x: 300, opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{
                            width: '100%',
                            height: 'auto',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            zIndex: 1,
                            pointerEvents: 'none',
                        }}
                    />
                </Box>


            </Box>


            {/* Sección 2 */}
            <Box
                sx={{
                    position: 'relative',
                    backgroundImage: `url('/fondo-blanco2.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    pt: isMobile ? 0 : 0,
                    pb: 4,
                    px: { xs: 2, sm: 4 },
                    zIndex: 2,
                    mt: 0,
                    boxShadow: '0px -4px 20px rgba(0,0,0,0.05)',
                    borderTop: '1px solid #e0e0e0',
                }}
            >
                {/* Clip decorativo */}
                <Box
                    ref={ref}
                    sx={{
                        position: 'absolute',
                        top: isMobile ? '-9vh' : '-99px',
                        left: 0,
                        width: '100%',
                        height: 100,
                        zIndex: 1,
                        clipPath: isMobile
                            ? "polygon(0 0, 50% 40%, 100% 0, 100% 100%, 0 100%)"
                            : "polygon(0 0, 50% 70%, 100% 0, 100% 100%, 0 100%)",
                        backgroundImage: `url('/fondo-blanco2.png')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        pointerEvents: 'none',
                    }}
                />

                {/* Logos y videos */}
                <motion.div
                    ref={sectionRef}
                    initial={{ opacity: 0, y: 50 }}
                    animate={visible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    style={{ position: 'relative', zIndex: 6 }}
                >
                    <Box sx={{ position: 'relative' }}>
                        <Box
                            sx={{
                                zIndex: 3,
                                background: "#99D7F2",
                                borderRadius: 4,
                                p: { xs: 2, sm: 4 },
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.25)',
                                maxWidth: "1200px",
                                mx: "auto",
                            }}
                        >
                            <Typography
                                variant="h4"
                                gutterBottom
                                component="div"
                                sx={{
                                    fontFamily: '"Poppins", sans-serif',
                                    fontSize: { xs: "1.5rem", md: "2rem" },
                                    paddingX: { xs: "10px", md: "30px" }, // 👈 mejor usar paddingX para izquierda y derecha
                                    paddingY: { xs: "10px", md: "20px" }, // 👈 también puedes darle arriba/abajo si quieres más aire
                                    letterSpacing: "3px",
                                    my: 0,
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center", // 👈 ahora el contenido dentro queda al centro
                                    alignItems: "center",
                                    backgroundColor: "transparent",
                                    color: "white",
                                    textAlign: "center", // 👈 adicional para asegurar texto centrado
                                }}
                            >
                                {/* Barra | café al inicio */}
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={inView || hasAnimated ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                                    transition={{ delay: 0.3 }}
                                    style={{
                                        color: "#8B4513",
                                        fontWeight: "bold",
                                        marginRight: "4px",
                                        marginTop: "-4px",
                                        fontSize: "0.9em",
                                        lineHeight: 1,
                                        display: "inline-block",
                                        transform: "translateY(2px)",
                                    }}
                                >
                                    |
                                </motion.span>

                                {/* Texto animado letra por letra */}
                                {textoAnimado.split("").map((char, i) => (
                                    <motion.span
                                        key={i}
                                        custom={i}
                                        variants={letterVariants}
                                        initial="hidden"
                                        animate={inView || hasAnimated ? "visible" : "hidden"}
                                        style={{
                                            display: "inline-block",
                                            whiteSpace: "pre",
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </Typography>
                            <Box
                                ref={videoRef} // 🎯 lo ligamos al observer
                                sx={{
                                    mt: 3,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    borderRadius: '12px',
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                                }}
                            >
                                <motion.video
                                    src="/Evidencias.mp4"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={videoInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                                    transition={{
                                        duration: 1.5, // ⏳ ahora con 1.5 seg como pediste
                                        ease: 'easeOut',
                                    }}
                                    style={{
                                        width: '100%',
                                        maxWidth: '800px',
                                        height: 'auto',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                    }}
                                />



                            </Box>



                        </Box>
                    </Box>
                </motion.div >
            </Box >

            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleSnackbarClose} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}            >
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    Para ver más trabajos contáctanos vía redes sociales.
                </Alert>
            </Snackbar>

        </Box >
    );
};

export default Evidencias;
