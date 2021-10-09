import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import Room from './pages/room';
import { Provider } from './context/index';

function App() {
  return (
    <Provider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/room/" component={Room} />
          <Route exact path="/room/:id" component={Room} />
        </Switch>
      </Router>
    </Provider>
  );
}


export default App;
