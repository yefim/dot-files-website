import _ from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';

export default class ItemPage extends React.Component {
  inflatePost() {
    const {post} = this.props;

    // Check id to see if post has already been fetched
    if (post.id) {
      return Promise.resolve(post);
    }

    return this.props.fetchPost(post);
  }

  inflateFiles(post) {
    const {files, fetchFile} = this.props;
    const filesToFetch = _.filter(post.files, (file) => !files[file.url]);

    _.each(filesToFetch, fetchFile);
  }

  componentDidMount() {
    this.inflatePost().then(this.inflateFiles.bind(this));
  }

  render() {
    const {post, files} = this.props;

    return (
      <div>
        <Link to="/">&lt;- back to list</Link>
        <h1>{post.username}&apos;s dotfiles</h1>
        {
          post.files
            ? _.map(post.files, ({name, url}, i) => {
                const text = files[url];
                return (
                  <div key={'' + i} className="file">
                    <h2>{name}</h2>
                    {text ? <pre>{text}</pre> : <p>Loading...</p>}
                  </div>
                );
              })
            : <p>Loading...</p>
        }
      </div>
    );
  }
}
