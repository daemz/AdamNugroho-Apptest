import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ContactHome from '../Screens/Contacts';
import ContactEdit from '../Screens/Contacts/ContactEdit';
import ContactAdd from '../Screens/Contacts/ContactAdd';

const StackNavigator = createStackNavigator()
function StackNavigation() {
  return (
    <StackNavigator.Navigator initialRouteName="ContactHome">
      <StackNavigator.Screen name="ContactHome" component={ContactHome} options={{headerShown: false}} />

      <StackNavigator.Screen name="ContactEdit" component={ContactEdit} options={{headerShown: false}} />
      <StackNavigator.Screen name="ContactAdd" component={ContactAdd} options={{headerShown: false}} />

    </StackNavigator.Navigator>
  )
} 

export default StackNavigation;
