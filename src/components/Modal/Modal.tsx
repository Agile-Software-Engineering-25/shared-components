import React from 'react';
import { Divider, Modal, ModalClose, ModalDialog, Typography } from '@mui/joy';
import type { SxProps } from '@mui/joy/styles/types';
import type { ReactNode } from 'react';

export interface ModalProps {
  header: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  disableEscape?: boolean;
  modalSX?: SxProps;
  modalDialogSX?: SxProps;
  children: ReactNode;
}

/**
 * A customizable modal dialog component with blur background and drop shadow.
 * 
 * @param {ModalProps} props - The props for the Modal component
 * @param {string} props.header - The header text displayed at the top of the modal
 * @param {boolean} props.open - Controls whether the modal is open
 * @param {function} props.setOpen - Function to control modal open/close state
 * @param {boolean} [props.disableEscape=false] - Whether to disable closing with escape key
 * @param {SxProps} [props.modalSX] - Additional styles for the modal backdrop
 * @param {SxProps} [props.modalDialogSX] - Additional styles for the modal dialog
 * @param {ReactNode} props.children - The content to be rendered inside the modal
 * @returns {JSX.Element} The rendered Modal component
 */
const GenericModal: React.FC<ModalProps> = ({
  header,
  open,
  setOpen,
  disableEscape = false,
  modalSX,
  modalDialogSX,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        zIndex: 999,
        backdropFilter: 'blur(4px)',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        ...modalSX,
      }}
      disableEscapeKeyDown={disableEscape}
    >
      <ModalDialog
        sx={{
          minWidth: { md: '400px', xs: '90vw' },
          overflowY: 'auto',
          borderRadius: '10px',
          boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.2)',
          ...modalDialogSX,
        }}
      >
        <Typography
          level="title-lg"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            userSelect: 'none',
          }}
          color="primary"
        >
          {header}
          <ModalClose 
            sx={{ 
              position: 'relative', 
              top: 0, 
              right: 0,
              color: 'primary.500',
            }} 
          />
        </Typography>
        <Divider inset="none" sx={{ marginBottom: 1 }} />
        {children}
      </ModalDialog>
    </Modal>
  );
};

export default GenericModal;