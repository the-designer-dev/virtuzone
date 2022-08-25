import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IconButton, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '20px',
  boxShadow: 24
};

const styleBtn = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -10%)',
  borderRadius: '20px',
  boxShadow: 100
};

export default function ImageModal({ image, setImage, children, setImageTitle }) {
  return (
    <div>

      <Modal
        open={image !== null}
        onClose={() => {
          setImage(null)
          setImageTitle(null)
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box
          sx={style}>
          <IconButton
            aria-label="close"
            onClick={() => {
              setImage(null)
              setImageTitle(null)
            }}
            sx={{
              position: 'absolute',
              margin: '20px',
              right: -50,
              top: -50,
              color: 'red',
            }}
          >
            <CloseIcon />
          </IconButton>
          {children}

        </Box>

      </Modal>
    </div >
  );
}
