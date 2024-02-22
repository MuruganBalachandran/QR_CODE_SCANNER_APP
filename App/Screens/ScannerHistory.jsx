import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../Utils/Colors';

export default function ScannerHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('scannedURL');
      if (savedHistory) {
        setHistory([savedHistory]);
      }
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  const clearHistory = async () => {
    try {
      await AsyncStorage.removeItem('scannedURL');
      setHistory([]);
      console.log('History cleared successfully');
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  };

  const handleHistoryItems = (item) => {
    if (item) {
      Linking.openURL(item);
    }
  };

  const renderHistoryItem = ({ item }) => {
    return (
      <ScrollView>
        <View style={styles.historyItem}>
          <TouchableOpacity onPress={() => handleHistoryItems(item)}>
            <Text style={styles.historyText}>{item}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>History</Text>
        <TouchableOpacity onPress={clearHistory}>
          <Text style={styles.clearButton}>Clear history</Text>
        </TouchableOpacity>
      </View>

      {history.length === 0 ? (
        <Text style={styles.noHistoryText}>No history available</Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderHistoryItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginTop: 40,
    justifyContent: "center"
  },
  headerText: {
    fontSize: 20,
    color: Colors.BLACK,
    textAlign: "center",
  },
  clearButton: {
    fontSize: 16,
    color: Colors.WHITE,
    backgroundColor: Colors.RED,
    borderRadius: 10,
    padding: 10
  },
  historyItem: {
    backgroundColor: Colors.BLUE_GRADIENT,
    padding: 20,
    marginVertical: 5,
    borderRadius: 10,
    height:500
  },
  historyText: {
    fontSize: 16,
    fontFamily: 'outfit-Regular',
    color: Colors.WHITE,
  },
  noHistoryText: {
    fontSize: 18,
    fontFamily: 'outfit-Regular',
    color: Colors.BLACK,
    textAlign: 'center',
    marginTop: 20,
  },
});
