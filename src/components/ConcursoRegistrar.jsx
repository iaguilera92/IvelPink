import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import { keyframes } from "@emotion/react";
import { ValidarCodigoConcurso } from "../helpers/HelperConcurso";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
import EditNoteIcon from "@mui/icons-material/EditNote"; // Asegúrate de importar este ícono
import CircularProgress from "@mui/material/CircularProgress";
import Tooltip from '@mui/material/Tooltip';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const mensajeAnimacion = {
    initial: { opacity: 0, scale: 0.95 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1], // ease-in-out
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
};

const fadeInFullForm = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
const pulseSuccess = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const fadeZoomIn = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;
const rotateIn = keyframes`
  0% {
    transform: rotate(0deg) scale(0.6);
    opacity: 0;
  }
  100% {
    transform: rotate(720deg) scale(1);
    opacity: 1;
  }
`;
const rotateInCheck = keyframes`
  0% {
    transform: rotate(0deg) scale(0.6);
    opacity: 0;
  }
  100% {
    transform: rotate(1440deg) scale(1);
    opacity: 1;
  }
`;
const iconCircleStyle = (bgColor, borderColor, shadowColor) => ({
    backgroundColor: bgColor,
    border: `2px solid ${borderColor}`,
    borderRadius: "50%",
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: `${rotateIn} 0.6s ease-out`,
    boxShadow: `0 0 6px ${shadowColor}`,
    mt: "4px",
});

