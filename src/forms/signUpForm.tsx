import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { SIGN_UP } from './constants';
import { FormFields, IFormInput } from '../interfaces';
import LinkToSwitchForm from './components/linkToSwitchForm';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert } from '@mui/material';
import { signUpUser, validateUserLogin as validateUserExists } from '../axios';
import { Link } from 'react-router-dom';

const schema = Yup.object().shape({
  email: Yup.string()
    .label('User Email')
    .email('Email should be valid')
    .required('Email is required'),
  password: Yup.string()
    .label('User Password')
    .min(8)
    .max(10)
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character'
    )
    .trim('Space is not valid')
    .required('Password is required'),
  first_name: Yup.string().label('First Name').required(),
  last_name: Yup.string().label('Last Name').required(),
});

function checkFormType(control: any, errors: any) {
  const formFields: FormFields[] = [
    { name: 'first_name', label: 'Fist Name', type: '' },
    { name: 'last_name', label: 'Last Name', type: '' },
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

const userExistsTost = (
  <Alert variant='filled' severity='error'>
    User already exits. Click here to <Link to='/login'>LOGIN</Link>
  </Alert>
);
const successTostMsg = (
  <Alert variant='filled' severity='success'>
    Successfully signed up. Click here to <Link to='/login'>LOGIN</Link>
  </Alert>
);

function SignUpForm() {
  const [showSuccessTost, toggleSuccessTost] = useState(false);
  const [showUserExistsTost, toggleUserExistsTost] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    validateUserExists(data)
      .then((response) => {
        console.log(response);
        if (response.data.length === 0) {
          signUpOnSubmit(data);
        } else {
          throw new Error('User Already exists.');
        }
      })
      .catch((error) => {
        toggleUserExistsTost(true);
        // setTimeout(() => toggleUserExistsTost(true), 3000);
        console.log(error);
      });
  };
  const onInvalid = (errors: any) => console.error(errors);
  function signUpOnSubmit(data: IFormInput) {
    signUpUser(data)
      .then((response) => {
        console.log(response);
        toggleSuccessTost(true);
        // setTimeout(() => toggleSuccessTost(true), 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <h1>SIGN UP</h1>
      {showSuccessTost && successTostMsg}
      {showUserExistsTost && userExistsTost}
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        {checkFormType(control, errors)}
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label='Remember Me'
          />
        </FormGroup>
        <Button type='submit' size='large' variant='contained' fullWidth>
          SIGN
        </Button>
      </form>

      <LinkToSwitchForm formType={SIGN_UP} />
    </>
  );
}

export default SignUpForm;
