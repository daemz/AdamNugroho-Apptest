import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Root } from 'native-base';

import StackNavigation from './StackNavigation';

function RootNavigation() {
  return(
    <NavigationContainer>
      <Root>
        <StackNavigation/>
      </Root>
    </NavigationContainer>
  )
}

export default RootNavigation;
