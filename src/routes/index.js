
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import ForgotPassword from '../pages/ForgotPassword';
import EmailSent from '../pages/EmailSent';
import NewPassword from '../pages/NewPassword';

export default function Routes(){
  return(
    <Switch>
      <Route exact path="/login" component={SignIn} />
      <Route exact path="/" component={SignUp} />
      <Route exact path="/forgotPassword" component={ForgotPassword} />
      <Route exact path="/emailSent" component={EmailSent} />
      <Route exact path="/newPassword" component={NewPassword} />
      
      {/* Paginas privadas */}
      
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate/>

    </Switch>
  )
}