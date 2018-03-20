export const withLifecycles = async (asyncAction, cb) => {
  cb({
    loading: true,
    data: null,
    error: {}
  });
  try {
    const data = await asyncAction();
    cb({
      loading: false,
      data,
      error: {}
    });
  } catch (error) {
    cb({
      loading: false,
      data: null,
      error
    });
  }
};

export default withLifecycles;
