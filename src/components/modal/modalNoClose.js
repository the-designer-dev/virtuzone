import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper, Icon } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '20px',
    boxShadow: 24
};



export default function ModalNoClose({
    open,
    setOpen,
    children,
    edit,
    setEdit,
    setData
}) {
    const handleClose = (event, reason) => {
        if (reason && reason == "backdropClick")
            return;
        setOpen(false);
        setEdit(false);
        setData(null);
    }
    return (
        <div>
            <Modal
                open={open || edit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}
