import axios from 'axios';
import {
  Campaign,
  Contacts,
  IFormInput,
  UserLoginDetails,
} from '../interfaces';

const baseUrl = 'http://localhost:4200';

///////////USERS//////////////////
export const getUser = (email: any) => {
  return axios.get(`${baseUrl}/users?email=${email}`);
};
export const validateUserLogin = (userLoginDetails: UserLoginDetails) => {
  return axios.get(
    `${baseUrl}/users?email=${userLoginDetails.email}&password=${userLoginDetails.password}`
  );
};
export const signUpUser = (userDetails: IFormInput) => {
  return axios.post(`${baseUrl}/users`, userDetails);
};
///////////CONTACTS//////////////////
export const getContacts = axios.get(`${baseUrl}/contacts`);
export const getContact = (email: any) => {
  return axios.get(`${baseUrl}/contacts?email=${email}`);
};
export const updateContact = (id: number, data: Contacts) => {
  return axios.put(`${baseUrl}/contacts/${id}`, data);
};
export const deleteContact = (id: number) => {
  return axios.delete(`${baseUrl}/contacts/${id}`);
};
export const addNewContact = (data: Contacts) => {
  return axios.post(`${baseUrl}/contacts`, data);
};
///////////CAMPAIGNS//////////////////
export const getCampaigns = axios.get(`${baseUrl}/campaigns`);
export const getCampaign = (id: number) => {
  return axios.get(`${baseUrl}/users?id=${id}`);
};
export const addNewCampaign = (data: Campaign) => {
  return axios.post(`${baseUrl}/campaigns`, data);
};
export const updateCampaign = (id: number, data: Campaign) => {
  return axios.put(`${baseUrl}/campaigns/${id}`, data);
};
