// styles
import './styles.scss';

// libraries
import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import {Route, Switch} from 'react-router';
import {Link, NavLink} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

// dot-files
import ListPage from './containers/ListPage';
import ItemPage from './containers/ItemPage';
import reducer from './reducer';

const history = createHistory();
const middleware = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    app: reducer,
    router: routerReducer
  }),
  composeEnhancers(applyMiddleware(middleware, thunk))
);

class App extends React.Component {
  render() {
    return [
      <header key="header">
        <nav>
          <Link className="logo" to="/"><img width="117" height="25" src="" alt="Dot-files logo" /></Link>
          <ul>
            <li><NavLink to="/" exact>hot</NavLink></li>
            <li><NavLink to="/new">new</NavLink></li>
            <li><NavLink to="/random">random</NavLink></li>
          </ul>
          <a className="new" href="https://google.com/forms" target="_blank" rel="noopener">New dot-files</a>
        </nav>
      </header>,
      <main key="main">
        <Switch>
          <Route
            exact
            path="/"
            component={(props) => <ListPage {...props} name="hot" />}
          />
          <Route
            path="/new"
            component={(props) => <ListPage {...props} name="newest" />}
          />
          <Route
            path="/random"
            component={(props) => <ListPage {...props} name="random" />}
          />
          <Route
            path="/::/:username/:repo"
            component={(props) => {
              const {username, repo} = props.match.params;

              return (<ItemPage {...props} username={username} repo={repo} />);
            }}
          />
        </Switch>
      </main>,
      <footer key="footer">
        <p>Made in SF</p>
      </footer>
    ];
  }
}

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
