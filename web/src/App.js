import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import SplashPage from './pages/SplashPage';
import HomePage from './pages/Home';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact>
                <SplashPage />
            </Route>
            <Route path="/Home">
                <HomePage />
            </Route>
            <Redirect to="/" />
        </Switch>  
    </Router>
  );
}

export default App;
