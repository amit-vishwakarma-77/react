import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { LOGIN } from './constants';
import { FormFields, IFormInput } from '../interfaces';
import LinkToSwitchForm from './components/linkToSwitchForm';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { validateUserLogin } from '../axios';

import { useNavigate } from 'react-router-dom';
import { Alert } from '@mui/material';

const schema = Yup.object().shape({
  email: Yup.string()
    .label('User Email')
    .email('Email should be valid')
    .required('Email is required'),
  password: Yup.string()
    .label('User Password')
    .required('Password is required'),
});

function getFormFields(control: any, errors: any) {
  const formFields: FormFields[] = [
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
  ];
  const inputs = formFields.map((formField: FormFields) => {
    return (
      <div key={formField.name}>
        <Controller
          name={formField.name}
          control={control}
          render={({ field }) => (
            <TextField
              label={formField.label}
              variant='outlined'
              margin='normal'
              type={formField.type}
              fullWidth
              {...field}
            />
          )}
        />
        {errors[formField.name] && <p>{errors[formField.name].message}</p>}
      </div>
    );
  });
  return <>{inputs}</>;
}
const userNotFoundElement = (
  <Alert severity='error'>Please enter correct Email and Password</Alert>
);
function LoginForm() {
  let [userNotFoundMsg, toggleUserNotFound] = useState(false);
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    validateUserLogin(data)
      .then(function (response) {
        console.log(response);
        if (response.data.length >= 1) {
          console.log(response);
          localStorage.setItem('userLoggedIn', response.data[0].first_name);
          navigate(`/dashboard`);
        } else {
          throw new Error('Not able to verify user');
        }
      })
      .catch(function (error) {
        console.log('error', error);
        toggleUserNotFound(true);
        console.log('userNotFoundMsg', userNotFoundMsg);
      });
  };
  const onInvalid = (errors: any) => {
    console.error(errors);
    return true;
  };
  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        {getFormFields(control, errors)}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Remember Me'
          />
        </FormGroup>
        {userNotFoundMsg && userNotFoundElement}
        <br />
        <Button type='submit' size='large' variant='contained' fullWidth>
          LOGIN
        </Button>
      </form>
      <LinkToSwitchForm formType={LOGIN} />
    </>
  );
}

export default LoginForm;
