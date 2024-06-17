import { FC, useState } from "react";


import enGB from "date-fns/locale/en-GB";
import DatePicker from "react-native-date-picker";


type DateInputType = {
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;

  label?: string;
  value: Date;
  onChange?: (
    value: Date,
    context:  any,
  ) => void;

  disablePast?: boolean;
  minDate?: Date;
  maxDate?: Date;
  slotProps?: any,
};

/**
 * DateInput
 *
 * configured with [date-fns](https://date-fns.org/)
 */
const DateInput: FC<DateInputType> = ({
  open,
  onOpen,
  onClose,
  label,
  value,
  onChange,
  disablePast,
  minDate,
  maxDate,
  slotProps,
}) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [date, setDate] = useState(new Date())


  return (
   <>
    <DatePicker
        modal
        open={open}
        date={date}
        // onConfirm={(date) => {
        //   setOpen(false)
        //   setDate(date)
        // }}
        // onCancel={() => {
        //   setOpen(false)
        // }}
      />
   {/* <DatePicker
        modal
        open={open}
        date={value}
        mode="date"
        onConfirm={(date) => {
            setDatePickerOpen(true)
            onChange
        }}
        onCancel={() => {
            setDatePickerOpen(false)
        }}
      /> */}
   </>
  );
};

export default DateInput;
