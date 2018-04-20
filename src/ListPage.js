import React from 'react';

import Post from './Post';

export default class ListPage extends React.Component {
  componentDidMount() {
    console.log(`Fetching ${this.props.name} posts...`);
    this.props.fetchPosts(this.props.name);
  }

  render() {
    const {name, posts, loading} = this.props;

    return (
      <div>
        <h1>All the {name} dot-files</h1>
        {
          !!loading
            ? <p>Loading...</p>
            : <ul className="posts">{posts.map((post, i) => <Post key={'' + i} {...post} />)}</ul>
        }
      </div>
    );
  }
}
