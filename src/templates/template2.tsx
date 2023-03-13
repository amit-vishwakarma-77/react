import './template2.css';
import { Typography } from '@mui/material';

function Template2(props: any) {
  return (
    <>
      <div className='description2'>
        <Typography variant='h5'>Issuer</Typography>
        <Typography variant='h4'>Certificate of Completion</Typography>
        <br />
        <Typography variant='body1'>This is to clarify that</Typography>
        <Typography variant='h6'>
          {props.name.toUpperCase()} {props.lastName.toUpperCase()}
        </Typography>
        <Typography variant='body1'>
          has successfully completed the /hours/ certification course in
          /courseName/
        </Typography>
      </div>
    </>
  );
}
export default Template2;
