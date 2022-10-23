const aiportDataReducer = (state, action) => {
  const { type, payload } = action;
  const newState = { ...state };
  newState.compTodos = [...state.compTodos];

  const listType = payload.listType;

  return newState;
};

export default aiportDataReducer;
