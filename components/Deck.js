import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { h1, Card, ListItem, Button } from "react-native-elements";

class Deck extends Component {
  newQuestion = title => {
    this.props.navigation.navigate("AddCard", {
      title
    });
  };

  takeQuiz = deckId => {
    this.props.navigation.navigate("Quiz", { deckId });
  };
  backDeckList=()=>{
    this.props.navigation.navigate("DeckList");
  }

  render() {
    const url = "http://lorempixel.com/400/200/";

    const { deck, navigation } = this.props;
    const deckId = deck[navigation.state.params.title];
    const numQuest = deckId.questions.length;

    return (
      <ScrollView style={styles.container}>
        <Card
          containerStyle={{ padding: 5 }}
          title={deckId.title}
          image={{ uri: url }}
          featuredTitle={deckId.title}
        >
          {numQuest > 0 ? (
            <View style={styles.center}>
              <Text style={styles.textStyle}>{`There are ${
                numQuest
              } questions on the Deck...`}</Text>
              <View style={styles.btnRow}>
                <Button
                  onPress={() => this.newQuestion(deckId.title)}
                  raised
                  large
                  buttonStyle={styles.btnStyles}
                  icon={{
                    name: "page-copy",
                    type: "foundation"
                  }}
                  title="Add Card"
                />
                <Button
                  onPress={() => this.takeQuiz(deckId)}
                  raised
                  large
                  buttonStyle={styles.btnStyles}
                  rightIcon={{
                    name: "page-search",
                    type: "foundation"
                  }}
                  title="Quiz ! ! !"
                />
              </View>
            </View>
          ) : (
            <View style={styles.center}>
              <Text
                style={styles.textStyle}
              >{`Theres no questions on the DECK lest Add SOME ! ! !`}</Text>
              <Button
                onPress={() => this.newQuestion(deckId.title)}
                raised
                large
                buttonStyle={styles.btnStyles}
                icon={{
                  name: "file-plus",
                  type: "feather"
                }}
                title="Add Card"
              />
            </View>
          )}
          <Button
            raised
            onPress={() => this.backDeckList()}
            large
            buttonStyle={styles.btnStyles}
            rightIcon={{
              name: "home",
              type: "octicon"
            }}
            title="Deck List"
          />
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
  center: {
    flex: 1,
    justifyContent: "center",
    marginRight: 30,
    marginLeft: 30
  },
  textStyle: {
    fontSize: 24,
    textAlign: "center",
    padding: 5
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  },
  btnStyles: {
    backgroundColor: "purple",
    borderRadius: 20,
    margin: 5
  },
  btnRow: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 10
  }
});
export default connect(state => state)(Deck);
