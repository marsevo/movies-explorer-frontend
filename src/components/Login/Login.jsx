import AuthForm from '../AuthForm/AuthForm.jsx';
import { loginConfig } from '../../utils/const';

function Login() {
  return (
    <section className="login">
      <AuthForm settings={loginConfig} />
    </section>
  )
}

export default Login;