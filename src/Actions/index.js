export const getList = (comments) => {
  return {
    type: 'GET_COMMENTS',
    payload: comments
  };
};
