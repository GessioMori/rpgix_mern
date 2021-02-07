export const groupCreatorReducer = (
  state = { groupCreatorData: null },
  action
) => {
  switch (action.type) {
    case "CREATEGROUP":
      return {
        ...state,
        groupCreatorData: action?.payload,
        loading: false,
        errors: null,
      };
    case "NEWGROUP_ERROR":
      return {
        ...state,
        groupCreatorData: action?.payload,
        loading: false,
        errors: true,
      };
    default:
      return state;
  }
};

export const groupEnterReducer = (state = { groupEnterData: null }, action) => {
  switch (action.type) {
    case "ENTER_GROUP":
      return {
        ...state,
        groupEnterData: action?.payload,
        loading: false,
        errors: null,
      };
    case "ENTER_GROUP_ERROR":
      return {
        ...state,
        groupEnterData: action?.payload,
        loading: false,
        errors: true,
      };
    default:
      return state;
  }
};

export const currentGroupReducer = (state = { currentGroup: null }, action) => {
  switch (action.type) {
    case "GET_GROUP":
      return { ...state, currentGroup: action.payload };
    case "GET_GROUP_ERROR":
      return { ...state, currentGroup: action.payload };
    default:
      return { ...state };
  }
};
