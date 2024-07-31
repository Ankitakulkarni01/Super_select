import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useId,
    useState,
  } from "react";
  import styles from "./styles.module.scss";
  
  import clsx from "clsx";
  import { blobObjectCleanup, fileToURL } from "@/utils/file-blob-url";
  
  import { IoAddOutline, IoTrashOutline } from "react-native-vector-icons/Ionicons';
";
  import { FileInputType } from "..";
  import { SUPPORTED_IMAGE_MIME_TYPES } from "@/utils/supportedFiles";
  
  //
  
  type FileInputChangeEvent = (data: {
    target: { name: string; value: Array<any> };
  }) => void;
  
  //
  
  const FileInput: FC<{
    name?: string;
    type: FileInputType;
    count?: number;
    onChange?: FileInputChangeEvent;
    required?: boolean;
    labelText?: string;
    error?: boolean;
    helperText?: string;
  }> = ({
    name,
    type,
    count = 1,
    onChange,
    required = false,
    labelText = "Add File",
    error,
    helperText,
  }) => {
    const id = useId();
  
    const [data, setData] = useState<Array<File>>([]);
  
    // Handle Change
    const handleChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const files = event?.target?.files ?? [];
  
        let filteredFiles: Array<File> = [];
        for (let i = 0; i < files.length; i++) {
          const ele = files[i];
  
          switch (type) {
            case "image":
              {
                if (SUPPORTED_IMAGE_MIME_TYPES.includes(ele.type))
                  filteredFiles.push(ele);
              }
              break;
  
            default:
              break;
          }
        }
  
        setData((st) => {
          const toAdd = filteredFiles.splice(0, count - st.length);
          const final = [...st, ...toAdd];
  
          if (onChange) onChange({ target: { name, value: final } });
          return final;
        });
  
        event.currentTarget.value = "";
      },
      [name, type, count, setData, onChange]
    );
    //
  
    // Handle Remove
    const handleRemove = useCallback(
      (index: number) => {
        setData((st) => {
          const copyFiles = [...st];
          copyFiles.splice(index, 1);
  
          if (onChange) onChange({ target: { name, value: copyFiles } });
          return copyFiles;
        });
      },
      [name, setData, onChange]
    );
    //
  
    //
  
    const fileInputClasses = clsx(styles.FileInput, error ? styles.error : "");
  
    //
    //
  
    return (
      <div className={fileInputClasses}>
        <div className={styles.title}>
          {labelText} ({data?.length}/{count}){required && "*"}
        </div>
  
        <div className={styles.wrapper}>
          {data?.map((d, i) => (
            <div className={styles.item} key={i}>
              <Thumbnail file={d} type={type} />
  
              <div className={styles.overlay}>
                <IoTrashOutline onClick={() => handleRemove(i)} />
              </div>
            </div>
          ))}
  
          {data?.length < count && (
            <div className={styles.input_item}>
              <label htmlFor={id}>
                <IoAddOutline />
              </label>
  
              <input
                name={name}
                id={id}
                hidden
                type="file"
                accept={getAccept(type)}
                multiple={count > 1}
                onChange={handleChange}
                required={required}
              />
            </div>
          )}
        </div>
  
        {helperText ? <div className={styles.helper}>{helperText}</div> : null}
      </div>
    );
  };
  
  export default FileInput;
  
  //
  //
  //
  //
  //
  
  // Get Accept
  const getAccept = (type: FileInputType) => {
    switch (type) {
      case "image":
        return SUPPORTED_IMAGE_MIME_TYPES.join(", ");
  
      default:
        return "*";
    }
  };
  //
  
  //
  //
  //
  
  const Thumbnail: FC<{ file: File; type: FileInputType }> = ({ file, type }) => {
    const [src, setSrc] = useState("");
  
    useEffect(() => {
      const x = fileToURL(file);
      setSrc(x);
  
      return () => {
        blobObjectCleanup(x);
      };
    }, [file]);
  
    //
  
    if (!src) return null;
  
    //
    //
  
    switch (type) {
      case "image":
        return <img src={src} alt="thumb" />;
  
      default:
        return null;
    }
  };
  