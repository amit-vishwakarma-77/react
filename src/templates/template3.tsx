import './template3.css';
import { Typography } from '@mui/material';

function Template3(props: any) {
  return (
    <>
      <div className='description3'>
        <Typography variant='h5'>Musical</Typography>
        <Typography variant='h5'>Night</Typography>
        <Typography variant='h4'>New Year Night Party Invitation</Typography>
        <br />
        <Typography variant='h6'>
          {props.name.toUpperCase()} {props.lastName.toUpperCase()}
        </Typography>
      </div>
    </>
  );
}
export default Template3;
