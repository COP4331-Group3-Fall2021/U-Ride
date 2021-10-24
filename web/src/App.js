import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

import './App.css';
import SplashPage from './pages/SplashPage';

function App() {
  return (
    <Router>
        <Switch>
            <Route path="/" exact>
                <SplashPage />
            </Route>
            <Redirect to="/" />
        </Switch>  
    </Router>
  );
}

export default App;
