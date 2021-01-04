import {GET_USERS,
  CANCEL_LOADING ,
  LOAD_MORE ,
  DELETE_USER ,
  BAN_USER ,
  UNBAN_USER,LOADING_MORE_FAILED,CANCEL_INITLOADING,LOAD_MORE_USERS, ADD_ADMIN, REMOVE_ADMIN} from "../const/admin";

const count = 3;

const initialState = {
  initLoading: true,
  loading: false,
  data: [],
  list: [],
};

export const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        initLoading: false,
        data: action.payload,
        list: action.payload,
      };
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter((user) => user._id !== action.payload),
        list: state.list.filter((user) => user._id !== action.payload),
      };
    case LOAD_MORE:
      return {
        ...state,
        loading: true,
        list: state.data.concat(
          [...new Array(count)].map(() => ({ loading: true }))
        ),
      };
    case LOAD_MORE_USERS:
      return {
        ...state,
        data: state.data.concat(action.payload),
        list: action.payload,
        loading: false,
      };
    case CANCEL_LOADING:
      return {
        ...state,
        loading: false,
      };
    case CANCEL_INITLOADING:
      return {
        ...state,
        initLoading: false,
      };
    case LOADING_MORE_FAILED:
      return {
        ...state,
        list: state.list.filter((user) => !user.loading),
        loading: false,
      };
    case BAN_USER:
      return {
        ...state,
        data: state.data.map((user) =>
          user._id === action.payload ? { ...user, isBan: true } : user
        ),
        list: state.list.map((user) =>
          user._id === action.payload ? { ...user,  isBan: true } : user
        ),
      };
    case UNBAN_USER:
      return {
        ...state,
        data: state.data.map((user) =>
          user._id === action.payload ? { ...user, isBan: false } : user
        ),
        list: state.list.map((user) =>
          user._id === action.payload ? { ...user, isBan: false} : user
        ),
      };

      case ADD_ADMIN:
        return {
          ...state,
          data: state.data.map((user) =>
            user._id === action.payload ? { ...user, isAdmin: true } : user
          ),
          list: state.list.map((user) =>
            user._id === action.payload ? { ...user,  isAdmin: true } : user
          ),
        };
      case REMOVE_ADMIN:
        return {
          ...state,
          data: state.data.map((user) =>
            user._id === action.payload ? { ...user, isAdmin: false } : user
          ),
          list: state.list.map((user) =>
            user._id === action.payload ? { ...user, isAdmin: false} : user
          ),
        };

    default:
      return state;
  }
};


