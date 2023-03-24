import { Link } from 'react-router-dom';
import { LOGIN, SIGN_UP } from '../constants';

const toSignUp = (
  <p>
    Need an Account? <Link to={`/${SIGN_UP}`}>SIGN UP</Link>
  </p>
);
const toLogin = (
  <p>
    Already a user? <Link to={`/${LOGIN}`}>LOGIN</Link>
  </p>
);

function LinkToSwitchForm(props: any) {
  console.log(props.formType);
  const formToRender = props.formType === LOGIN ? toSignUp : toLogin;
  return formToRender;
}
export default LinkToSwitchForm;
