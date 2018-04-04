import React from 'react';

export default class ItemPage extends React.Component {
  componentDidMount() {
    fetch('https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc')
      .then(res => res.text())
      .then((text) => {
        console.log(text);
      });
  }

  render() {
    const {
      match: {
        params: {
          username,
          repo
        }
      }
    } = this.props;

    return (
      <div>
        <h1>{username}&apos;s dotfiles</h1>
        <div>
          <h2><a href="#link-to-vimrc">.vimrc</a></h2>
          <pre>
          </pre>
        </div>
      </div>
    );
  }
}
