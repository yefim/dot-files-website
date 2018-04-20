export const POSTS_FETCH_REQUESTED = 'DOT_FILES/POSTS_FETCH_REQUESTED';
export const POSTS_FETCH_SUCCEEDED = 'DOT_FILES/POSTS_FETCH_SUCCEEDED';
export const POSTS_FETCH_FAILED = 'DOT_FILES/POSTS_FETCH_FAILED';

export const fetchPosts = (name) => {
  return (dispatch) => {
    dispatch({type: POSTS_FETCH_REQUESTED});

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
              {name: '.vimrc', url: 'https://rawgit.com/yefim/dotfiles/master/.vimrc'},
              {name: '.vimrc', url: 'https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc'}
            ]
          }
        ]
      });
    }, 1000);
  };
};