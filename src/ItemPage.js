import React from 'react';
import _ from 'lodash';

export default class ItemPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {files: this.props.post ? this.props.post.files : null};
  }

  fetchFiles() {
    _.each(this.props.post.files, (file, i) => {
      fetch(file.url)
        .then(res => res.text())
        .then((text) => {
          const newFile = {
            ...file,
            text
          };

          const newFiles = [...this.state.files];
          newFiles[i] = newFile;

          // TODO: use setState updater function or move to redux
          this.setState({files: newFiles});
        });
    });
  }

  componentDidMount() {
    if (this.props.post) {
      this.fetchFiles();
    } else {
      // load the post from server
    }
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

    const post = this.props.post || {username, repo};
    const files = this.state.files;

    return (
      <div>
        <h1>{post.username}&apos;s dotfiles</h1>
        {
          files
            ? <div>{_.map(files, (file, i) => <pre key={'' + i}>{file.url}{file.text}</pre>)}</div>
            : <p>Loading...</p>
        }
      </div>
    );
  }
}
