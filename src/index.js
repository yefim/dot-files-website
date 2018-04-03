import './styles.css';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'

const Post = ({username, repo, stars}) => {
  return (
    <li className="post">
      <p>{username}&apos;s dotfiles</p>
      <a href={`https://github.com/${username}/${repo}`}>Star ({stars})</a>
    </li>
  );
};

class HotPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {posts: null};
  }

  // TODO: move to suspense
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        posts: [
          {username: 'mathiasbynens', repo: 'dotfiles', stars: 18734, timestamp: 567},
          {username: 'thoughtbot', repo: 'dotfiles', stars: 4823, timestamp: 123},
          {username: 'yefim', repo: 'dotfiles', stars: 0, timestamp: 234}
        ]
      });
    }, 300);
  }

  render() {
    const {posts} = this.state;

    return (
      <div>
        <h1>All the hot dot-files</h1>
        {
          !!posts
            ? <ul className="posts">{posts.map((post, i) => <Post key={'' + i} {...post} />)}</ul>
            : <p>Loading...</p>
        }
      </div>
    );
  }
}

class NewPage extends React.Component {
  render() {
    return (
      <p>All the newly submitted dot-files</p>
    );
  }
}

class App extends React.Component {
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
        <Route exact path="/" component={HotPage} />
        <Route path="/new" component={NewPage} />
        <Route path="/random" component={NewPage} />
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
