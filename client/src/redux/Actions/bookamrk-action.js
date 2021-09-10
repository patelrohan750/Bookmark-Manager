import axios from "../../http/index";

export const setCategoriesRedux = () => async (dispatch) => {
  const result = await axios.get('/api/categories')
  dispatch({
    type: "SET_CATEGORIES",
    payload: result.data.categories,
  });

};
export const selectdCategory = (id) => async (dispatch) => {

  try {
    let category='';
    
    if (id) {
      const result=await axios.get(`/api/category/${id}`)
      category=result.data.category.category
    } 
    else {
      category='All Bookmarks'
    }

    dispatch({
      type: "SELECTED_CATEGORY",
      payload: category,
    });
  } catch (e) {
    console.log("ERROR: selectdCategory");
    console.log(e);
  }

};

export const getAllBookmarks = () => async (dispatch) => {
  try {
    const result = await axios.get("/api/bookmarks");

    dispatch({
      type: "ALL_BOOKMARKES",
      payload: result.data.bookmarks,
    });
  } catch (e) {
    console.log("ERROR: getAllBookmarks");
    console.log(e);
  }
};
export const getAllBookmarksCount = () => async (dispatch) => {
  try {
    const result = await axios.get("/api/bookmarks");

    dispatch({
      type: "ALL_BOOKMARKES_COUNT",
      payload: result.data.bookmarks,
    });
  } catch (e) {
    console.log("ERROR: getAllBookmarksCount");
    console.log(e);
  }
};

export const getBookmarkByCategory = (id) => async (dispatch) => {
  try {
    const result = await axios.get(`/api/bookmarks/category/${id}`);

    dispatch({
      type: "GET_BOOKMARKES_BY_CATEGORY",
      payload: result.data.bookmarks,
    });
  } catch (e) {
    console.log("ERROR: getBookmarkByCategory");
    console.log(e);
  }
};

export const searchBookmarksByCategory = (data) => async (dispatch) => {
  try {

    const result = await axios.post("/api/search", data);

    console.log("search result", result);
    dispatch({
      type: "SEARCH_BOOKMARKES",
      payload: result.data.serchResult,
    });
  } catch (e) {
    console.log("ERROR: searchBookmarksByCategory");
    console.log(e);
  }
};
