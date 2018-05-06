import _ from 'lodash';
import React from 'react';

export default class ItemPage extends React.Component {
  inflatePost() {
    const {post} = this.props;

    if (_.size(post.files)) {
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
        <h1>{post.username}&apos;s dotfiles</h1>
        {
          post.files
            ? _.map(post.files, ({url}, i) => {
                const text = files[url];
                return (
                  <div key={'' + i}>
                    <p>{url}</p>
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
