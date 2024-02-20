import LoginForm from './LoginForm'
import RegistroForm from './RegistroForm'
import { Link } from 'react-router-dom'

export const LoginView = () => {
  return (
    <div className='login-view'>
        <div className='login-view-background'>

        </div>
        <RegistroForm/>
        <LoginForm/>
    </div>
  )
}
