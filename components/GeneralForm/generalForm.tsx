import React, { FC, useMemo, useState, useCallback } from 'react';
import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { object, ObjectShape, string, number, mixed } from "yup";
import DatePicker from 'react-native-date-picker'
import moment from 'moment';


import { Colors } from '../../src/utils/color';
import { isPhoneNumber } from '../../src/utils/regex';
import { ApiResponseType } from '../../src/utils/fetchExtended';
import { Formik } from 'formik';
import { imageArray } from './customScheme';
import { TextInput } from '@react-native-material/core';
import MenuItem from 'react-native-paper/lib/typescript/components/Menu/MenuItem';
import { RadioButton } from 'react-native-paper';
import DateInput from './DateInput';
import { addDaysToDate, formatDate, parseDate } from '../../src/utils/date-time';
import ActionButton from '../../src/components/actionButton';
import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';

export type FileInputType = "image"; // | "video"

interface File extends Blob {
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/lastModified) */
  readonly lastModified: number;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/name) */
  readonly name: string;
  /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/File/webkitRelativePath) */
  readonly webkitRelativePath: string;
}

type FormValueType = {
  [key: string]: string | number | Array<File> | Array<string>;
};

interface GeneralFormType {
  formName: string;
  inputs: Array<{
    name: string;
    type: "text" | "number" | "email" | "tel" | "select" | "date" | "radio";
    required?: boolean;
    placeholder?: string;
    defaultValue?: string | number;
    isTextField?: boolean;
    selectOptions?: Array<{
      value: string;
      text?: string;
    }>;
    radioGroupDirection?: "row" | "column";
    flex?: 1 | 2;
    prefix?: string;
    suffix?: string;
    isCurrency?: boolean;
  }>;

  fileInputs?: Array<{
    name: string;
    type: FileInputType;
    count: number;
    required?: boolean;
    placeholder?: string;
    defaultValue?: Array<File>;
  }>;

  hideErrorText?: boolean;
  submitButtonText?: string;
  filesAreUploading?: boolean;
  withAcknowledgment?: boolean;
  acknowledgmentTitle?: string;
  onSubmit: (values: FormValueType) => Promise<void | ApiResponseType>;
}



