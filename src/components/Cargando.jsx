import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const Cargando = () => {
    const [glow, setGlow] = useState(false);
    const [showElectricEffect, setShowElectricEffect] = useState(false);

    useEffect(() => {
        const timerGlow = setTimeout(() => {
            setGlow(true);
            setShowElectricEffect(true);

            setTimeout(() => {
                setShowElectricEffect(false);
            }, 1000);
        }, 1200);

        return () => clearTimeout(timerGlow);
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
                bgcolor: 'rgba(0, 0, 0, 0.85)',
                zIndex: 9999,
            }}
        >
            {/* Fondo separado */}
            <Box
                sx={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url(fondo-ivelpink.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: { xs: '25% 20%', md: 'center 20%' },
                    backgroundRepeat: 'no-repeat',
                    filter: 'brightness(0.7) contrast(1.2)',
                    zIndex: 0,
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
                    zIndex: 1, // 👈 Este es el contenido sobre el fondo
                }}
            >
                {/* Imágenes + Efecto eléctrico */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0px',
                        marginBottom: '20px',
                        position: 'relative',
                    }}
                >
                    {/* ⚡ Rayo eléctrico */}
                    {showElectricEffect && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, ease: "easeInOut" }}
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


                    {/* Logo Izquierdo */}
                    <motion.img
                        src="/logo-ivelpink-1.png"
                        alt="Logo izquierda"
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{
                            width: 130,
                            height: 'auto',
                            display: 'block',
                            position: 'relative',
                            zIndex: 2,
                            filter: glow ? 'drop-shadow(0 0 6px #ff69b488)' : 'none',
                        }}
                    />

                    {/* Logo Derecho */}
                    <motion.img
                        src="/logo-ivelpink-2.png"
                        alt="Logo derecha"
                        initial={{ x: 80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: 'easeOut' }}
                        style={{
                            width: 130,
                            height: 'auto',
                            display: 'block',
                            position: 'relative',
                            zIndex: 2,
                            filter: glow ? 'drop-shadow(0 0 6px #ff69b488)' : 'none',
                        }}
                    />
                </Box>

                {/* Barra de carga */}
                <Box
                    sx={{
                        width: '260px',
                        height: '8px',
                        backgroundColor: '#111',
                        borderRadius: '50px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '0 0 14px #ff00cc66', // glow de fondo más fuerte
                    }}
                >
                    <motion.div
                        style={{
                            width: '70px',
                            height: '100%',
                            background: 'linear-gradient(90deg, #ff00cc, #ff66e0)', // rosa intenso a más claro
                            borderRadius: '50px',
                            boxShadow: '0 0 15px #ff33cc, 0 0 30px #ff00cc', // glow animado más fuerte
                        }}
                        initial={{ x: -80 }}
                        animate={{ x: 260 }}
                        transition={{
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 1,
                            ease: 'linear',
                        }}
                    />
                </Box>

            </Box>
        </Box>
    );
};

export default Cargando;
