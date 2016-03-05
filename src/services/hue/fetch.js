const fetch = (url, config = {}) => {
  if ("body" in config && config.body instanceof Object) {
    config = Object.assign({}, config, {
      "body": JSON.stringify(config.body)
    });
  }
  return global.fetch(url, config)
    .then(response => {
      if (!response.ok) {
        let error = new Error(response.statusText);
        error.response = error;
        throw error;
      }
      return response;
    })
    .then(response => response.json())
    .then(result => {
      // Handle Hue errors
      if (result instanceof Array) {
        for (let item of result) {
          if (item.error) {
            let error = new Error();
            Object.assign(error, item.error);
            throw error;
          }
        }
      }
      return result;
    });
};

export default fetch;
