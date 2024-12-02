import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import MessageWindow from './components/MessageWindow';
import styles from './styles/styles';

const App = () => {
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const pickImage = async () => {
    let result;
    // Check for camera roll permissions on iOS/Android
    if (Platform.OS !== 'web') {
       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
           return;
        }
    }
    result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,  // Allows user to crop/edit
      aspect: [4, 3],       // Set desired aspect ratio
      quality: 1,           // Image quality (0-1)
      base64: true,      // Encode image as base64 (for easier API sending)
    });

    if (!result.canceled) {
      // result.assets[0] contains the selected/edited image info
      uploadImage(result.assets[0].base64);

    }
  };


  const uploadImage = async (base64Image) => {

      try {
        const response = await fetch('/your-upload-api-endpoint', {  // Replace with your API endpoint
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Or 'multipart/form-data' if your API expects that
          },
          body: JSON.stringify({ image: base64Image }), // Send the base64 image data
          // Or if using multipart/form-data:
         // body: createFormData(base64Image, { userId: '123' }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Handle the API response

        //  Alert to show the successful status and response data from the API 
        Alert.alert("Image Uploaded", JSON.stringify(data));

      } catch (error) {
          console.error("Error uploading image: ", error);
          Alert.alert("Error", error.message);
      }

  };


  const sendMessage = async () => {
    // Placeholder for sending message logic.  Replace with your backend integration.
    // Example:
    // const response = await fetch('/sendMessage', { 
    //   method: 'POST',
    //   body: JSON.stringify({ target, message })
    // });
    // const newMessage = await response.json();

    const newMessage = {
      id: Date.now().toString(), // Placeholder ID generation
      sender: 'You', // Replace with actual sender identification
      recipient: target,
      content: message,
      timestamp: new Date().toLocaleString(),
    }

    setMessages([...messages, newMessage]);
    setMessage(''); // Clear message input after sending
  };


  const fetchMessages = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null);   // Clear any previous errors

    try {
      const response = await fetch('/your-api-endpoint'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);  // Throw error for bad status codes
      }
      const data = await response.json();
      // Assuming your API returns an array of message objects.

       // Update messages state, keeping existing messages and appending new ones:
      const existingMessageIds = new Set(messages.map(msg => msg.id));
      const newMessages = data.filter(msg => !existingMessageIds.has(msg.id));

      setMessages([...messages, ...newMessages]); // Update efficiently



    } catch (e) {
      console.error('Error fetching messages:', e);
      setError(e.message); // Set the error state to display the error message

    } finally {

      setLoading(false); // Set loading to false after fetching, regardless of success/failure
    }

  };
/*
  useEffect(() => {
    // Fetch messages initially and then every 60 seconds (1 minute)
    fetchMessages(); // Initial fetch
    const intervalId = setInterval(fetchMessages, 60000);
    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(intervalId);
  }, []);
*/
  return (
    <View style={styles.container}>
      <MessageWindow messages={messages} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.targetInput}
          placeholder="Target"
          value={target}
          onChangeText={setTarget}
        />
        <TextInput
          style={styles.messageInput}
          placeholder="Message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
        <Button title="Pick Image" onPress={pickImage} />
      </View>
    </View>
  );
};

export default App;

