import _ from 'lodash';

import {
  POSTS_FETCH_REQUESTED,
  POSTS_FETCH_SUCCEEDED,
  FILE_FETCH_SUCCEEDED
} from './actions';

const initialState = {
  hot: [],
  new: [],
  random: [],
  posts: {},
  files: {},
  loading: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_REQUESTED:
      return {...state, loading: true};
    case POSTS_FETCH_SUCCEEDED: {
      const {name, posts} = action;
      const postIds = _.map(posts, 'id');
      const normalizedPosts = _.zipObject(postIds, posts);
      return {
        ...state,
        [name]: postIds,
        loading: false,
        posts: {
          ...state.posts,
          ...normalizedPosts
        }
      };
    }
    case FILE_FETCH_SUCCEEDED: {
      return {
        ...state,
        files: {
          ...state.files,
          [action.url]: action.text
        }
      };
    }
    default:
      return state;
  }
};
