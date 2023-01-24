// import React, { useState, useEffect} from "react";
// import {StyleSheet, Text, View, Dimensions} from 'react-native';
// import Slider from '@react-native-community/slider'
// import { LinearGradient } from 'expo-linear-gradient';

//   const SliderScreen = () => {

//     const [value, setValue] = useState(0);


//       useEffect(() => {
//     // Make a call to fetch data here
//     fetch("http://192.168.236.132/reactnativefetch.php")
//       .then(response => response.json())
//       .then(data => {
//         // Extract the most recent value from the JSON array
//         const mostRecentValue = data[data.length - 1].result;
//         setValue(mostRecentValue);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//       }, []);
    
//     return(
//         <View style={styles.container}>

//         <Text style={styles.TextOfValue}>
//          {value}
//         </Text>

//       <LinearGradient colors={['#00ff00','#FBFF00','#FFA200','#ff0000']}
//       start={{ x: 0, y: 0}}
//       end={{  x: 1, y: 0 }}
//       style= {{borderRadius: 20,}}
//       >
//   <Slider
//     style={{ width: Dimensions.get('window').width}}
//     minimumValue={0}
//     maximumValue={500}
//     value={value}
//     // onValueChange={(value) => console.log(value)}
//     thumbImage={require('../../assets/dot.png')}
//     minimumTrackTintColor={'rgba(0,0,0,0.0)'}
//     maximumTrackTintColor={'rgba(0,0,0,0.0)'}
//     thumbTintColor={''}
//     onValueChange={setValue}
    
//   />
// </LinearGradient>
//     </View>
//     )
// }

// export default SliderScreen

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     height: 40,
//     width: '100%',
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   TextOfValue: {
//     color: "#DF28E9",
//     paddingHorizontal: "49%",
//     paddingBottom: "15%",
//     fontSize: "30",
//     fontWeight: "bold",
//   },
//   slider: {
//     transform: [
//       {
//         translateX: -20,
//       },
//     ],
//   },
// });


import React, { useState, useEffect} from "react";
import {StyleSheet, Text, View, Dimensions, useWindowDimensions, Image} from 'react-native';
import Slider from '@react-native-community/slider'
import { LinearGradient } from 'expo-linear-gradient';
import Logo from '../../assets/temporaryLogoApp2.png';
import ThumbImage from '../../assets/dot3.png';

// import Logo from '../assets/temporaryLogoApp.png';
// import Chart from "./appScreens/Chart.js";

  const SliderScreen = () => {
    const [value, setValue] = useState(0);
    const [time, setTime] = useState(0);
    const [hoeveelste, setHoeveelste] = useState(0);
    const {height} = useWindowDimensions()



      useEffect(() => {
    // Make a call to fetch data here
    fetch("http://192.168.236.132/reactnativefetch.php")
      .then(response => response.json())
      .then(data => {
        // Extract the most recent value from the JSON array
        const mostRecentValue = data[data.length - 1].result;
        const mostRecentDate= data[data.length - 1].time;
        const mostRecentHoeveelste= data[data.length - 1].resultid;
        setValue(mostRecentValue);
        setTime(mostRecentDate);
        setHoeveelste(mostRecentHoeveelste);
      })
      .catch(error => {
        console.log(error);
      });
      }, []);

    // const {height} = useWindowDimensions()

    
return(
  <View>
      <Image source={Logo} 
          style={styles.logo} 
          resizeMode="contain"/>

      <Text style={styles.text}>
        {"Waarden:                  "+parseInt(value)+"\n"+"Datum en tijd:         "+time + "\n" + "Meeting versie:      "+ hoeveelste}
      </Text>

      <LinearGradient colors={['#00ff00','#FBFF00','#FFA200','#ff0000']}
      start={{ x: 0, y: 0}}
      end={{  x: 1, y: 0 }}
      style= {{borderRadius: 20,}}
      >
      <Slider
          enabled={false}
          style={{ width: Dimensions.get('window').width}}
          minimumValue={0}
          maximumValue={500}
          value={value}
          thumbImage={ThumbImage}
          minimumTrackTintColor={'rgba(0,0,0,0.0)'}
          maximumTrackTintColor={'rgba(0,0,0,0.0)'}
          thumbTintColor={''}
          thumbStyle = {{ width:40, height:40}}
      />
    </LinearGradient>
  </View>

  )
}

export default SliderScreen

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    alignSelf: "flex-end",
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 60,
    color: '#000080',
    marginBottom: "20%",
    marginLeft: "5%",
    fontSize: 20
  },
  gradient: {
    height: 40,
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
  },
  slider: {
    transform: [
      {
        translateX: -20,
      },
    ],
  },
});