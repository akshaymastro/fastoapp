import { StyleSheet } from "react-native";
import { fontSizes } from "../../fontSizes";
import { heights } from "../../heights";

const styles = StyleSheet.create({
  defaultTextFieldStyle: {
    fontSize: fontSizes(18),
    width: heights(48),
    height: heights(48),
    textAlign: "center",
  },
});

export default styles;
