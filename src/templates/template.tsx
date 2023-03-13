import { Typography } from '@mui/material';
import Template1 from './template1';
import Template2 from './template2';
import Template3 from './template3';

function Templates() {
  return (
    <>
      <br />
      <Typography variant='h4'>Below are the three templates:</Typography>
      <br />
      <Typography variant='h5'>Energy Bill Template</Typography>
      <Template1 {...{ name: 'amit', lastName: 'vish' }} />
      <br />
      <Typography variant='h5'>Certificate Template</Typography>
      <Template2 {...{ name: 'amit', lastName: 'vish' }} />
      <br />
      <Typography variant='h5'>Party Invitation</Typography>
      <Template3 {...{ name: 'amit', lastName: 'vish' }} />
    </>
  );
}
export default Templates;
