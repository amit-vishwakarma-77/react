import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import LogoutIcon from '@mui/icons-material/Logout';
import { IsUserLoggedIn } from '../axios/auth/validateUserSession';

import axios from 'axios';
import * as http from '../axios';
import { Button, Grid, Typography } from '@mui/material';
import { Outlet, useOutletContext, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Contacts, Campaigns, Campaign } from '../interfaces';

type ContextType = {
  allContacts: Contacts[];
  updateContact: any;
  deleteContact: any;
  allCampaigns: Campaigns[];
  deleteCampaign: any;
  updateCampaign: any;
  startCampaign: any;
};
function Dashboard() {
  const navigate = useNavigate();
  IsUserLoggedIn();
  function logOut() {
    localStorage.removeItem('userLoggedIn');
    navigate('/login');
  }

  const [allContacts, setContacts] = useState<Contacts[]>([]);
  const [allCampaigns, setAllCampaigns] = useState<Campaigns[]>([]);

  useEffect(() => {
    axios
      .all([http.getContacts, http.getCampaigns])
      .then(
        axios.spread((...response) => {
          setContacts(() => response[0].data);
          setAllCampaigns(() => response[1].data);
        })
      )
      .catch((errors) => console.log(errors));
  }, []);

  function updateContact(id: number, data: Contacts) {
    if (id) {
      http
        .updateContact(id, data)
        .then((response) => {
          const newCont = allContacts.map((contact) => {
            if (contact.id === id) {
              return { ...contact, ...response.data };
            }
            return contact;
          });
          setContacts(newCont);
        })
        .catch((err) => console.error(err));
    } else {
      http.getContact(data.email).then((res) => {
        if (res.data.length === 0) {
          http.addNewContact(data).then((response) => {
            setContacts([...allContacts, { ...response.data }]);
          });
        }
      });
    }
  }
  function updateCampaign(id: number, data: Campaign) {
    if (id > 0) {
      http
        .updateCampaign(id, data)
        .then((response) => {
          const newCont = allCampaigns.map((campaign) => {
            if (campaign.id === id) {
              return { ...campaign, ...response.data };
            }
            return campaign;
          });
          setAllCampaigns(newCont);
        })
        .catch((err) => console.error(err));
    } else {
      http.getCampaign(data.id).then((res) => {
        if (res.data.length === 0) {
          http.addNewCampaign(data).then((response) => {
            setAllCampaigns([...allCampaigns, { ...response.data }]);
          });
        }
      });
    }
  }
  function deleteContact(id: number) {
    http
      .deleteContact(id)
      .then((response) => {
        const newCont = allContacts.filter((contact) => contact.id !== id);
        setContacts(newCont);
      })
      .catch((err) => console.error(err));
  }
  function deleteCampaign(id: number) {
    http
      .deleteCampaign(id)
      .then(() => {
        const updatedCampaigns = allCampaigns.filter(
          (campaign) => campaign.id !== id
        );
        setAllCampaigns(updatedCampaigns);
      })
      .catch((err) => console.error(err));
  }
  function startCampaign(id: number, campaign: Campaign) {
    campaign.status = 'running';
    http
      .startCampaign(id, campaign)
      .then((res) => {
        const updatedCampaigns = allCampaigns.map((campaign) => {
          if (campaign.id === id) {
            return res.data;
          }
          return campaign;
        });
        setAllCampaigns(updatedCampaigns);
      })
      .catch((err) => console.error(err));
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant='h4' component='h2'>
          Email Champion
        </Typography>
        <Typography variant='h6'>
          Hello Amit
          <Button onClick={logOut}>
            <LogoutIcon />
          </Button>
        </Typography>
      </div>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <h1>{allContacts.length}</h1>
                </Grid>
                <Grid item md={8}>
                  <h1>Contacts</h1>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Link to='/dashboard/contacts'>
                <Button size='small'>View</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <h1>3</h1>
                </Grid>
                <Grid item md={8}>
                  <h1>Templates</h1>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Link to={'/dashboard/templates'}>
                <Button size='small'>View</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Grid container spacing={1}>
                <Grid item md={4}>
                  <h1>{allCampaigns.length}</h1>
                </Grid>
                <Grid item md={8}>
                  <h1>Campaigns</h1>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Link to='/dashboard/campaigns'>
                <Button size='small'>View</Button>
              </Link>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Outlet
        context={{
          allContacts,
          updateContact,
          deleteContact,
          allCampaigns,
          updateCampaign,
          deleteCampaign,
          startCampaign,
        }}
      />
    </>
  );
}
export default Dashboard;
export function useContacts() {
  return useOutletContext<ContextType>();
}
