import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/" component={Room} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </Router>
  );
}


export default App;
