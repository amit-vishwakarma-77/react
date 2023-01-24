import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { IsUserLoggedIn } from '../axios/auth/validateUserSession';

import axios from 'axios';
import * as http from '../axios';
import { Button, Grid } from '@mui/material';
import { Outlet, useOutletContext, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Contacts, Campaigns, Campaign } from '../interfaces';

type ContextType = {
  allContacts: Contacts[];
  updateContact: any;
  deleteContact: any;
  allCampaigns: Campaigns[];
  updateCampaign: any;
};
function Dashboard() {
  const email = IsUserLoggedIn();
  console.log('Dashboard loaded');

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

  return (
    <div>
      <>
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
                <Button size='small'>View</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item md={4}>
                    <h1>5</h1>
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
          }}
        />
      </>
    </div>
  );
}
export default Dashboard;
export function useContacts() {
  return useOutletContext<ContextType>();
}
