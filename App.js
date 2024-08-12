import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function App() {
  // Mapeamento de teclas
  const buttons = ['LIMPAR', 'DEL', '%', '/', 7, 8, 9, "x", 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '+/-', '='];

  const [currentNumber, setCurrentNumber] = useState("");
  const [lastNumber, setLastNumber] = useState("");

  function calculator() {
    const splitNumbers = currentNumber.split(' ');
    const firstNumber = parseFloat(splitNumbers[0]);
    const secondNumber = parseFloat(splitNumbers[2]);
    const operator = splitNumbers[1];

    // Faz ação referente à tecla pressionada
    switch (operator) {
      case '+':
        setCurrentNumber((firstNumber + secondNumber).toString());
        return;
      case '-':
        setCurrentNumber((firstNumber - secondNumber).toString());
        return;
      case 'x':
        setCurrentNumber((firstNumber * secondNumber).toString());
        return;
      case '/':
        setCurrentNumber((firstNumber / secondNumber).toString());
        return;
      case '+/-':
        if (currentNumber.includes(" ")) {
          const splitNumbers = currentNumber.split(' ');
          const lastEntry = splitNumbers.pop();
          const invertedNumber = (parseFloat(lastEntry) * -1).toString();
          setCurrentNumber(splitNumbers.join(' ') + ' ' + invertedNumber);
        } else {
          setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        }
        return;
      default:
        return;
    }
  }

  function handleInput(buttonPressed) {
    console.log(buttonPressed); // Mostra no Console a tecla pressionada
    if (buttonPressed === '+' || buttonPressed === "-" || buttonPressed === "x" || buttonPressed === "/") {
      setCurrentNumber(currentNumber + " " + buttonPressed + " ");
      return;
    }
    switch (buttonPressed) {
      case 'DEL':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        return;
      case 'LIMPAR': // Limpa todo o conteúdo
        setLastNumber("");
        setCurrentNumber("");
        return;
      case '=':
        setLastNumber(currentNumber + " = ");
        calculator();
        return;
      case '+/-':
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  return (
    <View style={styles.container}>

      {/* Área onde o resultado é exibido */}
      <View style={styles.results}>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      {/* Área onde os botões são exibidos */}
      <View style={styles.buttons}>
        {buttons.map((button) =>
          button === '=' ? // Mapeamento do botão =
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#2c033d' }]}>
              <Text style={[styles.textButton, { color: "white", fontSize: 30 }]}>{button}</Text>
            </TouchableOpacity>
            : // Mapeamento dos outros botões
            <TouchableOpacity onPress={() => handleInput(button)} key={button} style={[styles.button, { backgroundColor: '#44045e' }]}>
              <Text style={[styles.textButton, { color: typeof (button) === 'number' ? 'white' : 'gray' }]}>{button}</Text>
            </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  results: {
    flex: 2,
    justifyContent: "center",
    backgroundColor: "#2c033d", 
  },
  resultText: {
    color: "#E0E0E0", 
    fontSize: 32,
    fontWeight: "bold",
    padding: 12,
    textAlign: "right",
  },
  historyText: {
    color: "#757575", 
    fontSize: 20,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: "#121212",
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 90,
    minHeight: 90,
    flex: 2,
  },
  textButton: {
    color: "gray", 
    fontSize: 20,
  },
  textButtonNumber: {
    color: "white", 
    fontSize: 20,
  }
});
