import React from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
  TextInput,
  View,
  StyleSheet,
  Button
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FaceDetector from 'expo-face-detector';

// eslint-disable-next-line
export default function App() {

  // Profile Pic
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      await detectSmiling(result);
    }
  };

  const detectSmiling = async (result) => {
    console.log('detecting faces', result.assets[0].uri)
    const faces = await FaceDetector.detectFacesAsync(result.assets[0].uri, {
      runClassifications: FaceDetector.FaceDetectorClassifications.all,
      mode: FaceDetector.FaceDetectorMode.accurate,
    });
    console.log('faces', faces.faces.length)
    if (faces.faces.length > 0) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert(
        'Invalid Picture',
        'No face :(',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: true }
      );
    }
  };


 return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
      <Button title='Select Image' onPress={pickImage}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
