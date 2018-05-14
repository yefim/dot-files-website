import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const Post = (props) => {
  const {
    id,
    username,
    repo,
    stars,
    tags,
    score,
    upvoted,
    upvote
  } = props;

  return (
    <li className="post">
      <div className="vote">
        <button disabled={!!upvoted} type="button" onClick={upvote.bind(this, id)}>^</button>
        <p>{score || 0}</p>
      </div>
      <Link className="link" to={`/::/${username}/${repo}`}>
        <p className="name">{username}&apos;s dotfiles</p>
        <div className="tags">
        </div>
      </Link>
      <div className="github">
        <p>{stars} stars</p>
        <a href={`https://github.com/${username}/${repo}`}>view on GitHub</a>
      </div>
    </li>
  );
};

export default Post;
