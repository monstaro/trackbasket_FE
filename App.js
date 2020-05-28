import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import LoginModal from './screens/LoginModal';
import AtRiskTabs from './screens/AtRiskTabs';
import { UserProvider } from './user-context';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <MainStack.Screen
        name="AtRiskTabs"
        component={AtRiskTabs}
        options={{ title: '' }}
      />
    </MainStack.Navigator>
  );
};

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([{ status: 'pending' }]);
  const addToCart = (newItem) =>
    setCart(cart.length ? [...cart, newItem] : [newItem]);
  const removeFromCart = (selectedItem) =>
    setCart([cart.filter((item) => item.upc !== selectedItem.upc)].flat());
  const setNewUser = (user) => setUser(user);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [installationId, setInstallationId] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation);
    })();
  }, []);
  return (
    <UserProvider
      value={{
        user,
        cart,
        addToCart,
        removeFromCart,
        setNewUser,
        location,
        installationId,
        setInstallationId,
      }}
    >
      <NavigationContainer>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="Your profile" component={LoginModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
