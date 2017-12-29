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
      this.props.dispatch(addCard(deckId, { question, answer }));
      this.props.navigation.goBack();
      console.log(deckId,"id");
      addCardToDeck(deckId, {card:{ question, answer }});
      this.setState({ question: "", answer: "", validate: false });
    } else {
      this.setState({ validate: true });
    }
  };
  render() {
    const url = "http://lorempixel.com/400/200/";
    const { deckId } = this.props.navigation.state.params.title;
    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Card
            containerStyle={{ padding: 5 }}
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
              buttonStyle={styles.btnStyles}
              icon={{
                name: "circle-slash",
                type: "octicon"
              }}
              title="Cancel ! ! "
            />
          </Card>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  }
});
export default connect()(AddCard);
