import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { CampaignForm, Contacts } from '../../../interfaces';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { translateCampaignFormValues } from '../../../helper/campaignFormHelper';

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  subject: yup.string().required('Subject is required.'),
  issuer: yup.string().required('Issuer is required.'),
  courseName: yup.string().required('Course Name is required.'),
  template: yup.string().required('Select at least one Template.'),
  contacts: yup.array().of(yup.number()).min(1, 'Select at least one Contact'),
  hours: yup
    .number()
    .min(1, 'Amount should be less than 1.')
    .required('Amount is required.')
    .positive('Amount should be positive number.')
    .typeError('Amount is required.')
    .integer('Amount should be number.'),
  billAmount: yup
    .number()
    .min(1, 'Amount should be less than 1.')
    .required('Amount is required.')
    .positive('Amount should be positive number.')
    .typeError('Amount is required.')
    .integer('Amount should be number.'),
});
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  width: '50%',
  overflow: 'auto',
};

export default function AddCampaignForm(props: any) {
  const contactsList = props.contacts;
  const handleClose = () => props.state.setOpen(false);
  // const updateCampaign = props.updateCampaign;
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CampaignForm>({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      id: 0,
      billAmount: '',
      hours: 0,
      courseName: '',
      issuer: '',
      name: '',
      status: 'pending',
      subject: '',
      template: '',
      userId: 0,
      contacts: [],
    },
  });
  const onSubmit: SubmitHandler<CampaignForm> = (data) => {
    const campaign = translateCampaignFormValues(data);
    console.log(campaign);
    props.updateCampaign(0, campaign);
  };
  const onInvalid = (errors: any) => console.error(errors);

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
            <Grid container spacing={1}>
              <Grid item md={8} mb={2}>
                <Typography variant='h5' marginBottom={1}>
                  Create Campaign
                </Typography>
              </Grid>
              <Grid item md={4}>
                <CloseIcon style={{ float: 'right' }} onClick={handleClose} />
              </Grid>
            </Grid>
            <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        error={errors.name?.message ? true : false}
                        {...field}
                        label='Campaign Name'
                        fullWidth
                        type='text'
                        size='small'
                        margin='dense'
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    name='subject'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Subject'
                        type='text'
                        size='small'
                        margin='dense'
                        error={errors.subject?.message ? true : false}
                        helperText={errors.subject?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    name='courseName'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        label='Course Name'
                        type='text'
                        size='small'
                        margin='dense'
                        error={errors.courseName?.message ? true : false}
                        helperText={errors.courseName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6}>
                  <Controller
                    name='issuer'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        type='text'
                        size='small'
                        label='Issuer Name'
                        margin='dense'
                        error={errors.issuer?.message ? true : false}
                        helperText={errors.issuer?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} mb={1}>
                  <Controller
                    name='billAmount'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='number'
                        fullWidth
                        size='small'
                        label='Bill Amount'
                        margin='dense'
                        error={errors.billAmount?.message ? true : false}
                        helperText={errors.billAmount?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={6} mb={1}>
                  <Controller
                    name='hours'
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        type='number'
                        fullWidth
                        size='small'
                        label='Hours'
                        margin='dense'
                        error={errors.hours?.message ? true : false}
                        helperText={errors.hours?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item md={12} mb={1}>
                  <Controller
                    name='template'
                    control={control}
                    render={({ field }) => (
                      <FormControl>
                        <FormLabel>
                          <Typography variant='subtitle1' mt={1}>
                            Select Template
                          </Typography>
                        </FormLabel>
                        <RadioGroup {...field} defaultValue='Template1' row>
                          <FormControlLabel
                            value='Template1'
                            control={<Radio size='small' />}
                            label={
                              <Typography variant='body1'>
                                Template 1
                              </Typography>
                            }
                          />
                          <FormControlLabel
                            value='Template2'
                            control={<Radio size='small' />}
                            label='Template 1'
                          />
                          <FormControlLabel
                            value='Template3'
                            control={<Radio size='small' />}
                            label='Template 3'
                          />
                        </RadioGroup>
                        <FormHelperText style={{ color: 'red' }}>
                          {errors.template?.message}
                        </FormHelperText>
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item md={12}>
                  <FormLabel>
                    <Typography variant='subtitle1'>Contacts:</Typography>
                  </FormLabel>
                  <Controller
                    name='contacts'
                    control={control}
                    render={({ field }) => (
                      <>
                        {contactsList.map(
                          (contact: Contacts, index: number) => (
                            <FormControlLabel
                              key={index}
                              control={
                                <Checkbox
                                  {...field}
                                  size='small'
                                  value={contact.userId}
                                  onChange={(event, checked) => {
                                    if (checked) {
                                      field.onChange([
                                        ...field.value,
                                        event.target.value,
                                      ]);
                                    } else {
                                      field.onChange(
                                        field.value.filter(
                                          (value: string) =>
                                            value !== event.target.value
                                        )
                                      );
                                    }
                                  }}
                                />
                              }
                              label={
                                contact.first_name + ' ' + contact.last_name
                              }
                            />
                          )
                        )}
                      </>
                    )}
                  />
                  <FormHelperText style={{ color: 'red' }}>
                    {errors.contacts?.message?.toString()}
                  </FormHelperText>
                </Grid>
                <Grid item md={8}>
                  <Button variant='outlined' type='submit' disabled={!isValid}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
