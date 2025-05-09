import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    CircularProgress,
    Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RestoreIcon from '@mui/icons-material/Restore';

export const DialogEliminarProducto = ({ open, onClose, onConfirm, eliminando, producto }) => (
    <Dialog
        open={open}
        onClose={() => !eliminando && onClose()}
        PaperProps={{
            sx: {
                borderRadius: 3,
                p: 2,
                backgroundColor: '#1e1e1e',
                color: 'white',
                maxWidth: 420,
            },
        }}
    >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DeleteIcon color="error" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Confirmar eliminación
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ color: 'grey.300', fontSize: 15 }}>
                Estás seguro de eliminar el producto
                <strong> "{producto?.Nombre}"</strong>.
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Button
                variant="outlined"
                disabled={eliminando}
                onClick={onClose}
                sx={{ borderColor: 'grey.500', color: 'grey.300', '&:hover': { borderColor: 'white', color: 'white' } }}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                color="error"
                disabled={eliminando}
                onClick={onConfirm}
                startIcon={eliminando ? <CircularProgress size={18} color="inherit" /> : <DeleteIcon />}
                sx={{ boxShadow: '0px 2px 6px rgba(255,0,0,0.4)' }}
            >
                {eliminando ? "Eliminando..." : "Eliminar"}
            </Button>
        </DialogActions>
    </Dialog>
);

export const DialogRestaurarProductos = ({ open, onClose, onConfirm, restaurando }) => (
    <Dialog
        open={open}
        onClose={(event, reason) => {
            if (!restaurando) onClose();
        }}
        PaperProps={{
            sx: {
                borderRadius: 3,
                p: 2,
                backgroundColor: '#1e1e1e',
                color: 'white',
                maxWidth: 420,
            },
        }}
    >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <RestoreIcon color="info" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Confirmar restauración
            </Typography>
        </DialogTitle>
        <DialogContent>
            <DialogContentText sx={{ color: 'grey.300', fontSize: 15 }}>
                Estás a punto de <strong>restaurar el archivo original de productos</strong> desde la versión local.
                Esta acción <u>sobrescribirá</u> los datos actuales en la nube. ¿Deseas continuar?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Button
                variant="outlined"
                disabled={restaurando}
                onClick={onClose}
                sx={{ borderColor: 'grey.500', color: 'grey.300', '&:hover': { borderColor: 'white', color: 'white' } }}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                color="info"
                disabled={restaurando}
                onClick={onConfirm}
                startIcon={restaurando ? <CircularProgress size={18} color="inherit" /> : <RestoreIcon />}
                sx={{ boxShadow: '0px 2px 6px rgba(0,123,255,0.4)' }}
            >
                {restaurando ? "Restaurando..." : "Restaurar"}
            </Button>
        </DialogActions>
    </Dialog>
);
