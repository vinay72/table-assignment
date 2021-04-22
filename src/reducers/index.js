import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import posts, * as fromPosts from './posts';
import user from './user';

export default combineReducers({
  posts,
  user,
  form: formReducer,
});



export const currentPageSelector = (state, start) => 
  fromPosts.currentPageSelector(state.posts, start);

export const postsSelector = (state, start, q, sort) =>
  fromPosts.postsSelector(state.posts, start, q, sort);

export const pagesArraySelector = (state, q) =>
  fromPosts.pagesArraySelector(state.posts, q);


export const sortInfoSelector = (sortQuery) => {
  const info = sortQuery.split(' ');
  return {
    by: info[0],
    order: info[1] || '',
  };
};
