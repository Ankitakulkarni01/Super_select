// Number Input OnWheel Prevent Change
export const numberInputOnWheelPreventChange = (e) => {
  e.target.blur();

  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
};
//
