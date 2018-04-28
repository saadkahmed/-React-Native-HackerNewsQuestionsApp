const INITIAL_STATE = {
  list: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'GET_COMMENTS':
      console.log(action.payload);
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