const ConcursoRegistrar = ({ open, onClose }) => {
    const [codigo, setCodigo] = useState("");
    const [instagram, setInstagram] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [diasRestantes, setDiasRestantes] = useState("");
    const [codigoValido, setCodigoValido] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const iconAnimado = React.useRef(false);
    const [animarCheck, setAnimarCheck] = useState(false);
    const [mostrarCamposExtra, setMostrarCamposExtra] = useState(false);
    const [showValidMessage, setShowValidMessage] = useState(false);
    const [botonBloqueado, setBotonBloqueado] = useState(true);


    const handleSubmit = async () => {
        if (!codigo || codigoValido !== true) return;

        if (!instagram.trim() || !email.trim() || !telefono.trim()) {
            mostrarSnackbar("Se debe completar el Instagram, Email y Teléfono.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+()\s-]{6,}$/;

        if (!emailRegex.test(email)) {
            mostrarSnackbar("📧 Email no válido.");
            return;
        }

        if (!phoneRegex.test(telefono)) {
            mostrarSnackbar("📞 Teléfono no válido.");
            return;
        }

        // ✅ Bloquea el botón y muestra loader
        setBotonBloqueado(true);

        const url = `${window.location.hostname === "localhost" ? "http://localhost:9999" : ""}/.netlify/functions/actualizarConcurso`;

        try {
            const response = fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    participante: {
                        Codigo: codigo,
                        Instagram: instagram,
                        Email: email,
                        Telefono: telefono,
                    },
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                console.error("❌ Error al registrar participación:", result.message);
                mostrarSnackbar("Error al registrar participación.");
            } else {
                console.log("✅ Participación registrada correctamente.");
                mostrarSnackbar("🎉 Participación registrada correctamente");
                setShowConfirm(true); // <- conserva tu lógica de mostrar sección final
            }
        } catch (error) {
            console.error("❌ Error en red:", error);
            mostrarSnackbar("Error de red al registrar participación.");
        } finally {
            setTimeout(() => {
                setBotonBloqueado(false);
            }, 2000); // mantiene el bloqueo por 2s
        }
    };




    const resetFormulario = () => {
        setCodigo("");
        setInstagram("");
        setEmail("");
        setTelefono("");
        setShowConfirm(false);
    };

    React.useEffect(() => {
        const deadline = new Date("2025-08-20T19:00:00");

        const timer = setInterval(() => {
            const now = new Date();
            const diff = deadline - now;

            if (diff <= 0) {
                setDiasRestantes("Evento en curso");
                clearInterval(timer);
            } else {
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((diff / (1000 * 60)) % 60);

                setDiasRestantes(`${days}d ${hours}h ${minutes}m`);
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        const validar = async () => {
            if (codigo.length >= 8) {
                const match = await ValidarCodigoConcurso(
                    "https://ivelpink.s3.us-east-2.amazonaws.com/Concurso.xlsx",
                    codigo
                );

                if (!match || match.Participa === 1) {
                    setCodigoValido(false);
                    setAnimarCheck(false);
                    setMostrarCamposExtra(false);
                    setBotonBloqueado(true);
                    setShowValidMessage(false);
                } else {
                    if (codigoValido !== true) {
                        setAnimarCheck(true);
                        setShowValidMessage(true);
                        setMostrarCamposExtra(false);

                        // Mostrar el mensaje 1 segundo, luego mostrar campos y ocultar mensaje
                        setTimeout(() => {
                            setMostrarCamposExtra(true);
                            setShowValidMessage(false);
                        }, 2000);

                        setTimeout(() => {
                            setBotonBloqueado(false);
                        }, 2000);
                    }
                    setCodigoValido(true);
                }
            } else {
                setCodigoValido(null);
                setShowValidMessage(false);
            }
        };

        validar();
    }, [codigo]);


    const mostrarSnackbar = (mensaje) => {
        setSnackbarMessage(mensaje);
        setSnackbarOpen(true);
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="xs"
                fullWidth
                scroll="body"
                PaperProps={{
                    sx: {
                        mt: -4,
                        borderRadius: "16px",
                        maxHeight: "90vh",
                        // 👇 Aquí va el fix global al margin-top del DialogContent
                        "& .MuiDialogContent-root": {
                            marginTop: 0,
                        },
                    },
                }}
            >

                {/* Si showConfirm está activo, mostramos solo el mensaje */}
                {showConfirm ? (
                    <>
                        <DialogTitle
                            sx={{
                                textAlign: "center",
                                fontWeight: 600,
                                color: "#c2185b",
                                background: "linear-gradient(to right, #ffe0ec, #fff5f9)",
                                fontFamily: "'Poppins', cursive",
                                py: 2,
                            }}
                        >
                            🎁 ¡Gracias por participar!
                        </DialogTitle>
                        <DialogContent
                            sx={{
                                background: "linear-gradient(to right, #ffe0ec, #fff5f9)",
                                py: 0,
                                overflowY: "auto",
                                maxHeight: "60vh", // para mantenerlo compacto si crece
                            }}
                        >
                            <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                                <Typography align="center" sx={{ color: "#d81b60", fontWeight: 500, fontSize: "1.05rem" }}>
                                    Has participado por un <strong>producto gratis</strong> 🌷
                                </Typography>
                                <Typography align="center" sx={{ color: "#444", fontSize: "0.95rem" }}>
                                    Deberás subir una historia a tu Instagram y seguirnos en{" "}
                                    <Box component="span" sx={{ fontWeight: 600, color: "#d81b60" }}>@ivelpink.cl</Box>
                                </Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions sx={{ justifyContent: "center", background: "linear-gradient(to right, #ffe0ec, #fff5f9)", pb: 2 }}>
                            <Button
                                onClick={() => {
                                    onClose(); // Cierra el Dialog
                                    setTimeout(() => resetFormulario(), 300); // Limpia después del cierre
                                }}
                                variant="contained"
                                sx={{
                                    px: 4,
                                    py: 1.2,
                                    borderRadius: "30px",
                                    background: "linear-gradient(90deg, #f48fb1, #f06292)",
                                    color: "#fff",
                                    fontWeight: "bold",
                                    fontFamily: "Poppins, sans-serif",
                                    textTransform: "none",
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #ec407a, #d81b60)",
                                    },
                                }}
                            >
                                🌸 Listo
                            </Button>
                        </DialogActions>
                    </>
                ) : (
                    <>
                        {/* FORMULARIO COMPLETO */}
                        <DialogTitle
                            disableTypography
                            sx={{
                                background: "linear-gradient(to right, #ffe0ec, #fff5f9)",
                                py: 3,
                            }}
                        >
                            <Box
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                sx={{ width: "100%" }}
                            >
                                <Typography
                                    sx={{
                                        fontWeight: 600,
                                        color: "#c2185b",
                                        fontFamily: "'Poppins', cursive",
                                        fontSize: "1.1rem",
                                        mb: 1,
                                    }}
                                >
                                    🌷 Participa en el Concurso
                                </Typography>

                                <Box
                                    component="img"
                                    src="/logo-ivelpink.png"
                                    alt="IvelPink"
                                    sx={{
                                        height: 28,
                                        animation: `${fadeInUp} 0.6s ease-out`,
                                        animationDelay: "0.2s",
                                        animationFillMode: "both",
                                    }}
                                />
                            </Box>
                        </DialogTitle>


                        <DialogContent
                            sx={{
                                background: "linear-gradient(to right, #ffe0ec, #fff5f9)",
                                mt: "0 !important",
                                py: 0,
                                overflow: "visible",
                            }}
                        >
                            <Box display="flex" flexDirection="column" gap={2} mt={0}>
                                {/* Input de Código + Icono */}
                                <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
                                    <Box sx={{ flexGrow: 1, pr: 1 }}>
                                        <TextField
                                            label="🌸 Código Concurso"
                                            value={codigo}
                                            onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                                            disabled={codigoValido === true}
                                            fullWidth
                                            variant="outlined"
                                            inputProps={{ maxLength: 10 }}
                                            sx={{
                                                animation: codigoValido === true ? `${fadeZoomIn} 0.4s ease-out` : "none",
                                                '& .MuiInputBase-root': {
                                                    backgroundColor: codigoValido === true ? "#e6f4ea" : "#fff", // más suave y consistente
                                                    textTransform: "uppercase",
                                                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                                                    boxShadow: codigoValido === true ? "0 0 0 2px rgba(67,160,71,0.25)" : "none", // más visible
                                                },
                                                '& label.Mui-focused': {
                                                    color: codigoValido === true ? "#43a047" : "#d81b60",
                                                },
                                                '& .MuiOutlinedInput-root': {
                                                    '& fieldset': {
                                                        borderColor: codigoValido === true ? "#43a047" : "#ccc",
                                                    },
                                                    '&:hover fieldset': {
                                                        borderColor: codigoValido === true ? "#2e7d32" : "#aaa",
                                                    },
                                                    '&.Mui-focused fieldset': {
                                                        borderColor: codigoValido === true ? "#43a047" : "#f06292",
                                                    },
                                                },
                                            }}
                                        />

                                    </Box>


                                    {/* Icono validación */}
                                    <Box sx={{ width: 28 }}>
                                        {codigoValido === true ? (
                                            <Tooltip title="✅ Código válido, puedes continuar">
                                                <Box
                                                    key={animarCheck ? "check-on" : "check-off"}
                                                    sx={{
                                                        backgroundColor: "#d0f0d4",
                                                        border: "1px solid #2e7d32",
                                                        borderRadius: "50%",
                                                        width: 28,
                                                        height: 28,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        animation: `${rotateInCheck} 0.6s ease-out`,
                                                        boxShadow: "0 0 6px rgba(46,125,50,0.4)",
                                                        mt: "4px",
                                                    }}
                                                >
                                                    <Typography sx={{ fontSize: 18, color: "#2e7d32" }}>✔</Typography>
                                                </Box>
                                            </Tooltip>
                                        ) : codigoValido === false ? (
                                            <Tooltip title="❌ Código no válido o ya fue usado">
                                                <Box
                                                    key="cross"
                                                    sx={{
                                                        ...iconCircleStyle("#ffcdd2", "#d32f2f", "rgba(211,47,47,0.3)"),
                                                        animation: `${rotateIn} 0.6s ease-out`,
                                                    }}
                                                >
                                                    <CloseIcon sx={{ color: "#d32f2f", fontSize: 18 }} />
                                                </Box>
                                            </Tooltip>
                                        ) : (
                                            <Tooltip title="📝 Digita el código del concurso">
                                                <Box
                                                    key="edit"
                                                    sx={{
                                                        ...iconCircleStyle("#f3e8f9", "#ba68c8", "rgba(186,104,200,0.3)"),
                                                        animation: `${rotateIn} 0.6s ease-out`,
                                                    }}
                                                >
                                                    <EditNoteIcon sx={{ fontSize: 18, color: "#7b1fa2" }} />
                                                </Box>
                                            </Tooltip>
                                        )}
                                    </Box>
                                </Box>


                                <AnimatePresence mode="wait">
                                    {codigoValido === null || showValidMessage || codigoValido === false ? (
                                        <motion.div
                                            key={
                                                showValidMessage
                                                    ? "valido"
                                                    : codigoValido === false
                                                        ? "invalido"
                                                        : "tiempo"
                                            }
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            variants={mensajeAnimacion}
                                        >
                                            <Box
                                                sx={{
                                                    mt: 0,
                                                    px: 2,
                                                    py: 1,
                                                    backgroundColor: showValidMessage
                                                        ? "#d0f0d4"
                                                        : codigoValido === false
                                                            ? "#ffcdd2"
                                                            : "#f3e8f9",
                                                    border: showValidMessage
                                                        ? "1px solid #2e7d32"
                                                        : codigoValido === false
                                                            ? "1px solid #d32f2f"
                                                            : "1px solid #d4a5e8",
                                                    borderRadius: "8px",
                                                    fontSize: "0.8rem",
                                                    fontWeight: 500,
                                                    color: showValidMessage
                                                        ? "#2e7d32"
                                                        : codigoValido === false
                                                            ? "#d32f2f"
                                                            : "#000",
                                                    fontFamily: "Poppins, sans-serif",
                                                    textAlign: "center",
                                                    lineHeight: 1.3,
                                                    minHeight: "38px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                {showValidMessage
                                                    ? "✅ ¡Código Concurso Validado!"
                                                    : codigoValido === false
                                                        ? "❌ Código no válido o ya fue usado."
                                                        : `⏳ Faltan ${diasRestantes} para el Concurso`}
                                            </Box>
                                        </motion.div>
                                    ) : null}
                                </AnimatePresence>



                                {/* Campos adicionales si código válido */}
                                {codigoValido && mostrarCamposExtra && (

                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.5, ease: [0.17, 0.67, 0.83, 0.67] }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2,
                                            }}
                                        >
                                            <TextField
                                                label="💖 Instagram"
                                                value={instagram}
                                                onChange={(e) => setInstagram(e.target.value)}
                                                fullWidth
                                                sx={{ '& .MuiInputBase-root': { backgroundColor: "#fff" } }}
                                            />
                                            <TextField
                                                label="📧 Email"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                fullWidth
                                                sx={{ '& .MuiInputBase-root': { backgroundColor: "#fff" } }}
                                            />
                                            <TextField
                                                label="📞 Teléfono"
                                                value={telefono}
                                                onChange={(e) => setTelefono(e.target.value)}
                                                fullWidth
                                                sx={{ '& .MuiInputBase-root': { backgroundColor: "#fff" } }}
                                            />
                                            <Box
                                                sx={{
                                                    mt: 0.1,
                                                    px: 2,
                                                    py: 0.8,
                                                    backgroundColor: "#f3e8f9",
                                                    border: "1px solid #d4a5e8",
                                                    borderRadius: "10px",
                                                    fontSize: "0.75rem",
                                                    color: "black",
                                                    fontFamily: "Poppins, sans-serif",
                                                    textAlign: "center",
                                                    lineHeight: 1.4,
                                                }}
                                            >
                                                Recuerda{" "}
                                                <Box component="span" sx={{ fontWeight: 600, color: "#000", display: "inline" }}>
                                                    subir una historia en tu Instagram
                                                </Box>{" "}
                                                del producto<br />
                                                y{" "}
                                                <Box component="span" sx={{ fontWeight: 600, color: "#000", display: "inline" }}>
                                                    seguirnos en{" "}
                                                    <Box
                                                        component="a"
                                                        href="https://www.instagram.com/ivelpink.cl"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        sx={{
                                                            color: "#d81b60",
                                                            fontWeight: 600,
                                                            textDecoration: "none",
                                                            "&:hover": {
                                                                textDecoration: "underline",
                                                            },
                                                            display: "inline",
                                                        }}
                                                    >
                                                        @ivelpink.cl
                                                    </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </motion.div>
                                )}
                            </Box>
                        </DialogContent>


                        <DialogActions
                            sx={{
                                justifyContent: "center",
                                pt: 1.5,
                                pb: 1.5,
                                background: "linear-gradient(to right, #ffe0ec, #fff5f9)"
                            }}
                        >
                            <Button
                                onClick={handleSubmit}
                                disabled={codigo.trim() === "" || codigoValido !== true || botonBloqueado}
                                variant="contained"
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: "30px",
                                    fontWeight: "bold",
                                    textTransform: "none",
                                    background: "linear-gradient(90deg, #f48fb1, #f06292)",
                                    color: "#fff",
                                    boxShadow: "0 4px 10px rgba(244,143,177,0.3)",
                                    fontFamily: "Poppins, sans-serif",
                                    "&:hover": {
                                        background: "linear-gradient(90deg, #ec407a, #d81b60)",
                                    },
                                    minWidth: "160px", // 🧩 Asegura el ancho constante para evitar parpadeo
                                    minHeight: "42px", // 🧩 Asegura la altura también
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {codigoValido === true && botonBloqueado ? (
                                    <CircularProgress size={22} sx={{ color: "#fff" }} />
                                ) : (
                                    "🌷 Participar"
                                )}
                            </Button>


                        </DialogActions>
                    </>
                )
                }
            </Dialog >

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity="warning"
                    sx={{ width: "100%", fontFamily: "Poppins, sans-serif" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ConcursoRegistrar;
