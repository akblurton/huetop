const fetch = async (url, config = {}) => {
  if ("body" in config && config.body instanceof Object) {
    config = Object.assign({}, config, {
      "body": JSON.stringify(config.body)
    });
  }

  let response = await global.fetch(url, config);
  // Fail on non-2xx statuses
  if (!response.ok) {
    let error = new Error(response.statusText);
    error.response = error;
    throw error;
  }

  let result = await response.json();

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
};

export default fetch;
