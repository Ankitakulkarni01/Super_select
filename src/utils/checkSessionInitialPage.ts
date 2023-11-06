export const checkSessionInitialPage = () => {
  return window.history.length === 1 || window.history.length === 2;
};
