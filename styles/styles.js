import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imagePickerButtonContainer: {
    marginTop: 30,
  },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    targetInput: {
        flex: 1,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        borderRadius: 5,
    },
    messageInput: {
        flex: 2,
        marginRight: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 5,
        borderRadius: 5,
    },

});


const modalStyles = StyleSheet.create({
  modalContainer: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 10,
    },
});


export {styles as default, modalStyles};

