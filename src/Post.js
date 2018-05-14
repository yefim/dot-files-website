import React from 'react';
import _ from 'lodash';
import {Link} from 'react-router-dom';

const Post = (props) => {
  const {
    username,
    repo,
    stars,
    tags,
    votes
  } = props;

  return (
    <li className="post">
      <div className="vote">
        <button type="button" onClick={() => { console.log('up'); }}>^</button>
        <p>{votes || 0}</p>
        <button type="button" onClick={() => { console.log('down'); }}>v</button>
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
