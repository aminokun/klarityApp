import React, { useState, useEffect} from "react";
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import Slider from '@react-native-community/slider'
import { LinearGradient } from 'expo-linear-gradient';

  const SliderScreen = () => {

    const [value, setValue] = useState(0);


      useEffect(() => {
    // Make a call to fetch data here
    fetch("http://192.168.236.132/reactnativefetch.php")
      .then(response => response.json())
      .then(data => {
        // Extract the most recent value from the JSON array
        const mostRecentValue = data[data.length - 1].result;
        setValue(mostRecentValue);
      })
      .catch(error => {
        console.log(error);
      });
      }, []);
    
    return(
        <View style={styles.container}>

        <Text style={{height: 30}}>
         {value}
        </Text>

      <LinearGradient colors={['#00ff00','#FBFF00','#FFA200','#ff0000']}
      start={{ x: 0, y: 0}}
      end={{  x: 1, y: 0 }}
      style= {{borderRadius: 20,}}
      >
  <Slider
    style={{ width: Dimensions.get('window').width - 50, maxHeight: '2%' }}
    minimumValue={0}
    maximumValue={500}
    value={value}
    // onValueChange={(value) => console.log(value)}
    thumbImage={require('../../assets/dot.png')}
    minimumTrackTintColor={'rgba(0,0,0,0.0)'}
    maximumTrackTintColor={'rgba(0,0,0,0.0)'}
    thumbTintColor={''}
    onValueChange={setValue}
    
  />
</LinearGradient>
    </View>
    )
}

export default SliderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
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
