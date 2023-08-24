import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React,{useEffect} from 'react';

import Load from './Load';
import EditLoad from './RemLoad';


const Tab = createMaterialTopTabNavigator();

function CustomerViewMain(props:any) {

  return (
    <Tab.Navigator
      initialRouteName="Load"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        // tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          textTransform: 'uppercase',
        },
        //@ts-ignore
        tabBarIndicatorStyle: {
          height: null,
          top: '10%',
          bottom: '10%',
          width: '50%',
          backgroundColor: '#2ac7b2',
        },

        tabBarStyle: {
          backgroundColor: '#009387',
          borderColor:'white',
          borderTopWidth: 2,
          alignSelf: 'center',
          width: '100%',
          paddingTop:6,
        },
      }}>
      <Tab.Screen
        name="Load"
        component={Load}
        options={{tabBarLabel: 'Load'}}
      />
      <Tab.Screen
        name="EditLoad"
        component={EditLoad}
        options={{tabBarLabel: 'Remaining Load'}}
      />
    </Tab.Navigator>
  );
}

export default (CustomerViewMain);

