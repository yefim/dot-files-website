// styles
import './styles.css';

// libraries
import React from 'react';
import {render} from 'react-dom';
import _ from 'lodash';
import {Route, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {ConnectedRouter, routerReducer, routerMiddleware} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';

// dot-files
import ListPage from './containers/ListPage';
import ItemPage from './ItemPage';
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
  findPost({username, repo}) {
    const {hot, newest, random} = this.state;
    const posts = _.concat(hot || [], newest || [], random || []);
    return _.find(posts, {username, repo});
  }

  render() {
    return [
      <header key="header">
        <nav>
          <p>Dot-files</p>
          <ul>
            <li><Link to="/">Hot</Link></li>
            <li><Link to="/new">New</Link></li>
            <li><Link to="/random">Random</Link></li>
          </ul>
          <a className="new" href="https://google.com/forms" target="_blank" rel="noopener">New dot-files</a>
        </nav>
      </header>,
      <main key="main">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => <ListPage {...props} name="hot" />}
          />
          <Route
            path="/new"
            render={(props) => <ListPage {...props} name="newest" />}
          />
          <Route
            path="/random"
            render={(props) => <ListPage {...props} name="random" />}
          />
          <Route
            path="/::/:username/:repo"
            render={(props) => {
              const post = this.findPost(props.match.params);

              return (<ItemPage {...props} post={post} />
              );
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
