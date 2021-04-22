import { createAction } from 'redux-actions';
import * as constants from '../constants/actionConstants';
import { browserHistory } from 'react-router';
import mockParsedResponse from '../mocks/posts';


export const loginRequest = createAction(constants.LOGIN_REQUEST);
export const loginSuccess = createAction(constants.LOGIN_SUCCESS);
export const processLogout = createAction(constants.PROCESS_LOGOUT);
export const changePostsPerPage = createAction(constants.CHANGE_POSTS_PER_PAGE);
export const createNewPost = createAction(constants.CREATE_NEW_POST);


export function handleLogin(username) {
  return function (dispatch) {
    
    dispatch(loginRequest({
      username,
    }));
    
    setTimeout(() => {
      let preloadedPosts;
      const persistedPosts = localStorage['ReactTabularApp:posts'];
      if (typeof persistedPosts !== 'undefined' && JSON.parse(persistedPosts).data.length > 0) {
        preloadedPosts = JSON.parse(persistedPosts).data;
      } else { 
        preloadedPosts = mockParsedResponse.data.posts;
      }
      dispatch(loginSuccess({
        posts: preloadedPosts,
      }));
      
      browserHistory.push('/posts');
    }, 1000);

  }
}

export function handleLogout() {
  return function (dispatch) {
    // Cleaning up
    dispatch(processLogout());
    browserHistory.push('/login');
  }
}
