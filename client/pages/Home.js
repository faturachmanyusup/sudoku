import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { setPlayerAction } from '../store/actions/boardActions';

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const [player, setPlayer] = useState('');

  function handleChange(nickname) {
    setPlayer(nickname);
  }
  
  function handleInput() {
    dispatch(setPlayerAction(player));
    navigation.navigate('Game');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SUDO KU</Text>
      <View style={styles.form}>
        <TextInput placeholder='Nickname' onChangeText={value => handleChange(value)} />
      </View>
      <Button onPress={() => handleInput()} title="Enter" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  form:{
    width: '100%',
    backgroundColor: '#ede6e6',
    borderRadius: 25,
    height: 45,
    marginBottom: 20,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40
  }
})