import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState } from 'react';
import { useContacts } from '../dashboard';
import { Campaigns } from '../../interfaces';
import { Button } from '@mui/material';
import AddCampaignForm from './modals/addCampaignForm';
export default function CampaignsList(props: any) {
  const navigate = useNavigate();
  const getColumns = () => {
    return [
      {
        field: 'id',
        headerName: 'Id',
        type: 'number',
        width: 20,
      },
      {
        field: 'campaignName',
        headerName: 'Campaign Name',
        width: 300,
      },
      {
        field: 'subject',
        headerName: 'Subject',
        width: 150,
      },
      {
        field: 'hours',
        headerName: 'Hours',
        type: 'number',
        width: 70,
      },
      {
        field: 'createdBy',
        headerName: 'Created By',
        width: 160,
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 160,
      },
      {
        field: 'template',
        headerName: 'Template',
        width: 160,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 250,
        renderCell: (params: any) => {
          return (
            <>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  startCampaignClicked(params.id);
                }}
              >
                <Button
                  color='primary'
                  variant='outlined'
                  disabled={params.row.status === 'running' ? true : false}
                >
                  <DirectionsRunIcon />
                </Button>
                &nbsp;&nbsp;
              </div>
              <div>
                <Button
                  color='success'
                  variant='outlined'
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCampaign(params.id);
                    setOpen(true);
                  }}
                >
                  <EditIcon />
                </Button>
                &nbsp;&nbsp;
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  deleteCampaign(params.id);
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
  };
  const getRows = (campaigns: Campaigns[]) => {
    return campaigns.map((campaign) => {
      return {
        id: campaign.id,
        campaignName: campaign.name,
        subject: campaign.subject,
        hours: campaign.template_vars.hours,
        createdBy: campaign.template_vars.issuer,
        status: campaign.status,
        template: campaign.template.name,
      };
    });
  };

  const [open, setOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(0);
  const handleOpen = () => setOpen(true);
  const addCampaignClicked = () => {
    handleOpen();
  };
  const {
    allCampaigns,
    allContacts,
    updateCampaign,
    deleteCampaign,
    startCampaign,
  } = useContacts();
  const columns: GridColDef[] = getColumns();
  const rows = getRows(allCampaigns);

  function startCampaignClicked(id: number) {
    const selectedCampaign = allCampaigns.filter(
      (campaign) => campaign.id === id
    );
    const selectedContactsForMail = allContacts.filter((contacts: any) =>
      selectedCampaign[0].contacts.includes(contacts.id)
    );
    console.log(selectedContactsForMail);
    navigate('/dashboard/send-email', {
      state: {
        contacts: selectedContactsForMail,
        template: selectedCampaign[0].template.name,
      },
    });
    startCampaign(id, selectedCampaign[0]);
  }
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1>Campaigns</h1>
      <Button color='success' variant='outlined' onClick={addCampaignClicked}>
        Add New Campaign
      </Button>
      <br />
      <br />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
      />
      <AddCampaignForm
        state={{ setOpen, open }}
        contacts={allContacts}
        updateCampaign={updateCampaign}
        selectedCampaign={selectedCampaign}
        allCampaigns={allCampaigns}
      />
    </Box>
  );
}
