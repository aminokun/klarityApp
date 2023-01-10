import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, useWindowDimensions, onPress, Slider  } from 'react-native'
import React, { useState, useEffect, useRef, useMemo } from 'react'
import spongebob from '../assets/spongebob.jpg'
import Logo from '../assets/temporaryLogoApp.png'

import { firebase } from '../config'
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';


import Chart from "./appScreens/Chart.js"
import SliderScreen from "./appScreens/SliderScreen.js"
import { ScrollView } from 'react-native-gesture-handler';


const HomeScreen = () => {
  const {height} = useWindowDimensions()

  // Tab navigation
  const Tab = createBottomTabNavigator();
  
  // Bottomsheet variables
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['70%'], []);
  const openModal = () => {
    bottomSheetModalRef.current.present();
  }
  const closeBottomSheet = () => {
    bottomSheetModalRef.current.close();
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
      <View style={styles.container}
      behavior = "padding"
      >
        <View style={styles.rectangleOverlay}>
        
          <Image source={Logo} 
                  style={[styles.spongebob, {height: height * 0.3}]} 
                  resizeMode="contain"
                  />

          <TouchableOpacity
            onPress={() => openModal()}
            style={styles.DataSheetButton}>
              <Text style={styles.signoutText}>
                DataSheet
              </Text>
          </TouchableOpacity>


          <TouchableOpacity 
            onPress={() => {firebase.auth().signOut()}}
            style={styles.signoutButton}>
              <Text style={styles.signoutText}>
                Sign Out
              </Text>
          </TouchableOpacity>
          <View>
            <SliderScreen/>
          </View>

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
                    {/* {scanresult.map(dataScan => (
                      <Text key={dataScan.resultid}>                         {dataScan.time}     -      {dataScan.result}</Text>
                    ))} */}
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
  container: {
    flex: 1,
    backgroundColor: '#df28e9',
  },
  rectangleOverlay: {
    flex: 2,
    marginTop: '20%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
  },
  spongebob: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginVertical: '5%',
  },
  signoutButton: {
    marginTop: "10%",
    height: 50,
    width: 200,
    backgroundColor: '#28b4ee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  DataSheetButton: {
    marginTop: "10%",
    height: 50,
    width: 200,
    backgroundColor: '#28b4ee',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
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
  bottomSheetModalStyle: {
    alignContent: "center",
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    
  },
  
})