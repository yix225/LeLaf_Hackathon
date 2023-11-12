// Users can click + button to add a new post within this community
//Show community name at the top
//Modal is entrybox for post when creating a ppost and '+' sign
import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Pressable, TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const baseUrl = 'https://api.multiavatar.com/';



const PostScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [postText, setPostText] = useState('');

  const handlePost = async () => {   
      console.log(postText);
      
      axios.post('http://172.20.10.11:3000/addPost/All', {
        postText:postText
      },{ headers: { 'Content-Type': 'application/json' } })
      .then(function (response) {
          console.log(response);
          setModalVisible(!modalVisible)
          
      })
      .catch(function (error) {
          console.log(error.response.data);
      }); 
  };
  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
            <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Make A Post:</Text>
             <TextInput
                style={styles.input}
                placeholder="New Post..."
                value={postText}
                onChangeText={(text) => setPostText(text)}
              />
            <Button title= 'Post' onPress={handlePost}  />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      

      
      
      <TouchableOpacity style={styles.addButton}
       onPress={() => setModalVisible(true)}
      >
      <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.addButton}
       onPress={() => setModalVisible(true)}
      >
      <Text style={styles.buttonText}></Text>
      </TouchableOpacity>
      <Avatar
        size="medium"
        rounded
        
        source={{
          uri: baseUrl + global.USER + ".png" + "?apikey=NsZCLftT1y67Ex"}}
        
        onPress={() => navigation.navigate('Profile')}
        containerStyle={{left:180,marginBottom:800}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
  addButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#CF9FFF', 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 40,
    right: 30,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 }, // for iOS shadow
    shadowOpacity: 0.3, // for iOS shadow
  },
  buttonText: {
    color: 'white', // You can customize the text color
    fontSize: 60,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: 200,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding:35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default PostScreen;
