import React from 'react';

export default class ItemPage extends React.Component {
  componentDidMount() {
    fetch('https://rawgit.com/mathiasbynens/dotfiles/master/.vimrc')
      .then(res => res.text())
      .then((text) => {
        console.log(text);
      });
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

    return (
      <div>
        <h1>{username}&apos;s dotfiles</h1>
        <div>
          <h2><a href="#link-to-vimrc">.vimrc</a></h2>
          <pre style={{'max-height': '400px', overflow: 'scroll'}}>
{`" Use the Solarized Dark theme
set background=dark
colorscheme solarized
let g:solarized_termtrans=1

" Make Vim more useful
set nocompatible
" Use the OS clipboard by default
set clipboard=unnamed
" Enhance command-line completion
set wildmenu
" Allow cursor keys in insert mode
set esckeys
" Allow backspace in insert mode
set backspace=indent,eol,start
" Optimize for fast terminal connections
set ttyfast
" Add the g flag to search/replace by default
set gdefault
" Use UTF-8 without BOM
set encoding=utf-8 nobomb
" Change mapleader
let mapleader=","
" Don’t add empty newlines at the end of files
set binary
set noeol
" Centralize backups, swapfiles and undo history
set backupdir=~/.vim/backups`}
          </pre>
        </div>
        <div>
          <h2><a href="#link-to-vimrc">.bashrc</a></h2>
          <pre style={{'max-height': '400px', overflow: 'scroll'}}>
{`" Use the Solarized Dark theme
set background=dark
colorscheme solarized
let g:solarized_termtrans=1

" Make Vim more useful
set nocompatible
" Use the OS clipboard by default
set clipboard=unnamed
" Enhance command-line completion
set wildmenu
" Allow cursor keys in insert mode
set esckeys
" Allow backspace in insert mode
set backspace=indent,eol,start
" Optimize for fast terminal connections
set ttyfast
" Add the g flag to search/replace by default
set gdefault
" Use UTF-8 without BOM
set encoding=utf-8 nobomb
" Change mapleader
let mapleader=","
" Don’t add empty newlines at the end of files
set binary
set noeol
" Centralize backups, swapfiles and undo history
set backupdir=~/.vim/backups`}
          </pre>
        </div>
      </div>
    );
  }
}
