import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
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
import { connect } from "react-redux";
import { addCard } from "../actions";
import { addCardToDeck } from "../utils/api";

class AddCard extends Component {
  state = {
    question: "",
    answer: "",
    validate: false
  };

  addCard = () => {
    const deckId = this.props.navigation.state.params.title;
    const { question, answer } = this.state;
    if (question.length && answer.length > 0) {
      addCardToDeck(deckId, { card: { question, answer } });
      this.props.dispatch(addCard(deckId, { question, answer }));
      this.props.navigation.goBack();

      this.setState({ question: "", answer: "", validate: false });
    } else {
      this.setState({ validate: true });
    }
  };
  render() {
    const url = "http://lorempixel.com/400/200/";
    const { deckId } = this.props.navigation.state.params.title;
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Card
            containerStyle={{ padding: 10 }}
            image={{ uri: url }}
            featuredTitle={"Question & Answer "}
          >
            <FormInput
              placeholder="Question"
              onChangeText={question => this.setState({ question })}
              value={this.state.question}
              shake={this.state.validate}
            />
            {this.state.validate && (
              <FormValidationMessage>Question Required</FormValidationMessage>
            )}

            <FormInput
              placeholder="Answer"
              onChangeText={answer => this.setState({ answer })}
              value={this.state.answer}
              shake={this.state.validate}
            />
            {this.state.validate && (
              <FormValidationMessage>Answer Required</FormValidationMessage>
            )}
            <View style={styles.btnRow}>
              <Button
                raised
                onPress={() => this.addCard()}
                large
                buttonStyle={styles.btnStyles}
                icon={{
                  name: "diff",
                  type: "octicon"
                }}
                title="Submit ! ! "
              />
              <Button
                raised
                onPress={() => this.props.navigation.goBack()}
                large
                buttonStyle={styles.btnStyles2}
                rightIcon={{
                  name: "circle-slash",
                  type: "octicon"
                }}
                title="Cancel ! ! "
              />
            </View>
          </Card>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#F8F8F8"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnStyles: {
    backgroundColor: "green",
    borderRadius: 20,
    margin: 10
  },
  btnStyles2: {
    backgroundColor: "red",
    borderRadius: 20,
    margin: 10
  },
  btnRow: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  }
});
export default connect()(AddCard);
