import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Button,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { id: "rojo", label: "Rojo", hex: "#e53935" },
  { id: "verde-agua", label: "Verde Agua", hex: "#80cbc4" },
  { id: "turquesa", label: "Turquesa", hex: "#26c6da" },
  { id: "cafe", label: "Café", hex: "#795548" },
  { id: "fucsia", label: "Fucsia", hex: "#e91e90" },
  { id: "azul-marino", label: "Azul Marino", hex: "#1a237e" },
  { id: "azul-rey", label: "Azul Rey", hex: "#1565c0" },
];

const SIZES = ["S", "M", "L"];

const ColorSelector = ({ value, onChange, label }) => (
  <Box>
    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.75rem", color: "#888", mb: 0.8, textTransform: "uppercase", letterSpacing: 1 }}>
      {label}
    </Typography>
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", pb: 0.3 }}>
      {COLORS.map((c) => (
        <Box
          key={c.id}
          onClick={() => onChange(c.id)}
          sx={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            backgroundColor: c.hex,
            cursor: "pointer",
            border: value === c.id ? "3px solid #fff" : "3px solid transparent",
            boxShadow: value === c.id ? `0 0 0 2px ${c.hex}, 0 4px 12px ${c.hex}55` : "0 2px 6px rgba(0,0,0,0.15)",
            transition: "all 0.25s ease",
            transform: value === c.id ? "scale(1.15)" : "scale(1)",
            "&:hover": { transform: "scale(1.15)" },
          }}
        />
      ))}
    </Box>
  </Box>
);

const SizeSelector = ({ value, onChange }) => (
  <ToggleButtonGroup
    value={value}
    exclusive
    onChange={(_, v) => v && onChange(v)}
    sx={{ gap: 0.6, "& .MuiToggleButtonGroup-grouped": { border: "none" } }}
  >
    {SIZES.map((s) => (
      <ToggleButton
        key={s}
        value={s}
        sx={{
          width: 36,
          height: 36,
          borderRadius: "12px !important",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: "0.85rem",
          color: value === s ? "#fff" : "#666",
          backgroundColor: value === s ? "#e8628c" : "#f5f5f5",
          border: "2px solid transparent !important",
          transition: "all 0.25s ease",
          "&.Mui-selected": {
            backgroundColor: "#e8628c",
            color: "#fff",
            boxShadow: "0 4px 12px rgba(232,98,140,0.35)",
            "&:hover": { backgroundColor: "#d4477a" },
          },
          "&:hover": { backgroundColor: value === s ? "#d4477a" : "#eee" },
        }}
      >
        {s}
      </ToggleButton>
    ))}
  </ToggleButtonGroup>
);

const PartCard = ({ title, emoji, enabled, onToggle, size, onSizeChange, color, onColorChange }) => (
  <Box
    sx={{
      p: 1.5,
      borderRadius: "14px",
      backgroundColor: enabled ? "#fff" : "#fafafa",
      border: enabled ? "2px solid #e8628c" : "2px solid #eee",
      opacity: enabled ? 1 : 0.55,
      transition: "all 0.3s ease",
      boxShadow: enabled ? "0 4px 20px rgba(232,98,140,0.12)" : "none",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: enabled ? 1 : 0, transition: "margin 0.3s ease" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
        <Typography sx={{ fontSize: "1.1rem" }}>{emoji}</Typography>
        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: enabled ? "#333" : "#999" }}>
          {title}
        </Typography>
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={enabled}
            onChange={onToggle}
            size="small"
            sx={{ color: "#e8628c", "&.Mui-checked": { color: "#e8628c" } }}
          />
        }
        label=""
        sx={{ m: 0 }}
      />
    </Box>
    <AnimatePresence initial={false}>
      {enabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: "hidden", paddingBottom: 4 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2.5, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.7rem", color: "#888", mb: 0.5, textTransform: "uppercase", letterSpacing: 1 }}>
                Talla
              </Typography>
              <SizeSelector value={size} onChange={onSizeChange} />
            </Box>
            <ColorSelector value={color} onChange={onColorChange} label="Color prenda" />
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
    </Box>
);