const GeneralForm: FC<GeneralFormType> = ({
  formName,
  inputs,
  fileInputs = [],
  hideErrorText,
  submitButtonText = "Submit Request",
  filesAreUploading,
  withAcknowledgment,
  acknowledgmentTitle = "Request Submitted",
  onSubmit,
}) => {
  const [filePath, setFilePath] = useState({});
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  // Initial Values
  const initialValues = useMemo(() => {
    const values: FormValueType = {};

    for (let i = 0; i < inputs.length; i++) {
      const ele = inputs[i];
      values[ele.name] = ele?.defaultValue ? ele.defaultValue : "";
    }
    console.log("values", values)
    for (let i = 0; i < fileInputs.length; i++) {
      const ele = fileInputs[i];
      values[ele.name] = [];
    }

    return values;
  }, [inputs, fileInputs]);
  //
  const showDatePicker = () => {
    console.log("open",open)
    setOpen(true);
  };

  const hideDatePicker = () => {
    setOpen(false);
  };

  const handleConfirm = date => {
    setDate(date);
    hideDatePicker();
  };

  // Form Schema
  const formSchema = useMemo(() => {
    const values: ObjectShape = {};

    for (let i = 0; i < inputs.length; i++) {
      const ele = inputs[i];

      switch (ele.type) {
        case "text":
          values[ele.name] = string()
            .when("_", (_, schema) => {
              return ele.name === "name"
                ? schema.min(2, "Too short!").max(20, "Too long!")
                : schema
                  .min(5, "Too short!")
                  .max(ele?.isTextField ? 500 : 100, "Too long!");
            })
            .when("_", (_, schema) => {
              return ele.required
                ? schema.required("Required")
                : schema.notRequired();
            });
          break;

        case "email":
          values[ele.name] = string()
            .email("Invalid email!")
            .when("_", (_, schema) => {
              return ele.required
                ? schema.required("Required")
                : schema.notRequired();
            });
          break;

        case "number":
          values[ele.name] = number()
            .positive()
            .min(100000, "Too small!")
            .max(100000000, "Too large!")
            .when("_", (_, schema) => {
              return ele.required
                ? schema.required("Required")
                : schema.notRequired();
            });
          break;

        case "tel":
          values[ele.name] = string()
            .matches(isPhoneNumber, "Invalid phone!")
            .when("_", (_, schema) => {
              return ele.required
                ? schema.required("Required")
                : schema.notRequired();
            });
          break;

        case "select":
        case "radio":
          values[ele.name] = string().when("_", (_, schema) => {
            return ele.required
              ? schema.required("Required")
              : schema.notRequired();
          });
          break;

        case "date":
          values[ele.name] = string()
            .min(10, "Invalid date!")
            .max(10, "Invalid date!")
            .when("_", (_, schema) => {
              return ele.required
                ? schema.required("Required")
                : schema.notRequired();
            });
          break;

        default:
          values[ele.name] = string();
          break;
      }
    }

    for (let i = 0; i < fileInputs.length; i++) {
      const ele = fileInputs[i];

      switch (ele.type) {
        case "image":
          values[ele.name] = imageArray(ele.count, ele?.required);
          break;

        default:
          values[ele.name] = mixed();
          break;
      }
    }

    return object().shape(values);
  }, [inputs, fileInputs]);
  //

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }
      console.log(response.assets)
      setFilePath(response);
    });
  };
  //

  const [globalError, setGlobalError] = useState("");
  const [showSubmittedAcknowledgment, setShowSubmittedAcknowledgment] =
    useState(false);

  // On Submit Extra
  const onSubmitExtra = useCallback(
    async (values: FormValueType, options: { resetForm: () => void }) => {
      setGlobalError("");
      console.log("Value", values)
      // const response = await onSubmit(values);

      // if (response) {
      //   const { success, message, data } = response;

      //   if (success) {
      //     options?.resetForm();

      //     if (withAcknowledgment) setShowSubmittedAcknowledgment(true);
      //   } else setGlobalError(message);
      // }
    },
    [
      onSubmit,
      setGlobalError,
      withAcknowledgment,
      setShowSubmittedAcknowledgment,
    ]
  );
  //

  //
  //

  //
  //




  return (
    <Formik
      validationSchema={formSchema}
      initialValues={initialValues}
      onSubmit={onSubmitExtra}
      enableReinitialize
    >
      {({
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        errors,
        touched,
        isSubmitting,
      }) => (
        <View style={{ backgroundColor: Colors.PURE_WHITE, padding: 10 }}>
          <>
            {inputs.map((d, i) => {
              const hasError =
                errors[d.name] && touched[d.name] ? true : false;

              //

              return (
                <>
                  {(() => {
                    switch (d.type) {
                      case "date": {
                        return (

                          <TouchableOpacity onPress={showDatePicker}>
                            <TextInput
                              label={d?.placeholder ?? d.name}
                              multiline={d?.isTextField}
                              variant="standard"
                              // size="medium"
                              editable={false}
                              maxLength={15}
                          
                              color={Colors.BLACK_COLR}
                              value={
                                moment(values[d.name]).format('DD-MM-YYYY')
                              }
                              inputStyle={{ fontFamily: 'Oxanium-Medium', }}
                              style={{ marginVertical: 5, }}
                              // error={hasError}
                              helperText={
                                !hideErrorText && hasError
                                  ? errors[d.name]
                                  : ""
                              }
                            >
                            
                            {/* <Text style={styles.errorMsgText}>{date}</Text> */}
                      
                            </TextInput>
                            <DatePicker
                               modal
                               open={open}
                               date={
                                  values[d.name]
                                    ? parseDate(values[d.name] as string)
                                    : date
                                }
                                mode='date'
                               onConfirm={(date) => {
                                 setOpen(false)
                                 handleChange({
                                      target: {
                                        name: d.name,
                                        value: formatDate(date),
                                      },
                                    })
                               }}
                               onCancel={() => {
                                 setOpen(false)
                               }}
                               maximumDate={addDaysToDate(new Date(), 28)}
                               minimumDate={date}
                               disablePast
                          />
                          </TouchableOpacity>
                        );
                      }

                      case "radio":
                        return (
                          <RadioButton
                 
                            value={String(values[d.name])}
                            options={d?.selectOptions}
                            onChange={handleChange}
                            error={hasError}
                            helperText={
                              !hideErrorText && hasError ? errors[d.name] : ""
                            }
                          />
                        );

                      default:
                        return (
                          <TextInput
                            label={d?.placeholder ?? d.name}

                            multiline={d?.isTextField}
                            variant="standard"
                            numberOfLines={d?.isTextField ? 4 : 1}
                            maxLength={30}
                            color={!hideErrorText && hasError ? 'red' : Colors.BLACK_COLR}
                            value={String(values[d.name])}
                            onChangeText={handleChange(d.name)}
                            onBlur={handleBlur}
                            inputStyle={{ fontFamily: 'Oxanium-Medium', }}
                            style={{ marginVertical: 5 }}

                          // error={hasError}

                          >


                          </TextInput>
                        );
                    }
                  })()}
                  {!hideErrorText && hasError &&
                    <Text style={styles.errorMsgText}>{errors[d.name]}</Text>
                  }
                  <>
                    {fileInputs?.map((d, i) => {
                      const hasError =
                        errors[d.name] && touched[d.name] ? true : false;

                      return (
                        <View style={styles.custom_input_file} key={i}>
                          <TouchableOpacity onPress={() => chooseFile('photo')} style={styles.btnSection}  >
                            <Text style={styles.btnText}>Choose File</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </>
                </>
              );
            })}
            <View style={{ marginVertical: 10 }}>
              <ActionButton onPress={handleSubmit}
                title="Submit Request" backgroundColor={Colors.BLACK_COLR} color={Colors.PURE_WHITE} /></View>


          </>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  custom_input_file: {

  },
  btnSection: {
    flex: 1,
    borderWidth: 1
  },
  btnText: {
    color: Colors.BLACK_COLR
  },
  errorMsgText: {
    fontSize: 14,
    color: 'red',
    paddingBottom: 10
  }
});


export default GeneralForm;
