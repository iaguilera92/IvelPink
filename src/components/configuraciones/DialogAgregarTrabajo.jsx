import React, { useState, useEffect } from "react";
import { Snackbar, Alert, Slider, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton, Slide, Box, Typography, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { motion, AnimatePresence } from "framer-motion";
import { CircularProgress } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAgregarTrabajo({ open, onClose, onSave }) {
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", type: "success" });
  const [success, setSuccess] = useState(false);


  const [form, setForm] = useState({
    trabajo: "",
    tipoTrabajo: "1",
    stockActual: 0,
    stockSolicitado: 0,
    nombreCliente: "",
    emailCliente: "",
    telefonoCliente: "",
    fechaCreacion: ""
  });


  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onSave(form);   // 👈 notifica al padre después de los 3 s
        setSuccess(false);
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success, onClose, onSave, form]);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setForm({ trabajo: "", tipoTrabajo: "1", stockActual: 0 }); // 👈 opcional, limpia también el form
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.trabajo || !form.tipoTrabajo) {
      setSnackbar({ open: true, type: "error", message: "Completa los campos obligatorios" });
      return;
    }

    try {
      setLoading(true);

      const url = `${window.location.hostname === "localhost"
        ? "http://localhost:9999"
        : ""
        }/.netlify/functions/agregarTrabajo`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al guardar");

      // 👇 en lugar de cerrar → mostrar éxito
      setLoading(false);
      setSuccess(true);

    } catch (error) {
      console.error("❌ Error al guardar:", error);
      setSnackbar({ open: true, type: "error", message: "Hubo un problema al guardar el trabajo." });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog
      open={open}
      onClose={(event, reason) => {
        if (reason === "backdropClick" || reason === "escapeKeyDown") {
          return;
        }
        onClose();
      }}
      maxWidth="sm"
      fullWidth
      scroll="body"
      TransitionComponent={Transition}
      PaperProps={{
        sx: {
          mt: { xs: 0, sm: -3 },
          borderRadius: 2,
          border: "1px solid rgba(255,167,38,.35)",
          boxShadow: "0 24px 64px rgba(0,0,0,.45)",
          overflow: "hidden",
          "& .MuiDialogContent-root": { marginTop: 0 },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        sx={{
          textAlign: "center",
          fontWeight: 700,
          color: "#FFF",
          fontFamily: "'Poppins', sans-serif",
          py: 2,
          borderBottom: "1px solid rgba(255,167,38,.35)",
          position: "relative",
          overflow: "hidden",

          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: "url('/Area-1.webp')",
            backgroundPosition: "center top 40%",
            backgroundRepeat: "no-repeat",
            zIndex: 0,

            // Desktop
            backgroundSize: "130%",
            animation: "zoomInDesktop 2.5s ease-out forwards",

            // Mobile override
            "@media (max-width:600px)": {
              backgroundSize: "250%",              // 👈 inicia súper cerca
              animation: "zoomInMobile 2.5s ease-out forwards",
            },

            "@keyframes zoomInDesktop": {
              "0%": { backgroundSize: "150%" },
              "100%": { backgroundSize: "110%" },
            },
            "@keyframes zoomInMobile": {
              "0%": { backgroundSize: "270%" },   // 👈 más zoom inicial en mobile
              "100%": { backgroundSize: "140%" }, // 👈 termina aún con presencia
            },
          },

          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0,0,0,0.45)", // overlay oscuro
            zIndex: 1,
          },

          "& > *": {
            position: "relative",
            zIndex: 2,
          },
        }}
      >

        {/* Botón cerrar */}
        <IconButton
          aria-label="Cerrar"
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "#FFF",
            zIndex: 4, // 👈 más arriba que ::before y ::after
            "&:hover": { backgroundColor: "rgba(255,255,255,.15)" },

            // animación al abrir
            animation: open ? "spinTwice 0.6s ease-in-out" : "none",
            animationFillMode: "forwards",
            "@keyframes spinTwice": {
              "0%": { transform: "rotate(0deg)" },
              "100%": { transform: "rotate(720deg)" },
            },
          }}
        >
          <CloseRoundedIcon sx={{ fontSize: 28 }} />
        </IconButton>


        {/* Fila: ícono reloj + título */}
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: { xs: 0.8, sm: 1.2 }, // espacio entre texto e ícono
            px: { xs: 1.2, sm: 2 },
            py: { xs: 0.5, sm: 0.8 },
            borderRadius: "999px",
            bgcolor: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            boxShadow: "0 4px 14px rgba(0,0,0,.35)",
          }}
        >
          <Typography
            variant="h6"
            component="span"
            sx={{
              fontWeight: 800,
              letterSpacing: { xs: "0.3px", sm: "1px" },
              fontFamily: "'Poppins', sans-serif",
              color: "#fff",
              fontSize: { xs: "1.1rem", sm: "1.25rem" },
            }}
          >
            {success ? "¡Éxito!" : "Agregar Trabajo"}
          </Typography>

          {/* Ícono a la derecha */}
          <WorkOutlineIcon
            sx={{ color: "#fff", fontSize: { xs: 20, sm: 24 } }}
          />
        </Box>

      </DialogTitle>

      <AnimatePresence>
        {!loading && (
          <motion.div
            key="content"
            initial={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }} // ⏱️ animación de 1s
          >
            <DialogContent
              dividers
              sx={{
                py: 3,
                pb: 2,
                bgcolor: success ? "#e6f4ea" : "#FFF8EC",
                position: "relative",
                overflow: "visible",
              }}
            >
              <AnimatePresence mode="wait">
                {success ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }} // controla solo el colapso
                  >
                    <Box textAlign="center" sx={{ pt: 2 }}>
                      <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.5 }}
                      >
                        <Box
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#4caf50",
                            borderRadius: "50%",
                            width: 96,
                            height: 96,
                            mb: 2,
                            mt: 1, // 👈 agrega margen superior
                            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                          }}
                        >
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 1 }}
                          >
                            <CheckIcon
                              sx={{
                                fontSize: 60,
                                color: "#fff",
                                transform: "translateY(2px)", // 👈 menos agresivo que 6px
                              }}
                            />
                          </motion.div>
                        </Box>
                      </motion.div>
                      <Typography variant="h6" fontWeight={700} color="success.dark">
                        Trabajo creado correctamente!
                      </Typography>
                    </Box>

                  </motion.div>
                ) : (

                  <Box display="flex" flexDirection="column" gap={3}>
                    <TextField
                      label="Nombre del Trabajo"
                      name="trabajo"
                      value={form.trabajo}
                      onChange={handleChange}
                      fullWidth
                      required
                      variant="outlined"
                      size="small"
                      InputProps={{
                        startAdornment: <span style={{ marginRight: 6 }}>🛠️</span>, // 👈 emoji ícono
                      }}
                      sx={{
                        backgroundColor: "#fff", // 👈 fondo blanco fijo
                        borderRadius: 2.5,
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff", // 👈 asegura fondo blanco también en input
                          borderRadius: 2.5,
                          transition: "all 0.25s ease",
                          "&:hover fieldset": {
                            borderColor: "#FB8C00",
                            boxShadow: "0 0 0 2px rgba(251,140,0,0.15)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#F57C00",
                            borderWidth: 2,
                            boxShadow: "0 0 0 2px rgba(245,124,0,0.25)",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          fontSize: "0.85rem",
                          fontWeight: 600,
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#F57C00",
                        },
                      }}
                    />
                    {/* 🔥 Datos del cliente */}
                    <Box display="flex" flexDirection="column" gap={2}>
                      <TextField
                        label="Nombre Cliente"
                        name="nombreCliente"
                        value={form.nombreCliente}
                        onChange={(e) => {
                          const value = e.target.value;
                          // 👇 Solo letras (mayúsculas/minúsculas), espacios y acentos
                          if (/^[a-zA-ZÀ-ÿ\s]*$/.test(value)) {
                            handleChange(e); // solo actualiza si pasa la validación
                          }
                        }}
                        required
                        size="small"
                        sx={{
                          backgroundColor: "#fff",
                          borderRadius: 2,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            "&:hover fieldset": { borderColor: "#FB8C00" },
                            "&.Mui-focused fieldset": { borderColor: "#F57C00", borderWidth: 2 },
                          },
                          "& .MuiInputLabel-root.Mui-focused": { color: "#F57C00" },
                        }}
                        InputProps={{
                          startAdornment: <span style={{ marginRight: 6 }}>👤</span>,
                        }}
                      />


                      <TextField
                        label="Email Cliente"
                        name="emailCliente"
                        type="email"
                        value={form.emailCliente}
                        onChange={handleChange}
                        required
                        size="small"
                        error={
                          form.emailCliente !== "" &&
                          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailCliente) // 👈 validador simple de email
                        }
                        helperText={
                          form.emailCliente !== "" &&
                            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailCliente)
                            ? "Ingresa un correo válido (ej: cliente@gmail.com)"
                            : ""
                        }
                        sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                        InputProps={{
                          startAdornment: <span style={{ marginRight: 6 }}>📧</span>,
                        }}
                      />


                      <TextField
                        label="Teléfono Cliente"
                        name="telefonoCliente"
                        type="tel"
                        value={form.telefonoCliente}
                        onChange={(e) => {
                          const onlyNums = e.target.value.replace(/\D/g, "");
                          setForm((prev) => ({
                            ...prev,
                            telefonoCliente: onlyNums.slice(0, 12),
                          }));
                        }}
                        required
                        size="small"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          maxLength: 12,
                        }}
                        sx={{ backgroundColor: "#fff", borderRadius: 2 }}
                        InputProps={{
                          startAdornment: <span style={{ marginRight: 6 }}>📱</span>,
                        }}
                      />
                    </Box>
                    <FormControl required sx={{
                      m: 0, p: 0,
                      "& .MuiFormGroup-root": { m: 0 },
                    }}>
                      <FormLabel
                        component="legend"
                        sx={{ fontWeight: 600, color: "#E65100", mb: 0, fontSize: "0.9rem" }}
                      >
                        Tipo de Trabajo
                      </FormLabel>
                      <RadioGroup
                        row
                        name="tipoTrabajo"
                        value={form.tipoTrabajo}
                        onChange={handleChange}
                        sx={{ m: 0, p: 0 }}
                      >
                        <FormControlLabel
                          value="2"
                          control={<Radio color="warning" />}
                          label={
                            <Typography
                              sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                            >
                              Mayorista
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="1"
                          control={<Radio color="warning" />}
                          label={
                            <Typography
                              sx={{ fontWeight: 600, color: "#333", fontSize: { xs: "0.8rem", sm: "0.9rem" } }}
                            >
                              Confección IvelPink
                            </Typography>
                          }
                        />
                      </RadioGroup>
                    </FormControl>


                    {/* 🔥 BLOQUE MODERNO: STOCKS con emoji */}
                    <Box
                      display="flex"
                      gap={2}
                      sx={{
                        mt: -2.2,
                        flexDirection: { xs: "column", sm: "row" },
                        "& .MuiTextField-root": {
                          flex: 1,
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            backgroundColor: "#fff",
                            transition: "all 0.25s ease",
                            "& input": {
                              textAlign: "right", // 👈 alinear números a la derecha
                              fontWeight: 600,
                              fontSize: "0.9rem",
                            },
                            "&:hover fieldset": {
                              borderColor: "#FB8C00",
                              boxShadow: "0 0 0 2px rgba(251,140,0,0.15)",
                            },
                            "&.Mui-focused fieldset": {
                              borderColor: "#F57C00",
                              borderWidth: 2,
                            },
                          },
                          "& .MuiInputLabel-root": {
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#F57C00",
                          },
                        },
                      }}
                    >
                      <TextField
                        type="number"
                        label="Stock Actual"
                        name="stockActual"
                        value={form.stockActual || ""}
                        onChange={handleChange}
                        required
                        size="small"
                        InputProps={{
                          endAdornment: <span style={{ marginLeft: 6 }}>✅</span>,
                          inputProps: {
                            min: 0,
                            maxLength: 4,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          },
                        }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4); // solo números, máx 4 dígitos
                        }}
                      />

                      <TextField
                        type="number"
                        label="Stock Solicitado"
                        name="stockSolicitado"
                        value={form.stockSolicitado || ""}
                        onChange={handleChange}
                        required
                        size="small"
                        InputProps={{
                          endAdornment: <span style={{ marginLeft: 6 }}>📦</span>,
                          inputProps: {
                            min: 1,
                            maxLength: 4,
                            inputMode: "numeric",
                            pattern: "[0-9]*",
                          },
                        }}
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
                        }}
                      />

                    </Box>

                  </Box>
                )}
              </AnimatePresence>
            </DialogContent>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(255,255,255,0.65)",
            backdropFilter: "blur(3px)",
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress
            size={48}
            sx={{
              color: "warning.main",
              animation: "pulse 1.5s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)", opacity: 1 },
                "50%": { transform: "scale(1.2)", opacity: 0.6 },
                "100%": { transform: "scale(1)", opacity: 1 },
              },
            }}
          />
        </Box>
      )}
      {/* FOOTER */}
      <DialogActions sx={{
        justifyContent: "center", py: 2, background: "linear-gradient(90deg,#FFF3E0,#FFE0B2)", borderTop: "1px solid rgba(255,167,38,.35)",
      }}>
        {success ? (
          <Button
            variant="contained"
            color="success"
            disabled
            sx={{ fontWeight: 700, textTransform: "none" }}
          >
            Nuevo Trabajo Registrado💰
          </Button>
        ) : (
          <>
            <Button
              onClick={onClose}
              sx={{
                color: "#E65100",
                fontWeight: 700,
                textTransform: "none",
                px: 3,
                minWidth: 160,
                border: "1px solid #E65100",
                "&:hover": {
                  backgroundColor: "rgba(230,81,0,0.08)",
                },
              }}
            >
              Cancelar
            </Button>

            <Button
              variant="contained"
              onClick={handleSave}
              disabled={loading}
              sx={{
                textTransform: "none",
                fontWeight: 700,
                px: 3,
                minWidth: 150,
                background: "linear-gradient(90deg,#FF9800,#F57C00)",
                "&:hover": {
                  background: "linear-gradient(90deg,#FFA726,#FB8C00)",
                },
              }}
            >
              Crear Trabajo
            </Button>

          </>
        )}
      </DialogActions>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.type}>{snackbar.message}</Alert>
      </Snackbar>
    </Dialog >
  );
}
