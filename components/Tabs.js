import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, useWindowDimensions  } from 'react-native'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

const Tab = createBottomTabNavigator();
import HomeScreen from "../src/HomeScreen.js"
import Chart from "../src/appScreens/Chart.js"
import SettingsScreen from "../src/appScreens/SettingsScreen.js"
import { NavigationContainer } from '@react-navigation/native';


const Tabs = () => {
    return (
    <NavigationContainer
    independent={true}
    >
        <Tab.Navigator>
            <Tab.Screen name="Home" component={ HomeScreen } />
            <Tab.Screen name="Profile" component={ ProfileScreen } />
            <Tab.Screen name="Settings" component={ SettingsScreen } />
        </Tab.Navigator>
    </NavigationContainer>
    );
}

export default Tabs;

const styles = StyleSheet.create({})
