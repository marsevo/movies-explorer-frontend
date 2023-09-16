import AuthForm from '../AuthForm/AuthForm.jsx';
import { registerConfig } from '../../utils/const';

function Register() {
  return (
    <main className="register">
      <AuthForm settings={registerConfig} />
    </main>
  )
}

export default Register;