//import constants
import {
GET_USER_CASES,
CASES_ERROR,GET_LAWYER_CASES,DELETE_CASE,ADD_CASE,ACCEPT_CASE
} from '../const/case';


//

const initialState = {
    cases: [],
    loading: true,
    error: {}
  };
  
  export const caseReducer = (state = initialState, { type, payload }) => {
  
    switch (type) {
      case GET_USER_CASES:
        return {
          ...state,
          cases: payload,
          loading: false
        };
       case GET_LAWYER_CASES:
            return {
              ...state,
              cases: payload,
              loading: false
            };
      //Add cases
      case ADD_CASE:
        return {
          ...state,
          cases: [payload, ...state.cases],
          loading: false
        };
      case DELETE_CASE:
        return {
          ...state,
          cases: state.cases.filter(caseD => caseD._id !== payload),
          loading: false
        };
        case ACCEPT_CASE:
          return {
            ...state,
        cases: state.cases.map((caseA) =>
          caseA._id === payload ? { ...caseA, isAccepted: true } : caseA
        )}
      case CASES_ERROR:
        return {
          ...state,
          error: payload,
          loading: false
        };
      /*case UPDATE_LIKES:
        return {
          ...state,
          posts: state.posts.map(post =>
            post._id === payload.id ? { ...post, likes: payload.likes } : post
          ),
          loading: false
        };
      case ADD_COMMENT:
        return {
          ...state,
          post: { ...state.post, comments: payload },
          loading: false
        };
      case REMOVE_COMMENT:
        return {
          ...state,
          post: {
            ...state.post,
            comments: state.post.comments.filter(
              comment => comment._id !== payload
            )
          },
          loading: false
        };*/
      default:
        return state;
    }
  }