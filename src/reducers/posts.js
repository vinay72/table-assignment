import { handleActions } from 'redux-actions';
import moment from 'moment';
import * as constants from '../constants/actionConstants';
import { getSortableModel } from '../utils/sorting';


const initialState = {
  itemsPerPage: 5,
  data: [],
};

const handleLoginSuccess = (state, { payload }) => ({
  ...state,
  ...{ data: payload.posts },
});

const processLogout = state => ({
  ...state,
  ...{ itemsPerPage: 5 },
});

const changePostsPerPage = (state, { payload }) => ({
  ...state,
  ...{ itemsPerPage: payload },
});

const createNewPost = (state, { payload }) => ({
  ...state,
  ...{ data: [ payload, ...state.data ]},
});

export default handleActions({
  [constants.LOGIN_SUCCESS]: handleLoginSuccess,
  [constants.PROCESS_LOGOUT]: processLogout,
  [constants.CHANGE_POSTS_PER_PAGE]: changePostsPerPage,
  [constants.CREATE_NEW_POST]: createNewPost,
}, initialState);


export const currentPageSelector = (state, start) => (Number(start) / state.itemsPerPage) + 1;


export const postsSelector = (state, start, q, sort) => {
  const sortableModel = getSortableModel();
  let result = state.data
    .map(post => ({...post, ...{ createdAt: moment(post.createdAt).format('YYYY-MM-DD')}})) // formatting dates
    .filter(post => post.username.indexOf(q) > -1); // filtering by username
  if (sort.by) {
    result = result.sort(sortableModel[sort.by](sort.by));
  }
  if (sort.order === 'desc') {
    result = result.reverse();
  }
  result = result.slice(start, state.itemsPerPage * currentPageSelector(state, start)); // pagination
  return result;
};


export const pagesArraySelector = (state, q) => {
  const filteredData = state.data.filter(post => post.username.indexOf(q) > -1);
  let numberOfPages = Math.floor(filteredData.length / state.itemsPerPage);
  if (filteredData.length % state.itemsPerPage !== 0) {
    numberOfPages += 1;
  }
  
  return [...Array(numberOfPages + 1).keys()].slice(1);
};
