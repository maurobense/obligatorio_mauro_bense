import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

export const LoginView = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.apiKey != null) {
      navigate('/Dashboard');
    }
  }, [navigate])
  return (
    <div className='login-view'>
        <div className='login-view-background'>
        </div>
        <LoginForm/>
    </div>
  );
}