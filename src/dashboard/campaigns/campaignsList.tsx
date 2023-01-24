import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useState, useEffect } from 'react';
import { useContacts } from '../dashboard';
import { Campaigns } from '../../interfaces';
import { Button } from '@mui/material';
import AddCampaignForm from './modals/addCampaignForm';

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
                // deleteContactClicked(params.row);
              }}
            >
              <Button color='primary' variant='outlined'>
                <DirectionsRunIcon />
              </Button>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                // setSelectedUser(params.row);
                // console.log("edit clicked", params.row);
              }}
            >
              <Button color='success' variant='outlined'>
                {/* onClick={editContact} */}
                <EditIcon />
              </Button>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                // deleteContactClicked(params.row);
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
export default function CampaignsList(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { allCampaigns, allContacts, updateCampaign } = useContacts();
  const columns: GridColDef[] = getColumns();
  const rows = getRows(allCampaigns);

  console.info(allCampaigns);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <h1>Campaigns</h1>
      <Button color='success' variant='outlined' onClick={handleOpen}>
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
      />
    </Box>
  );
}
