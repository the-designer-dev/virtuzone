import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '20px',
  boxShadow: 24
};

export default function BasicModal({
  open,
  setOpen,
  children,
  edit,
  setEdit,
  setData
}) {
  return (
    <div>
      <Modal
        open={open || edit}
        onClose={() => {
          setOpen(false);
          setEdit(false);
          setData(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  );
}
