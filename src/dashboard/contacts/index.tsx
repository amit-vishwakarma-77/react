import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Button } from '@mui/material';
import { useContacts } from '../dashboard';
import { useState } from 'react';
import {
  Contacts as interfaceContact,
  contactsModalType,
} from '../../interfaces';
import UpdateContactDetailsModal from './modals/updateContactsModal';
import ConfirmationModal from './modals/confirmationModal';

function Contacts() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState(contactsModalType.add);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(
    {} as interfaceContact | null
  );

  const handleOpen = () => {
    setSelectedUser(null);
    setOpen(true);
  };
  const addNewContact = () => {
    setModalType(contactsModalType.add);
    setSelectedUser({} as interfaceContact);
    setOpen(true);
  };
  const editContact = () => {
    setModalType(contactsModalType.update);
    setOpen(true);
  };
  // const handleClose = () => setOpen(false);
  const { allContacts, updateContact, deleteContact } = useContacts();
  const deleteContactClicked = (user: interfaceContact) => {
    setDeleteModalOpen(true);
    setSelectedUser(user);
  };

  const columns = getColumns(handleOpen);

  function getColumns(handleOpen: any) {
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'ID', width: 10 },
      { field: 'first_name', headerName: 'First name', width: 130 },
      { field: 'last_name', headerName: 'Last name', width: 130 },
      {
        field: 'email',
        headerName: 'Email Id',
        type: 'string',
        width: 220,
      },
      {
        field: 'gender',
        headerName: 'Gender',
        width: 160,
      },
      {
        field: '',
        headerName: 'Actions',
        width: 200,
        renderCell: (params) => {
          return (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedUser(params.row);
                  console.log('edit clicked', params.row);
                }}
              >
                <Button color='success' variant='outlined'>
                  <EditIcon onClick={editContact} />
                </Button>
                &nbsp;&nbsp;
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteContactClicked(params.row);
                }}
              >
                <Button color='error' variant='outlined'>
                  <DeleteForeverIcon />
                </Button>
              </div>
            </>
          );
        },
      },
    ];
    return columns;
  }
  return (
    <>
      <h1>Contacts </h1>
      <Button variant='outlined' onClick={addNewContact}>
        Add New Contact
      </Button>
      <br />
      <br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={allContacts}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />

        <UpdateContactDetailsModal
          state={{ modalType, open, setOpen, selectedUser, updateContact }}
        />
        <ConfirmationModal
          state={{
            deleteModalOpen,
            setDeleteModalOpen,
            deleteContact,
            selectedUser,
          }}
        />
      </div>
    </>
  );
}

export default Contacts;
