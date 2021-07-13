
import Launches from './components/Launches'
import logo from './spacexlogo.png'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Launch from './components/Launch'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache
} from "@apollo/client";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client} >
      <Router>
        <div className="container">
          <img src={logo} alt="SpaceX" style={{ width: 400, display: 'block', margin: 'auto' }} />
          <Route exact path="/" component={Launches} />
          <Route exact path="/launch/:flight_number" component={Launch} />
        </div>
      </Router>

    </ApolloProvider>
      );
}

      export default App;
