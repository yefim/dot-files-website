import React from 'react';

import Post from './Post';

export default class ListPage extends React.Component {
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
