import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView
} from "react-native";
import {
  h1,
  Card,
  ListItem,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";

export default class SingleCard extends Component {
  state = {
    show: false
  };
  answer = () => {
    this.setState({ show: !this.state.show });
  };

  render() {
    console.log(this.props.card, "card Q&A");
    //Answer ON!!
    if (this.state.show) {
      return (
        <View style={styles.container}>
          <Text style={styles.titleText}>Answer is...</Text>
          <Text style={styles.textStyle}>{this.props.card.card.answer}</Text>
          <View style={styles.btnRow}>
            <Button
              raised
              onPress={() => {
                this.answer();
                this.props.handleAnswer(true);
              }}
              large
              buttonStyle={styles.btnCorrect}
              icon={{
                name: "check",
                type: "octicon"
              }}
              title="Correct!!"
            />
            <Button
              raised
              onPress={() => {
                this.answer();
                this.props.handleAnswer(false);
              }}
              large
              buttonStyle={styles.btnError}
              icon={{
                name: "check",
                type: "octicon"
              }}
              title="Incorrect!!"
            />
          </View>
        </View>
      );
    }
    //Question ON!!
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Questions...</Text>
        <Text style={styles.textStyle}> {this.props.card.card.question}</Text>

        <Button
          raised
          onPress={() => this.answer()}
          large
          buttonStyle={styles.btnStyles}
          icon={{
            name: "briefcase",
            type: "octicon"
          }}
          title="Show Answer!!"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F8F8F8"
  },
  textStyle: {
    fontSize: 24,
    textAlign: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnRow: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  },
  btnStyles: {
    backgroundColor: "#3399ff",
    borderRadius: 20,
    margin: 10
  },
  btnCorrect: {
    backgroundColor: "#33cc33",
    borderRadius: 20,
    margin: 10
  },
  btnError: {
    backgroundColor: "#ff0000",
    borderRadius: 20,
    margin: 10
  }
});
