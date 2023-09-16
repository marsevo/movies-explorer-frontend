import AuthForm from '../AuthForm/AuthForm.jsx';
import { registerConfig } from '../../utils/const';

function Register() {
  return (
    <section className="register">
      <AuthForm settings={registerConfig} />
    </section>
  )
}

export default Register;