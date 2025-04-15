import useStore from "../store";

export const setFilter = filter => {
  useStore.setState({ curFilter: filter });
};