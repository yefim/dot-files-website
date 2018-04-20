import './styles.css';

import React from 'react';
import _ from 'lodash';
import {render} from 'react-dom';
import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'

import ListPage from './ListPage';
import ItemPage from './ItemPage';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hot: null,
      newest: null,
      random: null
    };
  }

  loadPosts(name) {
    if (this.state[name]) {
      return;
    }

    setTimeout(() => {
      this.setState({
        [name]: [
          {
            username: 'mathiasbynens',
            repo: 'dotfiles',
            stars: 18734,
            timestamp: 567,
            files: [
              {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
            ]
          },
          {
            username: 'thoughtbot',
            repo: 'dotfiles',
            stars: 4823,
            timestamp: 123,
            files: [
            ]
          },
          {
            username: 'yefim',
            repo: 'dotfiles',
            stars: 0,
            timestamp: 234,
            files: [
              {name: '.vimrc', url: 'https://rawgit.com/yefim/dotfiles/master/.vimrc'},
              {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
            ]
          }
        ]
      });
    }, 300);
  }

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
            render={(props) => {
              return (<ListPage {...props} name="hot" loadPosts={this.loadPosts.bind(this)} posts={this.state.hot} />);
            }}
          />
          <Route
            path="/new"
            render={(props) => {
              return (<ListPage {...props} name="newest" loadPosts={this.loadPosts.bind(this)} posts={this.state.newest} />);
            }}
          />
          <Route
            path="/random"
            render={(props) => {
              return (<ListPage {...props} name="random" loadPosts={this.loadPosts.bind(this)} posts={this.state.random} />);
            }}
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
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
);
