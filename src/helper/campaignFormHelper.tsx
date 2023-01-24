import { Campaign, CampaignForm } from '../interfaces';

export function translateCampaignFormValues(
  formValues: CampaignForm
): Campaign {
  const newCampaign: Campaign = {
    id: formValues.id,
    name: formValues.name,
    subject: formValues.subject,
    contacts: formValues.contacts,
    status: formValues.status,
    userId: formValues.userId,
    template: { name: formValues.template },
    template_vars: {
      hours: formValues.hours,
      issuer: formValues.issuer,
      course_name: formValues.courseName,
    },
  };
  return newCampaign;
}
