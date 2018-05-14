import _ from 'lodash';

import {
  POSTS_FETCH_SUCCEEDED,
  POST_FETCH_SUCCEEDED,
  FILE_FETCH_SUCCEEDED,
  UPVOTE_REQUESTED
} from './actions';

const initialState = {
  hot: [],
  new: [],
  random: [],
  posts: {},
  files: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case POSTS_FETCH_SUCCEEDED: {
      const {name, posts} = action;
      const postIds = _.map(posts, 'id');
      const normalizedPosts = _.zipObject(postIds, posts);
      return {
        ...state,
        [name]: postIds,
        posts: {
          ...state.posts,
          ...normalizedPosts
        }
      };
    }
    case POST_FETCH_SUCCEEDED:
      return {
        ...state,
        posts: {
          ...state.posts,
          [action.post.id]: action.post
        }
      }
    case FILE_FETCH_SUCCEEDED:
      return {
        ...state,
        files: {
          ...state.files,
          [action.url]: action.text
        }
      };
    case UPVOTE_REQUESTED: {
      const posts = state.posts;
      const post = posts[action.id];

      return {
        ...state,
        posts: {
          ...posts,
          [action.id]: {
            ...post,
            score: post.score + 1,
            upvoted: true
          }
        }
      }
    }
    default:
      return state;
  }
};
