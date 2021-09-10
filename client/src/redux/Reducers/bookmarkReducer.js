const initialState = {
  allBookmarks: [],
  selectedBookmarks: [],
  categories: [],
  categorySelect:''
};

export const BookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_BOOKMARKES":
      return {
        ...state,
        allBookmarks: action.payload,
        selectedBookmarks: action.payload,
      };
    case "ALL_BOOKMARKES_COUNT":
      return {
        ...state,
        allBookmarks: action.payload
      };
    case "SEARCH_BOOKMARKES":
      return {
        ...state,
        selectedBookmarks: action.payload,
      };
    case "GET_BOOKMARKES_BY_CATEGORY":
      return {
        ...state,
        selectedBookmarks: action.payload,
      };
    case "SET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
      case "SELECTED_CATEGORY":
        return {
          ...state,
          categorySelect: action.payload,
        };
    default:
      return state;
  }
};
