const initialState = {
  blogs: [],
  blog: {},
  isLoading: false,
  error: null,
};

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case "BLOG_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "BLOG_DATA_SUCCESS":
      return {
        ...state,
        blogs: action.payload,
        isLoading: false,
        error: null,
      };
    case "BLOG_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "SINGLE_BLOG_DATA_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "SINGLE_BLOG_DATA_SUCCESS":
      return {
        ...state,
        blog: action.payload,
        isLoading: false,
        error: null,
      };
    case "SINGLE_BLOG_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case "DELETE_BLOG_DATA":
      return {
        ...state,
        blogs: state.blogs?.blogs?.filter((blog) => blog.id !== action.payload),
      };

    case "CREATE_BLOG_DATA":
      return {
        ...state,
        blogs: [...state.blogs, action.payload],
      };
    case "UPDATE_BLOG_DATA":
      return {
        ...state,
        blogs: state.blogs.map((blog) =>
          blog.id === action.payload.id ? action.payload : blog
        ),
      };

    default:
      return state;
  }
};
