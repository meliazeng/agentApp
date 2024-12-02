import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';


const MessageWindow = ({ messages }) => {
    const renderMessage = ({ item }) => (
      <View style={styles.messageContainer}>
            <Text style={styles.sender}>{item.sender}:</Text>
            <Text>{item.content}</Text>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
        </View>
    );

    return (
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageWindow}
        inverted // Display messages from bottom up
      />

    );
};


const styles = StyleSheet.create({
    messageWindow: {
        flex: 1,
      },
      messageContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      sender: {
        fontWeight: 'bold',
      },
      timestamp: {
        fontSize: 12,
        color: 'gray',
      },
});


export default MessageWindow;

