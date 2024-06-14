// userReducer.js

const initialState = {
  userInfo: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        userInfo: {
          number: action.payload.number,
          id: action.payload.id
        }
      };
    case 'CLEAR_USER_INFO':
      return {
        ...state,
        userInfo: null
      };
    default:
      return state;
  }
};

export default userReducer;
