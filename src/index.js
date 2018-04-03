import './styles.css';

import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter, Route, Link} from 'react-router-dom'

const Post = ({username, repo, stars, tags = []}) => {
  return (
    <li className="post">
      <Link className="link" to={`/::/${username}/${repo}`}>
        <span>{username}&apos;s dotfiles</span>
        {tags.map((tag, i) => <p key={`tag-${i}`} className="tag">{tag}</p>)}
      </Link>
      <a className="github-star" href={`https://github.com/${username}/${repo}`}>Star ({stars})</a>
    </li>
  );
};

class Page extends React.Component {
  // TODO: move to suspense
  componentDidMount() {
    this.props.loadPosts(this.props.name);
  }

  render() {
    const {name, posts} = this.props;

    return (
      <div>
        <h1>All the {name} dot-files</h1>
        {
          !!posts
            ? <ul className="posts">{posts.map((post, i) => <Post key={'' + i} {...post} />)}</ul>
            : <p>Loading...</p>
        }
      </div>
    );
  }
}

const PostPage = ({match}) => {
  const {username, repo} = match.params;

  return (
    <div>
      <h1>{username}&apos;s dotfiles</h1>
      <div>
        <h2><a href="#link-to-vimrc">.vimrc</a></h2>
        <pre>
{`set shell=/bin/bash

set hlsearch
set incsearch
set showmatch
set smartcase
set ignorecase

set tabstop=2
set shiftwidth=2
set softtabstop=2
set autoindent
set smarttab
set expandtab`}
        </pre>
      </div>
    </div>
  );
}

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
          {username: 'mathiasbynens', repo: 'dotfiles', stars: 18734, timestamp: 567},
          {username: 'thoughtbot', repo: 'dotfiles', stars: 4823, timestamp: 123, tags: ['zshrc', 'vimrc']},
          {username: 'yefim', repo: 'dotfiles', stars: 0, timestamp: 234, tags: ['vimrc']}
        ]
      });
    }, 300);
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
        <Route exact path="/" render={props => <Page {...props} name="hot" loadPosts={this.loadPosts.bind(this)} posts={this.state.hot} />} />
        <Route path="/new" render={props => <Page {...props} name="newest" loadPosts={this.loadPosts.bind(this)} posts={this.state.newest} />} />
        <Route path="/random" render={props => <Page {...props} name="random" loadPosts={this.loadPosts.bind(this)} posts={this.state.random} />} />
        <Route path="/::/:username/:repo" component={PostPage} />
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
