import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export function IsUserLoggedIn() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem('userLoggedIn')) {
      location.pathname === '/signup'
        ? navigate('/signup')
        : navigate('/login');
    } else if (
      location.pathname === '/login' ||
      location.pathname === '/signup' ||
      location.pathname === '/'
    ) {
      navigate('/dashboard');
    }
  }, [navigate, location.pathname]);

  return localStorage.getItem('userLoggedIn');
}
