import _ from 'lodash';

import {POSTS_FETCH_REQUESTED, POSTS_FETCH_SUCCEEDED} from './actions';

const initialState = {
  hot: [],
  new: [],
  random: [],
  posts: {},
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
        [name]: postIds,
        loading: false,
        posts: {
          ...state.posts,
          ...normalizedPosts
        }
      };
    }
    default:
      return state;
  }
};
