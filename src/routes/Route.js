import { useContext } from 'react';
import { Routes, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}){
  const { signed, loading } = useContext(AuthContext);

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed && isPrivate){
    return <Navigate to="/" />
  }

  if(signed && !isPrivate){
    return <Navigate to="/dashboard" />
  }

  return(
    <Routes
      {...rest}
      render={ props => (
        <Component {...props} />
      )}
    />
  )
}