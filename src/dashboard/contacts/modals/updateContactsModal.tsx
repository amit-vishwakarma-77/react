import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Contacts } from '../../../interfaces';

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

export default function UpdateContactDetailsModal(props: any) {
  const modalType = props.state.modalType;
  const handleClose = () => props.state.setOpen(false);
  const [selectedUser, setSelectedUser] = useState({} as Contacts);
  useEffect(() => {
    setSelectedUser(props.state.selectedUser);
  }, [props.state.selectedUser]);

  function formHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedUser((currentState) => {
      return { ...currentState, [event.target.name]: event.target.value };
    });
  }
  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    event.preventDefault();
    props.state.updateContact(selectedUser.id, selectedUser);
    handleClose();
  }
  function resetForm() {
    setSelectedUser(props.state.selectedUser);
  }
  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={props.state.open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={props.state.open}>
          <Box sx={style}>
            <Button onClick={handleClose}>Close modal</Button>
            <form onSubmit={handleSubmit}>
              <TextField
                label='First Name'
                variant='outlined'
                margin='normal'
                type='text'
                name='first_name'
                value={selectedUser ? selectedUser.first_name : ''}
                onChange={formHandler}
                required
                fullWidth
              />
              <TextField
                label='Last Name'
                variant='outlined'
                margin='normal'
                type='text'
                name='last_name'
                value={selectedUser ? selectedUser.last_name : ''}
                onChange={formHandler}
                required
                fullWidth
              />
              <TextField
                label='Email'
                variant='outlined'
                margin='normal'
                type='email'
                name='email'
                value={selectedUser ? selectedUser.email : ''}
                onChange={formHandler}
                required
                disabled={modalType === 'update' ? true : false}
                fullWidth
              />
              <FormControl>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='gender'
                  row
                  value={selectedUser ? selectedUser.gender : ''}
                  onChange={formHandler}
                >
                  <FormControlLabel
                    value='female'
                    control={<Radio value='female' />}
                    label='Female'
                  />
                  <FormControlLabel
                    value='male'
                    control={<Radio value='male' />}
                    label='Male'
                  />
                </RadioGroup>
              </FormControl>
              <br />
              <div>
                <Button onClick={resetForm} variant='outlined'>
                  Reset
                </Button>
                &nbsp;&nbsp; &nbsp;
                <Button type='submit' variant='outlined' color='success'>
                  {modalType === 'update' ? 'Update User' : 'Add New User'}
                </Button>
              </div>
            </form>
            {/* {errors[formField.name] && <p>{errors[formField.name].message}</p>} */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
