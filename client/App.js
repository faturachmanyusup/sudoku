// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { Home, Game, Finish } from './pages';

const Stack = createStackNavigator();

const GameScreen = ({ navigation }) => {
  return (
    <View style={styles.App}>
      <Game navigation={navigation} />
    </View>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.App}>
      <Home navigation={navigation} />
    </View>
  )
}

const FinishScreen = ({ navigation }) => {
  return (
    <View style={styles.App}>
      <Finish navigation={navigation} />
    </View>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Game" component={GameScreen} />
          <Stack.Screen name="Finish" component={FinishScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  App: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#228',
    height: '100%'
  }
});