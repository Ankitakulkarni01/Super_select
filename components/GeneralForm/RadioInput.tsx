import { FC } from "react";


//

type RadioInputChangeEvent = (data: {
  target: { name: string; value: unknown };
}) => void;

//

const RadioInput: FC<{
  id: string;
  name: string;
  label: string;
  required?: boolean;
  size?: "small" | "medium";
  direction?: "row" | "column";
  error: boolean;
  helperText?: string;
  value: unknown;
  onChange: RadioInputChangeEvent;
  options?: Array<{
    value: string;
    text?: string;
  }>;
}> = ({
  id,
  name,
  label,
  required,
  size = "medium",
  direction,
  error,
  helperText,
  value,
  onChange,
  options,
}) => {
  return (
    <></>
  );
};

export default RadioInput;
