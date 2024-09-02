import React from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

function LoginWrapper() {
  const navigate = useNavigate();
  return <Login navigate={navigate} />;
}

export default LoginWrapper;
