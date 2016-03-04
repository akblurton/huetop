const fetch = (...args) => {
  return global.fetch(...args)
    .then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText);
        error.response = error;
        throw error;
      }
      return response;
    })
    .then(response => response.json());
};

export default fetch;
