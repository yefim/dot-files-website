import React from 'react';
import _ from 'lodash';

import Post from './Post';

export default class ListPage extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.posts)) {
      this.props.fetchPosts(this.props.name);
    }
  }

  render() {
    const {name, posts} = this.props;

    return (
      <div>
        <h1>All the {name} dot-files</h1>
        {
          _.isEmpty(posts)
            ? <p>Loading...</p>
            : <ul className="posts">{posts.map((post, i) => <Post key={'' + i} {...post} />)}</ul>
        }
      </div>
    );
  }
}
