import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Login from './pages/Login'
import Points from './pages/Points'
import Detail from './pages/Detail'
import Profile from './pages/Profile'
import Register from './pages/Register'
import CreditCard from './pages/CreditCard'

const AppStack = createStackNavigator();

const Routes = () => {

  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#f0f0f5'
          }
        }}
      >
        <AppStack.Screen name="Home" component={Home} />
        <AppStack.Screen name="Login" component={Login} />
        <AppStack.Screen name="Points" component={Points} />
        <AppStack.Screen name="Detail" component={Detail} />
        <AppStack.Screen name="Profile" component={Profile} />
        <AppStack.Screen name="Register" component={Register} />
        <AppStack.Screen name="CreditCard" component={CreditCard} />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;