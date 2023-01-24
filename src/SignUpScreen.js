import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, useWindowDimensions, ImageBackground} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import Logo from '../assets/temporaryLogoApp.png'



const SignUpScreen = () => {
  const navigation = useNavigation()

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {height} = useWindowDimensions()

  
  const registerUser = async (userName, email, password) => {
    await firebase.auth().createUserWithEmailAndPassword(userName, email, password)
    // .then(() => {
    //     firebase.firestore().collection("users")
    //     .doc(firebase.auth().currentUser.uid)
    //     .set({
    //       userName,
    //       email,
    //     })
    // })
      .catch((error) => {
        alert(error.message)
      })
  }
  return (
      <ImageBackground style={styles.Background}  source={require('../assets/background.png')} >

        <Image source={Logo} 
               style={[styles.logo, {height: height * 0.3}]} 
               resizeMode="contain"/>

        <View style={styles.InputContainer}>
            <TextInput
              placeholder="User Name"
              onChangeText={(userName) => setUserName(userName)}
              autoCapitalize="none"
              autoCorrect={false}
              style = {styles.input}
            />
            <TextInput
              placeholder="Email"
              onChangeText={(email) => setEmail(email)}
              autoCapitalize="none"
              autoCorrect={false}
              style = {styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(password) => setPassword(password)}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              style = {styles.input}
            />
        </View>

        <TouchableOpacity
            onPress={() => registerUser(email, password, userName)}
            style={styles.button}
        >
          <Text style={styles.buttonText}>
          Sign Up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginButton}
        >
        
          <Text style={styles.alreadyAccountText}>
          Already have an account? {''}<Text style={styles.logInText}>Login now!</Text>
          </Text>
        </TouchableOpacity>
    </ImageBackground>
  )

}

export default SignUpScreen

const styles = StyleSheet.create({

Background: {
  flex: 1,
  alignItems: 'center',
},
  logo: {
  marginTop: "20%",
  width: '70%',
  maxWidth: 300,
  maxHeight: 200,
  marginVertical: '5%',
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
InputContainer: {
  width: '80%',
  marginTop: 0,
  shadowColor: '#171717',
  shadowOffset: {width: -2, height: 4},
  shadowOpacity: 0.2,
  shadowRadius: 3,
},
input: {
  backgroundColor: 'white',
  paddingHorizontal: 15,
  paddingVertical: 20,
  borderRadius: 75,
  marginTop: 15,
},
button: {
  marginTop: "30%",
  height: 50,
  width: 200,
  backgroundColor: '#28b4ee',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 50,
},
loginButton: {
  marginTop: 20,
},
buttonText: {
  fontWeight: 'regular',
  fontSize: 22,
  color: '#fff',
},  
alreadyAccountText: {
  fontWeight: 'regular',
  fontSize: 16,
  color: '#FFF',
},
logInText: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#FFF',
},
})