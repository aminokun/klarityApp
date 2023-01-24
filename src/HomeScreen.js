import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, useWindowDimensions, onPress, Slider  } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import spongebob from '../assets/spongebob.jpg'
import Logo from '../assets/temporaryLogoApp2.png'

import { firebase } from '../config'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomSheet, BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';


import Chart from "./appScreens/Chart.js"
import SliderScreen from "./appScreens/SliderScreen.js"
import { ScrollView } from 'react-native-gesture-handler';


const HomeScreen = () => {
  const {height} = useWindowDimensions()

  // Tab navigation
  const Tab = createBottomTabNavigator();
  
  // Bottomsheet variables
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const snapPoints2 = useMemo(() => ['70%'], []);


  const openModal = () => {
    bottomSheetModalRef.current.present();
  }
  const closeBottomSheet = () => {
    bottomSheetModalRef.current.close();
  }

    const openModal2 = () => {
    bottomSheetModalRef2.current.present();
  }
  const closeBottomSheet2 = () => {
    bottomSheetModalRef2.current.close();
  }

  // retrive data from MySQL database with JSON
  const [scanresult, setScanresult] = useState([]);
  const fetchUsers = async () => {
    try {
      const response = await fetch("http://192.168.236.132/reactnativefetch.php");
      const json = await response.json();
      setScanresult(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
  <BottomSheetModalProvider>
        <View style={styles.rectangleOverlay}
        behavior = "padding"
      >
          <TouchableOpacity 
            onPress={() => {firebase.auth().signOut()}}
            style={styles.signoutButton}>
            <Image source={require('../assets/logouticon.png')} 
                  style={[styles.logouticon]} 
                  resizeMode="contain"/>
          </TouchableOpacity>
        
          <Image source={Logo} 
                  style={[styles.spongebob, {height: height * 0.3}]} 
                  resizeMode="contain"
                  />
          <View style={styles.FlexDirection}>
          <TouchableOpacity
            onPress={() => openModal()}
            style={styles.DataSheetButton}>
            <Image source={require('../assets/charticon.png')} 
                  style={[styles.slidericon]} 
                  resizeMode="contain"/>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={() => openModal2()}
            style={styles.sliderButton}>
            <Image source={require('../assets/slidericon.png')} 
                  style={[styles.slidericon]} 
                  resizeMode="contain"/>
        </TouchableOpacity>
        </View>



        <View style={styles.BottomSheetColor}>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={0}
            snapPoints={snapPoints}
            style={styles.bottomSheetModalStyle}
          >
            <ScrollView>
              <View style={styles.contentContainer}>
              <TouchableOpacity
              onPress = {closeBottomSheet}>
                <Text 
                style={styles.closeText}
                >
                  Close
                </Text>
              </TouchableOpacity>
                <View>
                  <Chart/>
                </View>
              </View>
            </ScrollView>
        </BottomSheetModal>
        
          <BottomSheetModal
            ref={bottomSheetModalRef2}
            index={0}
            snapPoints={snapPoints2}
            style={styles.bottomSheetModalStyle2}
          >
            <ScrollView>
              <View style={styles.contentContainer}>
              <TouchableOpacity
              onPress = {closeBottomSheet2}>
                <Text 
                style={styles.closeText}
                >
                  Close
                </Text>
              </TouchableOpacity>
                <View style={styles.SliderContainer}>
                  <SliderScreen/>
                </View>
              </View>
            </ScrollView>
          </BottomSheetModal>
          </View>
        </View>
  </BottomSheetModalProvider>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  rectangleOverlay: {
    flex: 2,
    backgroundColor: '#36393F',
    alignItems: 'center',
  },
  spongebob: {
    marginTop: "10%",
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: '5%',
  },
  logouticon: {
    width: "60%",
    height: "60%",
  },
    slidericon: {
    width: "80%",
  },
  FlexDirection: {
    flexDirection: "row",
    marginTop: "10%",
  },
  signoutButton: {
    marginTop: "10%",
    height: 50,
    width: 50,
    backgroundColor: '#DF28E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    marginLeft: "75%",
  },
  DataSheetButton: {
    height: 50,
    width: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 50,
    marginHorizontal: "5%",

  },
    sliderButton: {
    height: 50,
    width: 80,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
   borderRadius: 50,
    marginHorizontal: "5%",
    
  },
  signoutText: {
    fontWeight: 'regular',
    fontSize: 22,
    color: '#fff',
  },
  closeText:{
    fontWeight: 'bold',
    fontSize: 15,
    color: '#DF28E9',
    marginLeft: "5%",
  },  
  BottomSheetColor: {
    backgroundColor: "#36393F",
  },
  bottomSheetModalStyle: {
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: 'grey',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetModalStyle2: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  SliderContainer: {
    paddingHorizontal: "5%",

  }
  
})