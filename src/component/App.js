import { Profile } from './users/Profile';
import { Switch, Route }from 'react-router-dom';
import { ErrorPage } from './ErrorPage';
import { Home } from './Home';
import { NavigationBar } from '../component/NavigationBar';
import { RegistrationForm } from './authentication/RegistrationForm';
import { LoginForm } from './authentication/LoginForm';
import { AgreementForm } from './agreements/AgreementForm';
import { AgreementPage } from './agreements/AgreementPage';
import { DocumentationPage } from './DocumentationPage';
import { SourcesPage } from './SourcesPage';

export const App = () => {

  /*
      SearchBar passes the results of the search to Home. Home
      passes data to UserList. UserList renders the results.

      Each User in UserList should be clickable to their profile.

      
  */


  return (
    <div className="wrapper">
        <NavigationBar />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/documentation" component={DocumentationPage} />
            <Route path="/sources" component={SourcesPage} />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegistrationForm} />
            <Route path="/agreement" component={AgreementPage} />
            <Route path="/create-agreement" component={AgreementForm} />
            <Route component={ErrorPage} />   
        </Switch>          
    </div>
  );
};


