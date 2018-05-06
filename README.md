Dot-files
===========

## State Tree

``` js
{
  hot: ['id1', 'id2'],
  new: ['id3', 'id4'],
  random: ['id5', 'id6'],
  posts: {
    id1: {
      id: 'id1',
      username: 'yefim',
      repo: 'dotfiles',
      stars: 2,
      timestamp: 123,
      files: [
        {
          name: '.vimrc',
          url: 'https://rawgit.com/yefim/dotfiles/master/.vimrc'
        }
      ]
    }
  },
  files: {
    'https://rawgit.com/yefim/dotfiles/master/.vimrc': '...contents...'
  }
}
```
