import * as React from "react";
import {
  View,
  TextInput,
  TouchableWithoutFeedback,
  Clipboard,
  Keyboard,
  Platform,
} from "react-native";

import { isAutoFillSupported, codeToArray } from "./helpers/helper";
import styles from "./styles";

/**
 * Define types of keyboard
 * There are 4 main types:
 * default, email-address, number-pad and phone-pad
 */
const KeyboardType = "default" | "email-address" | "number-pad" | "phone-pad";

export default class OTPInputView extends React.Component {
  static defaultProps = {
    pinCount: 4,
    autoFocusOnLoad: true,
    secureTextEntry: false,
    keyboardAppearance: "default",
    keyboardType: "email-address",
    clearInputs: false,
    placeholderCharacter: "",
    selectionColor: "white",
    bgSelectedColor: "green",
    bgUnselectedColor: "grey",
  };

  fields = [];
  keyboardDidHideListener;
  timer;
  hasCheckedClipBoard;
  clipBoardCode;

  constructor(props) {
    super(props);
    const { code } = props;
    this.state = {
      digits: codeToArray(code),
      selectedIndex: props.autoFocusOnLoad ? 0 : -1,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { code } = this.props;
    if (nextProps.code !== code) {
      this.setState({ digits: codeToArray(nextProps.code) });
    }
  }

  componentDidMount() {
    this.copyCodeFromClipBoardOnAndroid();
    this.bringUpKeyBoardIfNeeded();

    this.keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      this.handleKeyboardDidHide
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.keyboardDidHideListener?.remove();
  }

  copyCodeFromClipBoardOnAndroid = () => {
    if (Platform.OS === "android") {
      // this.checkPinCodeFromClipBoard();
      // this.timer = setInterval(this.checkPinCodeFromClipBoard, 400);
    }
  };

  bringUpKeyBoardIfNeeded = () => {
    const { autoFocusOnLoad, pinCount } = this.props;
    const digits = this.getDigits();
    const focusIndex = digits.length ? digits.length - 1 : 0;
    if (focusIndex < pinCount && autoFocusOnLoad) {
      if (Platform.OS == "android") {
        setTimeout(() => {
          this.focusField(focusIndex);
        }, 300);
        // this.fields[focusIndex].focus();
      } else {
        setTimeout(() => {
          this.focusField(focusIndex);
        }, 600);
      }
    }
  };

  getDigits = () => {
    const { digits: innerDigits } = this.state;
    const { code } = this.props;
    return code === undefined ? innerDigits : code.split("");
  };

  handleKeyboardDidHide = () => {
    this.blurAllFields();
  };

  notifyCodeChanged = () => {
    const { digits } = this.state;
    const code = digits.join("");
    const { onCodeChanged } = this.props;
    if (onCodeChanged) {
      onCodeChanged(code);
    }
  };

  checkPinCodeFromClipBoard = () => {
    const { pinCount, onCodeFilled } = this.props;
    const regexp = new RegExp(`^\\d{${pinCount}}$`);
    Clipboard.getString()
      .then((code) => {
        if (
          this.hasCheckedClipBoard &&
          regexp.test(code) &&
          this.clipBoardCode !== code
        ) {
          this.setState(
            {
              digits: code.split(""),
            },
            () => {
              this.blurAllFields();
              this.notifyCodeChanged();
              onCodeFilled && onCodeFilled(code);
            }
          );
        }
        this.clipBoardCode = code;
        this.hasCheckedClipBoard = true;
      })
      .catch(() => { });
  };

  handleChangeText = (index, text) => {
    const { onCodeFilled, pinCount } = this.props;
    const digits = this.getDigits();
    let newdigits = digits.slice();
    const oldTextLength = newdigits[index] ? newdigits[index].length : 0;
    const newTextLength = text.length;
    if (newTextLength - oldTextLength === pinCount) {
      // user pasted text in.
      newdigits = text.split("").slice(oldTextLength, newTextLength);
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    } else {
      if (text.length === 0) {
        if (newdigits.length > 0) {
          newdigits = newdigits.slice(0, newdigits.length - 1);
        }
      } else {
        text.split("").forEach((value) => {
          if (index < pinCount) {
            newdigits[index] = value;
            index += 1;
          }
        });
        index -= 1;
      }
      this.setState({ digits: newdigits }, this.notifyCodeChanged);
    }

    let result = newdigits.join("");
    if (result.length >= pinCount) {
      onCodeFilled && onCodeFilled(result);
      this.focusField(pinCount - 1);
      this.blurAllFields();
    } else {
      if (text.length > 0 && index < pinCount - 1) {
        this.focusField(index + 1);
      }
    }
  };

  handleKeyPressTextInput = (index, key) => {
    const digits = this.getDigits();
    if (key === "Backspace") {
      if (!digits[index] && index > 0) {
        this.handleChangeText(index - 1, "");
        this.focusField(index - 1);
      }
    }
  };

  focusField = (index) => {
    // alert(focusIndex);
    if(this.fields){
      if (index < this.fields.length) {
        this.fields[index].focus();
        this.setState({
          selectedIndex: index,
        });
      }
    }
  };

  blurAllFields = () => {
    this.fields.forEach((field) => field.blur());
    this.setState({
      selectedIndex: -1,
    });
  };

  clearAllFields = () => {
    const { clearInputs, code } = this.props;
    if (clearInputs && code === "") {
      this.setState({ digits: [], selectedIndex: 0 });
    }
  };

  renderOneInputField = (_, index) => {
    const {
      codeInputFieldStyle,
      codeInputHighlightStyle,
      secureTextEntry,
      keyboardType,
      selectionColor,
      keyboardAppearance,
      clearInputs,
      placeholderCharacter,
      placeholderTextColor,
      bgSelectedColor,
      bgUnselectedColor,
    } = this.props;
    const { defaultTextFieldStyle } = styles;
    const { selectedIndex, digits } = this.state;
    const { color: defaultPlaceholderTextColor } = {
      ...defaultTextFieldStyle,
      ...codeInputFieldStyle,
    };
    return (
      <View pointerEvents="none" key={index + "view"}>
        <TextInput
          autoCapitalize="none"
          accessible={true}
          allowFontScaling={false}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={1}
          style={
            selectedIndex === index
              ? [
                defaultTextFieldStyle,
                codeInputFieldStyle,
                codeInputHighlightStyle,
                {
                  backgroundColor: digits[index]
                    ? bgSelectedColor
                    : bgUnselectedColor,
                },
              ]
              : [
                defaultTextFieldStyle,
                codeInputFieldStyle,
                {
                  backgroundColor: digits[index]
                    ? bgSelectedColor
                    : bgUnselectedColor,
                },
              ]
          }
          ref={(ref) => {
            this.fields[index] = ref;
          }}
          onChangeText={(text) => {
            // const re = /^[0-9\b]+$/;
            // if (re.test(text) || text === "")
            this.handleChangeText(index, text);
            // else if (this.fields[index] && index >= 0) {
            //   this.fields[index].clear();
            // }
          }}
          onKeyPress={({ nativeEvent: { key } }) => {
            this.handleKeyPressTextInput(index, key);
          }}
          value={!clearInputs ? digits[index] : ""}
          keyboardAppearance={keyboardAppearance}
          keyboardType={Platform.OS == "ios" ? "name-phone-pad" : "default"}
          textContentType={isAutoFillSupported ? "oneTimeCode" : "none"}
          key={index}
          // autoFocus={true}
          // focus={true}
          selectionColor={"black"}
          secureTextEntry={secureTextEntry}
          placeholder={placeholderCharacter}
          placeholderTextColor={
            placeholderTextColor || defaultPlaceholderTextColor
          }
        />
      </View>
    );
  };

  renderTextFields = () => {
    const { pinCount } = this.props;
    const array = new Array(pinCount).fill(0);
    return array.map(this.renderOneInputField);
  };

  render() {
    const { pinCount, style, clearInputs } = this.props;
    const digits = this.getDigits();
    return (
      <View testID="OTPInputView" style={style}>
        <TouchableWithoutFeedback
          accessible={false}
          style={{ width: "100%", height: "100%" }}
          onPress={() => {
            if (!clearInputs) {
              let filledPinCount = digits.filter((digit) => {
                return digit !== null && digit !== undefined;
              }).length;
              this.focusField(Math.min(filledPinCount, pinCount - 1));
            } else {
              this.clearAllFields();
              this.focusField(0);
            }
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            {this.renderTextFields()}
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
