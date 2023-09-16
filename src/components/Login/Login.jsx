import AuthForm from '../AuthForm/AuthForm.jsx';
import { loginConfig } from '../../utils/const';

function Login() {
  return (
    <main className="login">
      <AuthForm settings={loginConfig} />
    </main>
  )
}

export default Login;