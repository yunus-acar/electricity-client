const errorFormatter = (error: any) => {
  if (error.response) {
    return error.response.data;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};

export default errorFormatter;
