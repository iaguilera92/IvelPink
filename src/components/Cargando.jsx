import React, { useState, useEffect } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import "./css/Cargando.css";

const Cargando = () => {
    const [glow, setGlow] = useState(false);
    const [showElectricEffect, setShowElectricEffect] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const NUM_ROWS = isMobile ? 10 : 16;
    const [showImage, setShowImage] = useState(false);
    const [showStrips, setShowStrips] = useState(true);
    const [showDots, setShowDots] = useState(false);


    useEffect(() => {
        const timerGlow = setTimeout(() => {
            setGlow(true);
            setShowElectricEffect(true);
            setShowDots(true); // 👈 habilita los puntos de forma independiente

            setTimeout(() => {
                setShowElectricEffect(false);
            }, 1000);
        }, 1200);

        return () => clearTimeout(timerGlow);
    }, []);


    useEffect(() => {
        const timerGlow = setTimeout(() => {
            setGlow(true);
            setShowElectricEffect(true);

            setTimeout(() => {
                setShowElectricEffect(false);
            }, 1000);
        }, 2000);

        return () => clearTimeout(timerGlow);
    }, []);

    //FONDO TIRAS VERTICALES
    useEffect(() => {
        const showImageTimer = setTimeout(() => {
            setShowImage(true);

            const hideStripsTimer = setTimeout(() => {
                setShowStrips(false);
            }, 2000); // duración del fadeIn

            return () => clearTimeout(hideStripsTimer);
        }, 800); // ⏳ duración de las tiras

        return () => clearTimeout(showImageTimer);
    }, []);


    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'white',
                zIndex: 9999,
            }}
        >

            {/* FONDO */}
            {showStrips && (
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        flexDirection: 'column', // Ahora filas horizontales
                        zIndex: 1,
                    }}
                >
                    {/* TIRAS HORIZONTALES CON EFECTO DE LLENADO */}
                    {Array.from({ length: NUM_ROWS }).map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{
                                duration: 0.8,
                                delay: index * 0.05, // Efecto en cascada
                                ease: 'easeInOut',
                            }}
                            style={{
                                width: '100%',
                                height: `${100 / NUM_ROWS}%`, // Altura proporcional
                                backgroundColor: 'rgb(255, 222, 246)',
                                margin: 0,
                                padding: 0,
                                border: 'none',
                                boxShadow: 'none',
                                backfaceVisibility: 'hidden',
                                transform: 'translateZ(0)',
                                willChange: 'transform',
                                transformOrigin: index % 2 === 0 ? 'right center' : 'left center', // Alternancia
                            }}
                        />
                    ))}
                </Box>
            )}


            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: isMobile ? 'url(fondo-ivelpink-mobile.webp)' : 'url(footer-ivelpink.avif)',
                    backgroundSize: 'cover',
                    backgroundPosition: { xs: 'center 100%', md: 'center 100%' },
                    backgroundRepeat: 'no-repeat',
                    zIndex: 1,
                    opacity: showImage ? 1 : 0,
                    animation: 'fadeInBg 2s ease-in forwards', // ejemplo animación
                }}
            />

            {/* Contenido */}
            <Box
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: 'translateY(-40%)',
                    zIndex: 3,
                    opacity: showImage ? 1 : 0,
                    transition: 'opacity 2s ease-in',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        position: 'relative',
                    }}
                >
                    {/* ⚡ Efecto eléctrico */}
                    {showElectricEffect && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 0.6, 1, 0.6, 0] }}
                            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '120px',
                                height: '60px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,200,200,0.4) 40%, transparent 70%)',
                                boxShadow: `0 0 12px #ffffff, 0 0 24px #e0e0e0, 0 0 36px #ffffff`,
                                filter: 'blur(6px)',
                                pointerEvents: 'none',
                                zIndex: 0,
                            }}
                        />
                    )}

                    {/* Logo */}
                    <motion.div
                        initial={{ y: -60, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{ position: 'relative', zIndex: 2 }}
                    >
                        <img
                            src="/logo-ivelpink.png"
                            alt="Logo"
                            style={{
                                width: 245,
                                height: 'auto',
                                display: 'block',
                                filter: glow
                                    ? 'drop-shadow(0 0 12px #ff69b4) saturate(1.3)'
                                    : 'none',
                                transition: 'filter 0.6s ease-in-out',
                            }}

                        />

                        {/* Puntos superpuestos */}
                        {showDots && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                style={{
                                    position: 'absolute',
                                    top: '80%',     // ⬇️ más abajo
                                    left: '100%',   // ⬅️ más cerca del logo
                                    display: 'flex',
                                    gap: 6,
                                    paddingLeft: 4,
                                }}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            y: [0, -6, 0],
                                            scale: glow ? [1, 1.15, 1] : 1, // ⬅️ Pulsación cuando glow es true
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 1,
                                            delay: i * 0.2,
                                            ease: 'easeInOut',
                                        }}
                                        style={{
                                            width: 10,
                                            height: 10,
                                            borderRadius: '50%',
                                            backgroundColor: '#ff66cc',
                                            boxShadow: '0 0 6px #ff99dd',
                                            filter: glow ? 'drop-shadow(0 0 8px #ff99dd) saturate(1.3)' : 'none',
                                            transition: 'filter 0.6s ease-in-out',
                                        }}
                                    />

                                ))}
                            </motion.div>
                        )}

                    </motion.div>
                </Box>

            </Box>

        </Box>
    );
};

export default Cargando;
