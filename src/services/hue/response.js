let useJson = false;

export default value => {
  if (value !== void 0) {
    useJson = !!value;
  }
  return useJson;
};
