import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setStatus, fetchBoard } from '../store/actions/boardActions';

export default function Finish({ navigation }) {
  const dispatch = useDispatch();
  const { player, difficulty } = useSelector(state => state);

  function handlePress() {
    dispatch(setStatus('unsolved'));
    dispatch(fetchBoard(difficulty));
    navigation.navigate('Game');
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.goldMedal}
        source={require('../assets/gold-medal.png')}
      />
      <View style={styles.description}>
        <Text style={styles.textDescription}>A MEDAL FOR</Text>
        <Text style={styles.textDescription}>{player}</Text>
      </View>
      <View style={styles.award}>
        <Text style={styles.textAward}>SUDOKU MASTER</Text>
        <Text style={styles.textAward}>AWARD</Text>
      </View>
      <Button title="Play again" onPress={() => handlePress()}/>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  award: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  },
  description: {
    alignItems: 'center',
  },
  textDescription: {
    fontSize: 18,
    color: '#fff',
    letterSpacing: 5,
    marginBottom: 10
  },
  textAward: {
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fb5b5a',
  },
  goldMedal: {
    height: 180,
    width: 180
  }
})