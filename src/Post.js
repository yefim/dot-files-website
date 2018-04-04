import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom'

export default class Post extends React.Component {
  render() {
    const {
      username,
      repo,
      stars,
      tags
    } = this.props;

    return (
      <li className="post">
        <Link className="link" to={`/::/${username}/${repo}`}>
          <span>{username}&apos;s dotfiles</span>
          {_.map(tags, (tag, i) => <p key={`tag-${i}`} className="tag">{tag}</p>)}
        </Link>
        <a className="github-star" href={`https://github.com/${username}/${repo}`}>Star ({stars})</a>
      </li>
    );
  }
}

