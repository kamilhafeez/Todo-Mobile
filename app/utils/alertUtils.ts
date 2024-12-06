import { Alert, Platform } from "react-native";

export const showAlert = (
  title: string,
  message: string,
  onDismiss?: () => void
) => {
  if (Platform.OS !== "web") {
    Alert.alert(title, message, [{ text: "OK", onPress: onDismiss }]);
  } else {
    alert(`${title}: ${message}`);
    if (onDismiss) {
      onDismiss();
    }
  }
};
