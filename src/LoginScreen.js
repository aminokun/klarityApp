import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, useWindowDimensions, ImageBackground} from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'
import { async } from '@firebase/util'
import SignUpScreen from './SignUpScreen.js'
import Logo from '../assets/temporaryLogoApp.png'


const LoginScreen = () => { 

  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {height} = useWindowDimensions()


 loginUser = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch(error){
      alert(error.message)
    }
  }

const forgotPassword = () => {
  firebase.auth().sendPasswordResetEmail(email)
  .then(() => {
    alert("Password reset email has been sent")
  }).catch((error) => {
    alert(error)
  })
}
  
  return (
      <ImageBackground style={styles.Background}  source={require('../assets/background.png')} >

          <Image source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain"/>

          <View style={styles.InputContainer}>
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
              onPress={() => forgotPassword()}
              style={styles.forgotPasswordButton}
          >
          
            <Text style={styles.noAccountText}>
            Forgot {''}<Text style={styles.forgotPasswordText}>password?</Text>
            </Text>
          </TouchableOpacity>


          <TouchableOpacity
              onPress={() => loginUser(email, password)}
              style={styles.button}
          >
            <Text style={styles.buttonText}>
            Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}
              style={styles.signUpButton}
          >
          
            <Text style={styles.noAccountText}>
            Don't have an account? {''}<Text style={styles.signUpText}>Sign up now!</Text>
            </Text>
          </TouchableOpacity>
        </ImageBackground>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    alignItems: 'center',
  },
  logo: {
    marginTop: '20%',
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
  forgotPasswordButton: {
    marginLeft: '50%',
    marginTop: 10,
  },
  forgotPasswordText: {
    fontWeight: 'regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    marginTop: "40%",
    height: 50,
    width: 200,
    backgroundColor: '#28b4ee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  signUpButton: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'regular',
    fontSize: 22,
    color: '#fff',
  },  
  noAccountText: {
    fontWeight: 'regular',
    fontSize: 16,
    color: '#FFFFFF',
  },
  signUpText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});