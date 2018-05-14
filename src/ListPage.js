import React from 'react';
import _ from 'lodash';

import Post from './containers/Post';

export default class ListPage extends React.Component {
  componentDidMount() {
    if (_.isEmpty(this.props.posts)) {
      this.props.fetchPosts(this.props.name);
    }
  }

  render() {
    const {name, ids} = this.props;

    return (
      <div>
        <h1>All the {name} dot-files</h1>
        {
          _.isEmpty(ids)
            ? <p>Loading...</p>
            : <ul className="posts">{_.map(ids, (id) => <Post key={id} id={id} />)}</ul>
        }
      </div>
    );
  }
}
