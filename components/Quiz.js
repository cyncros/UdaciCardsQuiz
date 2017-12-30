import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
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
import SingleCard from "../components/SingleCard";
import {
  clearLocalNotification,
  setLocalNotification
} from "../utils/Notifications";

class Quiz extends Component {
  state = {
    index: 0,
    score: 0,
    finish: false
  };
  handleAnswer = correct => {
    const deckId = this.props.navigation.state.params.deckId.title;
    const questions = this.props.deck[deckId].questions;
    let { index, score, finish } = this.state;

    score = correct ? score + 1 : score;
    index++;
    finish = index === questions.length;
    this.setState({ index, score, finish });

    if (finish) {
      clearLocalNotification().then(setLocalNotification);
    }
  };

  startOver = () => {
    this.setState({ index: 0, score: 0, finish: false });
  };

  backDeck = () => {
    this.props.navigation.goBack();
  };

  render() {
    const url = "http://lorempixel.com/400/200/";
    const info = this.props.navigation.state.params.deckId.title;

    let { index, score, finish } = this.state;
    let quest = this.props.deck[info].questions;

    if (finish) {
      return (
        <ScrollView style={styles.container}>
          <Card
            title={` Final Score:${score / quest.length * 100} % `}
            image={{ uri: url }}
            featuredTitle={`Number of questions ${quest.length}`}
          >
            <View style={styles.btnRow}>
            <Button
              raised
              onPress={() => this.startOver()}
              large
              buttonStyle={styles.btnStyles}
              icon={{
                name: "file-symlink-file",
                type: "octicon"
              }}
              title="Re-Start"
            />
            <Button
              raised
              onPress={() => this.backDeck()}
              large
              buttonStyle={styles.btnStyles}
              rightIcon={{
                name: "file-code",
                type: "octicon"
              }}
              title="Back"
            />
          </View>
          </Card>
        </ScrollView>
      );
    }

    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle={{ padding: 5 }}
          title={`${info} Deck - Quiz  `}
          image={{ uri: url }}
          featuredTitle={`Remaining Questions ${quest.length - index}`}
          featuredSubtitle={`Answered questions ${score} `}
        >
          <SingleCard card={quest[index]} handleAnswer={this.handleAnswer} />
        </Card>
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
  centerbtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding:10
  }
});
export default connect(state => state)(Quiz);
