import React, { useEffect, useState } from 'react';
import {
  Container, Typography, Button, Card, CardContent, Snackbar, Alert,
  Box, Grid, TextField, IconButton, Collapse, FormControlLabel, Checkbox, useMediaQuery, useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import RestoreIcon from '@mui/icons-material/Restore';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { cargarProductos } from '../../helpers/HelperProductos';
import { DialogEliminarProducto, DialogRestaurarProductos } from './DialogosProductos';
import MenuInferior from '../configuraciones/MenuInferior';

const ConfigurarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [selected, setSelected] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [restaurarOpen, setRestaurarOpen] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [restaurando, setRestaurando] = useState(false);
  const [actualizando, setActualizando] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });
  const [nuevoProducto, setNuevoProducto] = useState({
    IdProducto: '',
    NombreProducto: '',
    Descripcion: '',
    Valor: '',
    Stock: '',
    ImageUrl: '',
    VideoUrl: '',
    ConDescuento: false
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const cardSize = isMobile ? "300px" : "340px";

  useEffect(() => {
    recargarProductos();
  }, []);

  const recargarProductos = async () => {
    const timestamp = Date.now();
    const data = await cargarProductos(`https://ivelpink.s3.us-east-2.amazonaws.com/Productos.xlsx?t=${timestamp}`);

    const ordenados = [...data].sort((a, b) => String(a.IdProducto).localeCompare(String(b.IdProducto)));


    setProductos(ordenados);
  };

  const handleEditar = (index) => {
    setSelected(index);
    setNuevoProducto({ ...productos[index] });
    setMostrarFormulario(index);
  };

  const handleCancelar = () => {
    setSelected(null);
    setMostrarFormulario(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleGuardar = async () => {
    if (!nuevoProducto.NombreProducto || !nuevoProducto.Valor || isNaN(nuevoProducto.Valor)) {
      setSnackbar({ open: true, message: 'Por favor completa los campos obligatorios.' });
      return;
    }

    if (!nuevoProducto.IdProducto) {
      nuevoProducto.IdProducto = crypto.randomUUID();
    }

    const url = `${window.location.hostname === 'localhost' ? 'http://localhost:9999' : ''}/.netlify/functions/actualizarProducto`;
    setActualizando(true);
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto: nuevoProducto }),
      });
      const result = await res.json();
      setSnackbar({ open: true, message: result.message || 'Producto actualizado.' });
      await recargarProductos();
      handleCancelar();
    } catch (err) {
      console.error('❌ Error al actualizar producto:', err);
      setSnackbar({ open: true, message: 'Error al actualizar producto' });
    } finally {
      setActualizando(false);
    }
  };

  const handleEliminar = (index) => {
    setProductoAEliminar(index);
  };

  const confirmarEliminar = async () => {
    if (productoAEliminar === null) return;
    setEliminando(true);
    try {
      const producto = productos[productoAEliminar];
      const url = `${window.location.hostname === 'localhost' ? 'http://localhost:9999' : ''}/.netlify/functions/eliminarProducto`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ IdProducto: producto.IdProducto })
      });
      const result = await res.json();
      setSnackbar({ open: true, message: result.message || 'Producto eliminado.' });
      await recargarProductos();
    } catch (err) {
      console.error('❌ Error al eliminar producto:', err);
      setSnackbar({ open: true, message: 'Error al eliminar producto' });
    } finally {
      setProductoAEliminar(null);
      setEliminando(false);
    }
  };

  const confirmarRestaurar = async () => {
    setRestaurando(true);
    try {
      const url = `${window.location.hostname === 'localhost' ? 'http://localhost:9999' : ''}/.netlify/functions/restaurarProductos`;
      const res = await fetch(url, { method: 'POST' });
      const result = await res.json();
      setSnackbar({ open: true, message: result.message || 'Productos restaurados' });
      await recargarProductos();
    } catch (err) {
      console.error('❌ Error al restaurar productos:', err);
      setSnackbar({ open: true, message: 'Error al restaurar productos' });
    } finally {
      setRestaurarOpen(false);
      setRestaurando(false);
    }
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ minHeight: '100vh', width: '100vw', overflowX: 'hidden', py: 1, px: 0, pb: 2, backgroundImage: 'url(fondo-blizz-ivelpink.webp)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed', backgroundPosition: 'center' }}>
      <Box sx={{ pt: 14, px: { xs: 2, md: 4 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <SettingsSuggestIcon sx={{ color: 'white', fontSize: 22 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700, fontFamily: 'Roboto, Arial, sans-serif', fontSize: { xs: '0.8rem', sm: '1.25rem' } }}>
              {"Productos actuales".split("").map((char, i) => (
                <motion.span key={i} custom={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }} style={{ display: 'inline-block' }}>
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </Typography>
          </Box>
          <Button variant="outlined" color="inherit" onClick={() => setRestaurarOpen(true)} startIcon={<UpdateIcon />} sx={{ fontSize: { xs: '0.5rem', sm: '1.25rem' }, color: 'white', borderColor: 'white', '&:hover': { backgroundColor: '#ffffff22', borderColor: '#ffffffcc' } }}>Restaurar productos</Button>
        </Box>

        <AnimatePresence>
          {productos.map((producto, idx) => (
            <motion.div
              key={producto.IdProducto || idx}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            >
              <Card sx={{ mb: 1.5, overflow: 'hidden', background: 'rgb(60, 35, 50)', color: 'white', transition: 'all 0.4s ease' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>{producto.NombreProducto}</Typography>
                    <Typography variant="body2">Precio: ${producto.Valor}</Typography>
                    <Typography variant="body2">Stock: {producto.Stock}</Typography>
                  </Box>
                  <Box>
                    <IconButton onClick={() => mostrarFormulario === idx ? handleCancelar() : handleEditar(idx)} sx={{ transition: 'transform 0.3s ease', transform: mostrarFormulario === idx ? 'rotate(180deg)' : 'none', color: mostrarFormulario === idx ? '#dc3545' : 'inherit' }}>
                      {mostrarFormulario === idx ? <CloseIcon /> : <EditIcon />}
                    </IconButton>
                    <IconButton onClick={() => handleEliminar(idx)} sx={{ color: 'white' }}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardContent>

                <Collapse in={mostrarFormulario === idx} timeout={500} unmountOnExit>
                  <Box sx={{ p: 3, background: '#fff', borderTop: '1px solid rgba(0,0,0,0.1)', width: '100%' }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Nombre"
                          name="NombreProducto"
                          value={nuevoProducto.NombreProducto}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Precio"
                          name="Valor"
                          type="number"
                          value={nuevoProducto.Valor}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Stock"
                          name="Stock"
                          type="number"
                          value={nuevoProducto.Stock}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6} display="flex" alignItems="center">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={nuevoProducto.ConDescuento}
                              onChange={handleInputChange}
                              name="ConDescuento"
                              sx={{ color: 'black' }}
                            />
                          }
                          label={<Typography sx={{ color: 'black' }}>¿Producto con descuento?</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Descripción"
                          name="Descripcion"
                          value={nuevoProducto.Descripcion}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Imagen URL"
                          name="ImageUrl"
                          value={nuevoProducto.ImageUrl}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Video URL"
                          name="VideoUrl"
                          value={nuevoProducto.VideoUrl}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Box display="flex" justifyContent="center" mt={2}>
                          <Box width="80%" display="flex" gap={2}>
                            <Button
                              variant="contained"
                              onClick={handleGuardar}
                              disabled={actualizando}
                              startIcon={<UpdateIcon />}
                              fullWidth
                            >
                              Guardar
                            </Button>
                            <Button
                              variant="outlined"
                              onClick={handleCancelar}
                              fullWidth
                            >
                              Cancelar
                            </Button>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>

                  </Box>
                </Collapse>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        <DialogEliminarProducto open={productoAEliminar !== null} producto={productos[productoAEliminar]} eliminando={eliminando} onClose={() => !eliminando && setProductoAEliminar(null)} onConfirm={confirmarEliminar} />
        <DialogRestaurarProductos open={restaurarOpen} restaurando={restaurando} onClose={() => !restaurando && setRestaurarOpen(false)} onConfirm={confirmarRestaurar} />
        <MenuInferior cardSize={cardSize} modo="configurar-productos" />
        <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
          <Alert severity="success" sx={{ width: '100%' }}>{snackbar.message}</Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default ConfigurarProductos;
