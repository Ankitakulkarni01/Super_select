// Number Input OnWheel Prevent Change
export const numberInputOnWheelPreventChange = (e) => {
  e.target.blur();

  e.stopPropagation();

  setTimeout(() => {
    e.target.focus();
  }, 0);
};
//

// Block And Replace Number Input Beyond Max
export const blockAndReplaceNumberInputBeyondMax = (
  value: number,
  max: number
) => {
  if (value < 0) return 0;
  else if (value > max) return max;
  else return value;
};
//