const PersonalizarBikini = ({ open, onClose }) => {
  const [topEnabled, setTopEnabled] = useState(true);
  const [bottomEnabled, setBottomEnabled] = useState(true);
  const [topSize, setTopSize] = useState("M");
  const [bottomSize, setBottomSize] = useState("M");
  const [topColor, setTopColor] = useState("rojo");
  const [bottomColor, setBottomColor] = useState("rojo");
  const [ropeColor, setRopeColor] = useState("rojo");
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const containerRef = useRef(null);
  const [imgHeight, setImgHeight] = useState(null);

  const updateImgHeight = useCallback(() => {
    if (containerRef.current) setImgHeight(containerRef.current.offsetHeight);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateImgHeight);
    return () => window.removeEventListener("resize", updateImgHeight);
  }, [updateImgHeight]);

  const getHex = (colorId) => COLORS.find((c) => c.id === colorId)?.hex || "#e53935";

  const partsCount = (topEnabled ? 1 : 0) + (bottomEnabled ? 1 : 0);
  const price = useMemo(() => {
    if (partsCount === 2) return 16000;
    if (partsCount === 1) return 10000;
    return 0;
  }, [partsCount]);

  const formatCLP = (n) => `$${n.toLocaleString("es-CL")} CLP`;

  const buildSummary = () => {
    const parts = [];
    if (topEnabled) parts.push(`Sostén: ${topSize} - ${COLORS.find((c) => c.id === topColor).label}`);
    if (bottomEnabled) parts.push(`Bikini: ${bottomSize} - ${COLORS.find((c) => c.id === bottomColor).label}`);
    parts.push(`Cuerda: ${COLORS.find((c) => c.id === ropeColor).label}`);
    return parts.join(" | ");
  };

  const handleCotizar = () => {
    if (partsCount === 0) {
      setSnackMsg("Selecciona al menos una prenda para cotizar.");
      setSnackOpen(true);
      return;
    }
    const summary = buildSummary();
    const msg = encodeURIComponent(`Hola! Me interesa cotizar un bikini personalizado:\n\n${summary}\n\nTotal: ${formatCLP(price)}`);
    window.open(`https://api.whatsapp.com/send?phone=56979897336&text=${msg}`, "_blank");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        scroll="body"
        disableScrollLock
        PaperProps={{
          sx: {
            borderRadius: { xs: "12px", sm: "24px" },
            maxHeight: { xs: "98vh", sm: "94vh" },
            height: { xs: "98vh", sm: "auto" },
            m: { xs: "1vh", sm: 2 },
            overflowY: { xs: "auto", sm: "visible" },
            background: "linear-gradient(165deg, #fff5f9 0%, #fce4ec 35%, #fff0f5 100%)",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            px: { xs: 1.5, sm: 3 },
            pt: { xs: 1.5, sm: 2 },
            pb: { xs: 1, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box sx={{ width: 4, height: 36, borderRadius: 2, background: "linear-gradient(180deg, #e8628c, #c2185b)" }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                  color: "#c2185b",
                  lineHeight: 1.2,
                }}
              >
                Personaliza tu Bikini
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  color: "#aaa",
                  mt: 0.2,
                }}
              >
                Elige prendas, tallas y colores a tu gusto
              </Typography>
            </Box>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              backgroundColor: "rgba(0,0,0,0.04)",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.08)" },
              animation: "spinClose 0.8s ease-out",
              "@keyframes spinClose": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(1080deg)" },
              },
            }}
          >
            <CloseIcon sx={{ fontSize: 18, color: "#999" }} />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: { xs: 1.5, sm: 3 }, pt: 0, pb: { xs: 1.5, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1.5, md: 3 },
              alignItems: { md: "flex-start" },
            }}
          >
            {/* Left column — Layered Image */}
            <Box
              sx={{
                flex: { md: "0 0 36%" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                ref={containerRef}
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: { xs: 180, md: "100%" },
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(194,24,91,0.12)",
                }}
              >
                {/* Background */}
                <Box
                  component="img"
                  src="/Personalizar/fondo-modelo.avif"
                  alt=""
                  onLoad={updateImgHeight}
                  sx={{ width: "100%", display: "block" }}
                />
                {/* All layers wrapper — offset down */}
                <Box sx={{ position: "absolute", inset: 0, top: "3%" }}>
                {/* Base mannequin */}
                <Box
                  component="img"
                  src="/Personalizar/base.png"
                  alt=""
                  sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" }}
                />
                {/* Rope layer (behind garments) */}
                <Box
                  component="img"
                  src="/Personalizar/cuerda.png"
                  alt=""
                  sx={{ position: "absolute", top: "15%", left: "8%", width: "84%", height: "auto" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: "15%",
                    left: "8%",
                    width: "84%",
                    height: "80%",
                    backgroundColor: getHex(ropeColor),
                    mixBlendMode: "multiply",
                    WebkitMaskImage: "url(/Personalizar/cuerda.png)",
                    maskImage: "url(/Personalizar/cuerda.png)",
                    WebkitMaskSize: "100% auto",
                    maskSize: "100% auto",
                    WebkitMaskPosition: "top center",
                    maskPosition: "top center",
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    transition: "background-color 0.3s ease",
                  }}
                />
                {/* Top layer (above ropes) */}
                {topEnabled && (
                  <>
                    <Box
                      component="img"
                      src="/Personalizar/top.png"
                      alt=""
                      sx={{ position: "absolute", top: "18%", left: "20%", width: "58%", height: "auto" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "18%",
                        left: "20%",
                        width: "58%",
                        height: "30%",
                        backgroundColor: getHex(topColor),
                        mixBlendMode: "multiply",
                        WebkitMaskImage: "url(/Personalizar/top.png)",
                        maskImage: "url(/Personalizar/top.png)",
                        WebkitMaskSize: "100% auto",
                        maskSize: "100% auto",
                        WebkitMaskPosition: "top center",
                        maskPosition: "top center",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  </>
                )}
                {/* Bottom layer (above ropes) */}
                {bottomEnabled && (
                  <>
                    <Box
                      component="img"
                      src="/Personalizar/bottom.png"
                      alt=""
                      sx={{ position: "absolute", top: "48%", left: "22%", width: "54%", height: "auto" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: "48%",
                        left: "22%",
                        width: "54%",
                        height: "45%",
                        backgroundColor: getHex(bottomColor),
                        mixBlendMode: "multiply",
                        WebkitMaskImage: "url(/Personalizar/bottom.png)",
                        maskImage: "url(/Personalizar/bottom.png)",
                        WebkitMaskSize: "100% auto",
                        maskSize: "100% auto",
                        WebkitMaskPosition: "top center",
                        maskPosition: "top center",
                        WebkitMaskRepeat: "no-repeat",
                        maskRepeat: "no-repeat",
                        transition: "background-color 0.3s ease",
                      }}
                    />
                  </>
                )}
                </Box>{/* close layers wrapper */}
              </Box>
            </Box>

            {/* Right column — Options */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}
            >
              {/* Row 1: Parte Superior */}
              <PartCard
                title="Parte Superior"
                emoji="👙"
                enabled={topEnabled}
                onToggle={() => setTopEnabled(!topEnabled)}
                size={topSize}
                onSizeChange={setTopSize}
                color={topColor}
                onColorChange={setTopColor}
              />

              {/* Row 2: Parte Inferior */}
              <PartCard
                title="Parte Inferior"
                emoji="🩱"
                enabled={bottomEnabled}
                onToggle={() => setBottomEnabled(!bottomEnabled)}
                size={bottomSize}
                onSizeChange={setBottomSize}
                color={bottomColor}
                onColorChange={setBottomColor}
              />

              {/* Row 3: Rope color */}
              <Box
                sx={{
                  p: 1.5,
                  borderRadius: "14px",
                  backgroundColor: "#fff",
                  border: "2px solid #f3e5f5",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 1 }}>
                  <Typography sx={{ fontSize: "1rem" }}>🪢</Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: "#333" }}>
                    Color de Cuerda
                  </Typography>
                  <Typography sx={{ fontFamily: "'Albert Sans', sans-serif", fontSize: "0.68rem", color: "#aaa" }}>
                    (ambas prendas)
                  </Typography>
                </Box>
                <ColorSelector value={ropeColor} onChange={setRopeColor} label="" />
              </Box>
            </Box>
          </Box>

          {/* Bottom: Pricing + Button */}
          <Box
            sx={{
              mt: { xs: 1.5, sm: 2 },
              p: { xs: 1.5, sm: 1.8 },
              borderRadius: { xs: "12px", sm: "14px" },
              background: "linear-gradient(135deg, #f8bbd0 0%, #f48fb1 50%, #ec407a 100%)",
              border: "2px solid #e91e63",
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1, sm: 2 },
            }}
          >
            {/* Left: badge */}
            <Box sx={{ minWidth: { sm: 130 }, width: { xs: "100%", sm: "auto" } }}>
              {partsCount > 0 ? (
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, backgroundColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)", px: 1.2, py: 0.4, borderRadius: "20px", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <Typography sx={{ fontSize: "0.85rem" }}>{partsCount === 2 ? "👙🩱" : (topEnabled ? "👙" : "🩱")}</Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: "0.75rem", color: "#fff" }}>
                    {partsCount === 2 ? "Set completo" : "Una prenda"}
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ fontFamily: "'Albert Sans', sans-serif", fontSize: "0.78rem", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                  Selecciona una prenda
                </Typography>
              )}
            </Box>

            {/* Center: price */}
            {partsCount > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "1.3rem", sm: "1.4rem" }, color: "#fff" }}>
                  {formatCLP(price)}
                </Typography>
                {partsCount === 2 && (
                  <Box sx={{ backgroundColor: "#e53935", px: 0.8, py: 0.3, borderRadius: "8px", display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.65rem", color: "#fff", lineHeight: 1 }}>
                      -20%
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {/* Right: button */}
            <Button
              onClick={handleCotizar}
              disabled={partsCount === 0}
              startIcon={<ShoppingBagRoundedIcon />}
              sx={{
                py: { xs: 1, sm: 1.1 },
                px: { xs: 3, sm: 3.5 },
                minWidth: { xs: "100%", sm: 180 },
                borderRadius: "30px",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "0.85rem", sm: "0.9rem" },
                background: partsCount > 0
                  ? "#fff"
                  : "#ccc",
                color: partsCount > 0 ? "#c2185b" : "#aaa",
                boxShadow: partsCount > 0 ? "0 4px 16px rgba(0,0,0,0.15)" : "none",
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#fff",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
                  transform: "translateY(-2px)",
                },
                "&.Mui-disabled": {
                  background: "#ddd",
                  color: "#aaa",
                },
              }}
            >
              Cotizar Bikini
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => setSnackOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setSnackOpen(false)} severity="warning" sx={{ fontFamily: "Poppins, sans-serif" }}>
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PersonalizarBikini;
