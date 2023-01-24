// USERS
export interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  password: string
}
//contacts
export interface Contacts {
  id: number
  userId: number
  first_name: string
  last_name: string
  gender: string
  email: string
  address: string
  phone: string
  city: string
}

export interface Campaigns {
  id: number
  name: string
  subject: string
  status: string
  template: Template
  template_vars: TemplateVars
  contacts: number[]
  userId: number
}

export interface Template {
  name: string
}

// export interface TemplateVars {
//   corporation_name: string
//   month: string
//   Year: string
//   bill_amount: string
// }
///////////////IFormInput
export interface IFormInput {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
}

/////////// FORM fields
export interface FormFields{
  name:string;
  label:string;
  type?:string
}

export interface UserLoginDetails{
  email:string;
  password:string;
}
export interface UserSignUpDetails{
  email:string;
  password:string;
  first_name: string;
  last_name: string;
}
export enum contactsModalType{
  update='update',
  add = 'add'
}

///////////////////CAMPAIGNS/////////////////

export interface CampaignForm{
  id:number;
  name: string;
  subject: string;
  status: string;
  hours: number;
  issuer: string;
  course_name: string;
  template: string;
  contact?: Contacts;
  userId: number;
  billAmount:number | string;
  contacts:any;
  courseName:string;
}
export interface Campaign {
  id: number
  name: string
  subject: string
  status: string
  template_vars: TemplateVars
  template: Template
  contacts: number[]
  userId: number
}

export interface TemplateVars {
  hours: number
  issuer: string
  course_name: string
}

export interface Template {
  name: string
}
