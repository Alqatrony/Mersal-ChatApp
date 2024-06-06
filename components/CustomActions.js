import { TouchableOpacity, Text, View, StyleSheet, Alert } from "react-native";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            break;
          case 1:
            takePhoto();
            break;
          case 2:
            getLocation();
            break;
          default:
        }
      }
    );
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.cancelled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else {
        Alert.alert("Permission to access camera roll was denied");
      }
    }
  };

  const takePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (permission.granted) {
      const result = await ImagePicker.launchCameraAsync();

      if (!result.cancelled) {
        await uploadAndSendImage(result.assets[0].uri);
      } else {
        Alert.alert("Permission to access camera was denied");
      }
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    if (location) {
      onSend({
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
      });
    } else {
      Alert.alert("Location not found");
    }
  };

  const createBlob = (uri) => {
    const timestamp = new Date().getTime();
    const imageRef = uri.split("/").pop();
    return `${userID}-${timestamp}-${imageRef}`;
  };

  const uploadAndSendImage = async (imageURI) => {
    try {
      const uniqueRefString = createBlob(imageURI);
      const imageRef = ref(storage, uniqueRefString);
      const response = await fetch(imageURI);
      const blob = await response.blob();
      await uploadBytes(imageRef, blob);
      const imageURL = await getDownloadURL(imageRef);
      onSend({ image: imageURL });
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, wrapperStyle]}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="This is an input field with a clickable icon that expands a menu"
      accessibilityHint="Choose what type of media to share with your contacts or cancel to collapse menu"
      accessibilityRole="button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: "#b2b2b2",
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: "#b2b2b2",
    fontWeight: "bold",
    fontSize: 16,
    backgroundColor: "transparent",
    textAlign: "center",
  },
});

export default CustomActions;