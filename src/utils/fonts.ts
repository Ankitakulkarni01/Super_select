import { Platform } from "react-native";

export const FONT_FAMILY = {
    BOLD: Platform.OS === "android" ? 'Zebulon-Condensed-Bold':'ZebulonCondensed-Bold',
    ITALIC: Platform.OS === "android" ?"Zebulon-Condensed-Italic": "ZebulonCondensed-Italic",
    REGULAR: Platform.OS === "android" ?"Zebulon-Condensed": "ZebulonCondensed",

};
