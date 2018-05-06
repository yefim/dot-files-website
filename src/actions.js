// ListPage
export const POSTS_FETCH_SUCCEEDED = 'DOT_FILES/POSTS_FETCH_SUCCEEDED';

// ItemPage
export const POST_FETCH_SUCCEEDED = 'DOT_FILES/POST_FETCH_SUCCEEDED';
export const FILE_FETCH_SUCCEEDED = 'DOT_FILES/FILE_FETCH_SUCCEEDED';

export const fetchFile = ({url}) => {
  console.log(`Fetching file at ${url}...`);
  return (dispatch) => {
    return fetch(url)
      .then(res => res.text())
      .then((text) => {
        dispatch({type: FILE_FETCH_SUCCEEDED, url, text});
      });
  }
};

export const fetchPost = ({username, repo}) => {
  console.log(`Fetching ${username}'s dotfiles...`);
  return (dispatch) => {
    return fetch('https://httpbin.org/get')
      .then(res => res.json())
      .then(() => {
        const post = {
          id: 'ghi789',
          files: [
            {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
          ],
          username,
          repo
        };
        dispatch({type: POST_FETCH_SUCCEEDED, post});
        return post;
      });
  };
};

export const fetchPosts = (name) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: POSTS_FETCH_SUCCEEDED,
        name,
        posts: [
          {
            id: 'abc123',
            username: 'mathiasbynens',
            repo: 'dotfiles',
            stars: 18734,
            timestamp: 567,
            files: [
              {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
            ]
          },
          {
            id: 'def456',
            username: 'thoughtbot',
            repo: 'dotfiles',
            stars: 4823,
            timestamp: 123,
            files: [
            ]
          },
          {
            id: 'ghi789',
            username: 'yefim',
            repo: 'dotfiles',
            stars: 0,
            timestamp: 234,
            files: [
              {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
            ]
          }
        ]
      });
    }, 400);
  };
};
