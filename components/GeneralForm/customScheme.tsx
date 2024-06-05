import { mixed, array } from "yup";
import { SUPPORTED_IMAGE_MIME_TYPES } from "../../src/utils/supportedFiles";



const MAX_FILE_SIZE = 5000000;



export const imageArray = (count: number, required?: boolean) =>
  array()
    .min(2, "Atleast add two photos!")
    .max(count, `maximum ${count} photos allowed!`)
    .of(
      mixed()
    )
    .when("_", (_, schema) => {
      return required ? schema.required("Required") : schema.notRequired();
    });
