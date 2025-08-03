import React, { useState } from "react";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Box, Typography
} from "@mui/material";
import { keyframes } from "@emotion/react";

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


const FormularioConcurso = ({ open, onClose }) => {
    const [codigo, setCodigo] = useState("");
    const [instagram, setInstagram] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, setTelefono] = useState("");
    const [showConfirm, setShowConfirm] = useState(false);
    const [diasRestantes, setDiasRestantes] = useState("");

    const handleSubmit = () => {
        console.log("📤 Enviando datos:", { codigo, instagram, email, telefono });
        setShowConfirm(true); // solo mostramos el mensaje
    };
    const resetFormulario = () => {
        setCodigo("");
        setInstagram("");
        setEmail("");
        setTelefono("");
        setShowConfirm(false);
    };

    React.useEffect(() => {
        const deadline = new Date();
        deadline.setDate(deadline.getDate() + 7); // evento en 7 días

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

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth PaperProps={{
            sx: {
                mt: -4, // mueve el diálogo más arriba (puedes ajustar entre -2 y -6)
                borderRadius: "16px",
            },
        }}>
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
                    <DialogContent sx={{ background: "linear-gradient(to right, #ffe0ec, #fff5f9)", py: 3 }}>
                        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
                            <Typography align="center" sx={{ color: "#d81b60", fontWeight: 500, fontSize: "1.05rem" }}>
                                Has participado por un <strong>producto gratis</strong> 🌷
                            </Typography>
                            <Typography align="center" sx={{ color: "#444", fontSize: "0.95rem" }}>
                                Deberás subir una historia a tu Instagram y seguirnos en{" "}
                                <Box component="span" sx={{ fontWeight: 600, color: "#d81b60" }}>@ivelpink.chile</Box>
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
                        sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            color: "#c2185b",
                            fontFamily: "'Poppins', cursive",
                            background: "linear-gradient(to right, #ffe0ec, #fff5f9)",
                            py: 2,
                            animation: `${fadeInUp} 0.6s ease-out`,
                        }}
                    >
                        🌷 Participa del Concurso<br />
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

                    </DialogTitle>

                    <DialogContent sx={{ background: "linear-gradient(to right, #ffe0ec, #fff5f9)", py: 0 }}>
                        <Box display="flex" flexDirection="column" gap={2} mt={1}>
                            <TextField
                                label="🌸 Código Concurso"
                                value={codigo}
                                onChange={(e) => setCodigo(e.target.value)}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-root': {
                                        backgroundColor: "#fff",
                                    },
                                    '& label.Mui-focused': {
                                        color: "#d81b60",
                                    },
                                    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                                        borderColor: "#f06292",
                                    },
                                }}
                            />
                            {codigo.trim() === "" && diasRestantes && (
                                <Box
                                    sx={{
                                        mt: 0.5,
                                        px: 2,
                                        py: 0.8,
                                        backgroundColor: "#f3e8f9",
                                        border: "1px solid #d4a5e8",
                                        borderRadius: "10px",
                                        fontSize: "0.75rem",
                                        color: "#000",
                                        fontFamily: "Poppins, sans-serif",
                                        textAlign: "center",
                                        lineHeight: 1.4,
                                    }}
                                >
                                    ⏳ Faltan <strong>{diasRestantes}</strong> para el Concurso
                                </Box>
                            )}


                            {codigo.trim() !== "" && (
                                <>
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
                                                href="https://www.instagram.com/ivelpink.chile"
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
                                                @ivelpink.chile
                                            </Box>
                                        </Box>
                                    </Box>

                                </>
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
                            disabled={codigo.trim() === ""}
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
                            }}
                        >
                            🌷 Participar
                        </Button>
                    </DialogActions>
                </>
            )
            }
        </Dialog >


    );

};

export default FormularioConcurso;
