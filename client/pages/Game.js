import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchBoard,
  validateServer,
  solve,
  setDifficulty,
  setAlert
} from '../store/actions/boardActions';

const boxSize = (Dimensions.get('window').width - 40) / 9;

export default function Game({ navigation }) {
  const dispatch = useDispatch();
  const { board, status, difficulty, solution, alert } = useSelector(state => state);
  const [localBoard, setLocalBoard] = useState([]);
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty));
  }, [dispatch, difficulty]);

  useEffect(() => {
    setLocalBoard(JSON.parse(JSON.stringify(board)));
  }, [board]);

  useEffect(() => {
    setLocalBoard(JSON.parse(JSON.stringify(solution)));
  }, [solution]);
  
  function validate() {
    dispatch(validateServer(localBoard));
  }
  
  function giveUp() {
    dispatch(solve(board));
  }
  
  function playAgain() {
    dispatch(fetchBoard(difficulty));
  }
  
  function handleChange(row, col, value) {
    if ((typeof +value === 'number' && +value > 0) || value == '') {
      let newBoard = [...localBoard];
      newBoard[row][col] = +value;
      setLocalBoard(newBoard);
    }
  }

  const unsolvedAlert = () =>
    Alert.alert(
      "Fail",
      "Not solved yet",
      [
        { text: "OK", onPress: () => dispatch(setAlert(false)) }
      ],
      { cancelable: false }
    );

  const button = () => {
    return (
      <View>
        {status !== 'give up' &&
          <View style={styles.buttonGroup}>
            <Button
              onPress={() => validate()}
              title="validate"
              color="#841584"
            />
            <Text>   </Text>
            <Button
              onPress={() => giveUp()}
              title="give up"
              color="red"
            />
          </View>
        }
        {status === 'give up' &&
          <Button
            onPress={() => playAgain()}
            title="Play again"
            color="green"
          />
        }
        </View>
    )
  }

  const loadingView = () => {
    return (
      <View style={{justifyContent: 'center', flex: 1}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (status === 'solved') {
    navigation.navigate('Finish');
  }

  if (localBoard.length < 1) {
    return loadingView();
  }

  return (
    <View style={styles.gameContainer}>
      {alert && unsolvedAlert()}
      <View style={styles.board}>
        {localBoard.map((row, rowIdx) => {
          return (
            <View style={styles.row} key={rowIdx}>
              {row.map((number, idx) => {
                return (
                  <View style={styles.box(rowIdx, idx)} key={idx}>
                    <TextInput
                      style={[styles.input, {backgroundColor: board[rowIdx][idx] == 0 ? '#fff' : '#939280'}]}
                      value={number == 0 ? "" : String(number)}
                      editable={board[rowIdx][idx] === 0}
                      maxLength={1}
                      onChangeText={value => handleChange(rowIdx, idx, value)}
                    />
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
      <View style={styles.footer}>
        <Text style={{textAlign: 'center', fontWeight: 'bold', color: '#fff'}}>{difficulty}</Text>
        {button()}
      </View>
      <Text style={styles.difficultyLabel}>Difficulty :</Text>
      <View style={styles.difficulty}>
        <Button title="easy" onPress={() => dispatch(setDifficulty('easy'))} />
        <Button title="medium" onPress={() => dispatch(setDifficulty('medium'))} />
        <Button title="hard" onPress={() => dispatch(setDifficulty('hard'))} />
        <Button title="random" onPress={() => dispatch(setDifficulty('random'))} />
      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  gameContainer: {
    justifyContent: 'center',
  },
  box: (row, col) => {
    return {
      width: boxSize,
      height: boxSize,
      flexDirection: 'column',
      justifyContent: 'center',
      borderTopWidth: row == 0 ? 3 : 1,
      borderRightWidth: (col == 8 || ((col + 1) % 3) == 0) ? 3 : 1,
      borderBottomWidth: (row == 8 || ((row + 1) % 3) == 0) ? 3 : 1,
      borderLeftWidth: col == 0 ? 3 : 1,
      borderColor: "#000",
    }
  },
  board: {
    backgroundColor: '#fff',
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#000',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 8
  },
  difficulty: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  difficultyLabel: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50
  }
});