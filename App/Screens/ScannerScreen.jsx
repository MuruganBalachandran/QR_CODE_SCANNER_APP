// ScannerScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, ToastAndroid, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Colors from '../Utils/Colors';

export default function ScannerScreen() {
  const navigation = useNavigation();
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setText(data);
  };

  const handleSaveToHistory = async () => {
    try {
      await AsyncStorage.setItem('scannedURL', text);
      ToastAndroid.show("Url History saved Successfully", ToastAndroid.SHORT);
      console.log("Scanned URL saved to AsyncStorage: ", text);
    } catch (error) {
      console.error("Error saving scanned URL to AsyncStorage: ", error);
    }
  };

  const handleOpenLink = () => {
    if (text !== "Not yet scanned") {
      Linking.openURL(text);
    }
  };

  const handleScanAgain = () => {
    setScanned(false); // Reset scanned state to false
    setText("Not yet scanned"); // Reset text
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Requesting camera permission</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No access to camera</Text>
        <Button title="Allow Camera" onPress={askForCameraPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.barCodeBox}>
        <BarCodeScanner 
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.barCodeScanner}
        />
      </View>
      <TouchableOpacity onPress={handleOpenLink}>
        <Text style={styles.mainText}>{text}</Text>
      </TouchableOpacity>
      {scanned && (
        <Button
          title="Scan Again"
          onPress={handleScanAgain} // Call handleScanAgain function
          color="#ff6347"
        />
      )}
      <TouchableOpacity style={styles.historyButton} onPress={handleSaveToHistory}>
        <Text style={styles.buttonText}>Save to History</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  historyButton: {
    backgroundColor: '#6a5acd',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
  barCodeBox: {
    backgroundColor: '#ccc',
    width: 300,
    height: 300,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  barCodeScanner: {
    flex: 1,
  },
  mainText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    color: Colors.BLUE,
  },
});
