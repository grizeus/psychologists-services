import useStore from "../store";

export const setFilter = filter => {
  useStore.setState({ curFilter: filter });
};

export const setPreloading = () => {
  useStore.setState({ isLoading: true, error: null });
};

export const setPostloading = (e = null) => {
  if (e) {
    useStore.setState({ error: e.message, isLoading: false });
    return;
  }
  useStore.setState({ isLoading: false });
};
