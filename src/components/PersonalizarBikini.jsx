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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingBagRoundedIcon from "@mui/icons-material/ShoppingBagRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = [
  { id: "rojo", label: "Rojo", hex: "#d32f2f", light: "#ff5252", dark: "#8b0000" },
  { id: "verde-agua", label: "Verde Agua", hex: "#4db6ac", light: "#80cbc4", dark: "#2e7d6e" },
  { id: "turquesa", label: "Turquesa", hex: "#00acc1", light: "#26c6da", dark: "#006978" },
  { id: "cafe", label: "Café", hex: "#5d4037", light: "#8d6e63", dark: "#321911" },
  { id: "fucsia", label: "Fucsia", hex: "#d81b60", light: "#f06292", dark: "#880e4f" },
  { id: "azul-marino", label: "Azul Marino", hex: "#1a237e", light: "#3949ab", dark: "#0d1242" },
  { id: "azul-rey", label: "Azul Rey", hex: "#1565c0", light: "#42a5f5", dark: "#0a3d7a" },
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
          width: { xs: 32, sm: 36 },
          height: { xs: 32, sm: 36 },
          borderRadius: { xs: "10px !important", sm: "12px !important" },
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 700,
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
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
      p: { xs: 1, sm: 1.5 },
      borderRadius: "14px",
      "@media (max-width:600px)": {
        p: 0.85,
        borderRadius: "10px",
      },
      backgroundColor: enabled ? "#fff" : "#fafafa",
      border: enabled ? "2px solid #e8628c" : "2px solid #eee",
      opacity: enabled ? 1 : 0.55,
      transition: "all 0.3s ease",
      boxShadow: enabled ? "0 4px 20px rgba(232,98,140,0.12)" : "none",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: { xs: 0.5, sm: enabled ? 1 : 0 }, transition: "margin 0.3s ease" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.5, sm: 0.8 } }}>
        <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1.1rem" } }}>{emoji}</Typography>
        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "0.7rem", sm: "0.85rem" }, color: enabled ? "#333" : "#999" }}>
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
          style={{ overflow: "hidden", paddingBottom: 2 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.9, sm: 2.5 }, flexWrap: "wrap" }}>
            <Box>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: { xs: "0.58rem", sm: "0.7rem" }, color: "#888", mb: 0.25, textTransform: "uppercase", letterSpacing: 1 }}>
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [topEnabled, setTopEnabled] = useState(true);
  const [bottomEnabled, setBottomEnabled] = useState(true);
  const [topSize, setTopSize] = useState("M");
  const [bottomSize, setBottomSize] = useState("M");
  const [topColor, setTopColor] = useState("azul-rey");
  const [bottomColor, setBottomColor] = useState("azul-rey");
  const [ropeColor, setRopeColor] = useState("cafe");
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

  const getColor = (colorId) => COLORS.find((c) => c.id === colorId) || COLORS[0];
  const getHex = (colorId) => getColor(colorId).hex;

  const handleTopColor = (c) => { setTopColor(c); };
  const handleBottomColor = (c) => { setBottomColor(c); };
  const handleRopeColor = (c) => { setRopeColor(c); };
  const handleTopToggle = () => { setTopEnabled(!topEnabled); };
  const handleBottomToggle = () => { setBottomEnabled(!bottomEnabled); };

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
    setTopEnabled(true);
    setBottomEnabled(true);
    setTopSize("M");
    setBottomSize("M");
    setTopColor("azul-rey");
    setBottomColor("azul-rey");
    setRopeColor("cafe");
    onClose();
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        scroll={isMobile ? "body" : "paper"}
        disableScrollLock={isMobile}
        sx={{
          "& .MuiDialog-container": {
            justifyContent: "center",
            alignItems: "center",
            p: { xs: "2.5vh 2.5vw", sm: "24px" },
          },
        }}
        PaperProps={{
          sx: {
            borderRadius: { xs: "12px", sm: "24px" },
            width: { xs: "95vw", sm: "auto" },
            maxWidth: { xs: "95vw", sm: "1080px" },
            maxHeight: { xs: "95vh", sm: "none" },
            height: { xs: "95vh", sm: "auto" },
            m: { xs: 0, sm: 2 },
            mx: { xs: "auto", sm: "auto" },
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: "linear-gradient(165deg, #fff5f9 0%, #fce4ec 35%, #fff0f5 100%)",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            position: "relative",
            px: { xs: 1.25, sm: 3 },
            pt: { xs: 1.25, sm: 2 },
            pb: { xs: 0.75, sm: 1.5 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Box sx={{ width: 4, height: { xs: 28, sm: 36 }, borderRadius: 2, background: "linear-gradient(180deg, #e8628c, #c2185b)" }} />
            <Box>
              <Typography
                sx={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 800,
                  fontSize: { xs: "0.95rem", sm: "1.25rem" },
                  color: "#c2185b",
                  lineHeight: 1.2,
                }}
              >
                Personaliza tu Bikini
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Albert Sans', sans-serif",
                  fontSize: { xs: "0.65rem", sm: "0.75rem" },
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

        <DialogContent sx={{ px: { xs: 1.25, sm: 3 }, pt: 0, pb: { xs: 1.5, sm: 3.5 }, overflowY: { xs: "auto", sm: "visible" }, flex: { xs: 1, sm: "0 0 auto" }, minHeight: { xs: 0, sm: "auto" } }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: { xs: 1, md: 3 },
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
                  maxWidth: { xs: 240, md: "100%" },
                  borderRadius: "14px",
                  overflow: "hidden",
                  boxShadow: "0 8px 30px rgba(194,24,91,0.12)",
                }}
              >
                <Box
                  component="img"
                  src="/Personalizar/modelo-1.jpg"
                  alt="Bikini personalizable"
                  onLoad={updateImgHeight}
                  sx={{ width: "100%", display: "block" }}
                />
              </Box>
            </Box>

            {/* Right column — Options */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  gap: { xs: 1, sm: 1.5 },
                }}
              >
              {/* Row 1: Parte Superior */}
              <PartCard
                title="Parte Superior"
                emoji="👙"
                enabled={topEnabled}
                onToggle={handleTopToggle}
                size={topSize}
                onSizeChange={setTopSize}
                color={topColor}
                onColorChange={handleTopColor}
              />

              {/* Row 2: Parte Inferior */}
              <PartCard
                title="Parte Inferior"
                emoji="🩱"
                enabled={bottomEnabled}
                onToggle={handleBottomToggle}
                size={bottomSize}
                onSizeChange={setBottomSize}
                color={bottomColor}
                onColorChange={handleBottomColor}
              />

              {/* Row 3: Rope color */}
              <Box
                sx={{
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: { xs: "12px", sm: "14px" },
                  backgroundColor: "#fff",
                  border: "2px solid #f3e5f5",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.8, mb: 0.75 }}>
                  <Typography sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}>🪢</Typography>
                  <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: { xs: "0.8rem", sm: "0.85rem" }, color: "#333" }}>
                    Color de Cuerda
                  </Typography>
                  <Typography sx={{ fontFamily: "'Albert Sans', sans-serif", fontSize: { xs: "0.62rem", sm: "0.68rem" }, color: "#aaa" }}>
                    (ambas prendas)
                  </Typography>
                </Box>
                <ColorSelector value={ropeColor} onChange={handleRopeColor} label="" />
              </Box>
            </Box>
          </Box>

          {/* Bottom: Pricing + Button */}
          <Box
            sx={{
              mt: { xs: 1, sm: 2 },
              display: { xs: "flex", sm: "none" },
              position: "sticky",
              bottom: 0,
              zIndex: 2,
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
              p: 0.75,
              borderRadius: "12px",
              background: "linear-gradient(135deg, #f8bbd0 0%, #f48fb1 50%, #ec407a 100%)",
              border: "2px solid #e91e63",
            }}
          >
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#fff", lineHeight: 1 }}>
              {formatCLP(price)}
            </Typography>
            <Button
              onClick={handleCotizar}
              disabled={partsCount === 0}
              startIcon={<ShoppingBagRoundedIcon />}
              sx={{
                py: 0.55,
                px: 2,
                minWidth: "auto",
                borderRadius: "30px",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: "0.72rem",
                background: partsCount > 0 ? "#fff" : "#ccc",
                whiteSpace: "nowrap",
                minHeight: 34,
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

          <Box
            sx={{
              mt: { xs: 1, sm: 2 },
              p: { xs: 0.75, sm: 1.8 },
              borderRadius: { xs: "12px", sm: "14px" },
              background: "linear-gradient(135deg, #f8bbd0 0%, #f48fb1 50%, #ec407a 100%)",
              border: "2px solid #e91e63",
              display: { xs: "none", sm: "flex" },
              flexDirection: { xs: "row", sm: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              gap: { xs: 1, sm: 2 },
            }}
          >
            {/* Left: badge */}
            <Box sx={{ minWidth: { sm: 130 }, width: { xs: "auto", sm: "auto" }, display: { xs: "none", sm: "block" } }}>
              {partsCount > 0 ? (
                <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, backgroundColor: "rgba(255,255,255,0.25)", backdropFilter: "blur(4px)", px: { xs: 0.75, sm: 1.2 }, py: { xs: 0.25, sm: 0.4 }, borderRadius: "20px", border: "1px solid rgba(255,255,255,0.4)" }}>
                  <Typography sx={{ fontSize: { xs: "0.8rem", sm: "0.85rem" } }}>{partsCount === 2 ? "👙🩱" : (topEnabled ? "👙" : "🩱")}</Typography>
                  <Typography sx={{ display: { xs: "none", sm: "block" }, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: { xs: "0.68rem", sm: "0.75rem" }, color: "#fff" }}>
                    {partsCount === 2 ? "Set completo" : "Una prenda"}
                  </Typography>
                </Box>
              ) : (
                <Typography sx={{ fontFamily: "'Albert Sans', sans-serif", fontSize: { xs: "0.72rem", sm: "0.78rem" }, color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>
                  Selecciona una prenda
                </Typography>
              )}
            </Box>

            {/* Center: price */}
            {partsCount > 0 && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.6, flex: 1, justifyContent: "flex-start" }}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: { xs: "1.1rem", sm: "1.4rem" }, color: "#fff" }}>
                  {formatCLP(price)}
                </Typography>
                {partsCount === 2 && (
                  <Box sx={{ display: { xs: "none", sm: "flex" }, backgroundColor: "#e53935", px: 0.7, py: 0.25, borderRadius: "8px", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "0.6rem", color: "#fff", lineHeight: 1 }}>
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
                py: { xs: 0.55, sm: 1.1 },
                px: { xs: 2, sm: 3.5 },
                minWidth: { xs: "auto", sm: 180 },
                borderRadius: "30px",
                textTransform: "none",
                fontFamily: "'Poppins', sans-serif",
                fontWeight: 700,
                fontSize: { xs: "0.72rem", sm: "0.9rem" },
                background: partsCount > 0
                  ? "#fff"
                  : "#ccc",
                whiteSpace: "nowrap",
                minHeight: { xs: 34, sm: "auto" },
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
