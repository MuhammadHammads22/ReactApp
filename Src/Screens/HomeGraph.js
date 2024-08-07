import { Platform, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Home from './Home';
import Saved from './Saved';
import Profile from './Profile';
import Satisfied from './Satisfied';
// import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';



// const Tab = createMaterialBottomTabNavigator();


const Tab = createBottomTabNavigator();

const HomeGraph = ({navigation}) => {
  return (
    <Tab.Navigator initialRouteName='Home'screenOptions={{
      // headerShown:false,
      tabBarStyle: {
      // borderTopLeftRadius: responsiveHeight(6),
      // borderTopRightRadius: responsiveHeight(6),
      width: responsiveWidth(100),
      backgroundColor: 'black',
      height:
        Platform.OS === 'ios' ? responsiveHeight(13) : responsiveHeight(8),
      elevation: 4,
      bottom: Platform.OS === 'ios' ? responsiveHeight(-2) : 0,
    }}}
    >
      <Tab.Screen options={{
        headerTitle:'Home',
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('C:\\Users\\hammad\\Desktop\\ReactNative\\practice\\adazakat\\Src\\Assets\\home.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            )}} name="Home" component={Home}  />
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Satisfied',
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('C:\\Users\\hammad\\Desktop\\ReactNative\\practice\\adazakat\\Src\\Assets\\group.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            )}} name="Satisfied" component={Satisfied} />
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Saved',
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('C:\\Users\\hammad\\Desktop\\ReactNative\\practice\\adazakat\\Src\\Assets\\notification.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            )}}   name="Saved" component={Saved} />
      <Tab.Screen options={{
            // gestureEnabled:true,
            // animationTypeForReplace:'pop',
            headerTitle:'Profile',
            tabBarActiveTintColor: 'white',
            tabBarIcon: ({focused}) => (
              <Image
                source={require('C:\\Users\\hammad\\Desktop\\ReactNative\\practice\\adazakat\\Src\\Assets\\logo.png')}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? 'white' : 'gray',
                }}
              />
            )}}  name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default HomeGraph