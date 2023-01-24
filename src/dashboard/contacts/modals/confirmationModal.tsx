import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function ConfirmationModal(props: any) {
  const handleCancel = () => {
    props.state.setDeleteModalOpen(false);
  };
  const handleConfirm = () => {
    props.state.deleteContact(props.state.selectedUser.id);
    props.state.setDeleteModalOpen(false);
  };
  const handleClose = () => {
    props.state.deleteModalOpen(false);
  };
  return (
    <>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={props.state.deleteModalOpen}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={props.state.deleteModalOpen}>
          <Box sx={style}>
            <h1>
              Do you really wants to delete{' '}
              {props.state.selectedUser.first_name}?
            </h1>
            <Button onClick={handleCancel} variant='outlined'>
              Cancel
            </Button>
            &nbsp;&nbsp;&nbsp;
            <Button onClick={handleConfirm} variant='outlined' color='error'>
              Delete
            </Button>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
export default ConfirmationModal;
