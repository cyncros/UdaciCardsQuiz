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
import { fetchDecks } from "../actions";
import { getDecks } from "../utils/api";

import { h1, Card, ListItem, Button, Icon } from "react-native-elements";

class DeckList extends Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const data = await getDecks();
    dispatch(fetchDecks(JSON.parse(data)));
  }
  handledEvent = title => {
    this.props.navigation.navigate("Deck", { title });
  };

  render() {
    //no DECKS found
    if (this.props.deck === null) {
      return (
        <View style={styles.center}>
          <Icon name="emoji-sad" type="entypo" color="purple" size={75} />
          <Text style={styles.textStyle}>
            {" "}
            Theres no DECK currently available{" "}
          </Text>
          <Text style={styles.textStyle}> Add one PLZ</Text>
        </View>
      );
    }
    const url = "http://lorempixel.com/400/200/";
    const infos = this.props.deck;
    console.log(infos, "INFO");
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.titleText}> DECKS ! ! ! </Text>
        {Object.keys(infos).map(i => {
          const { title, questions, ...rest } = infos[i];
          return (
            <Card
              containerStyle={{ padding: 5 }}
              key={i}
              title={title}
              image={{ uri: url }}
              featuredTitle={`${questions.length} Cards`}
            >
              <Button
                raised
                large
                buttonStyle={{ backgroundColor: "purple", borderRadius: 20 }}
                icon={{
                  name: "broadcast",
                  type: "octicon"
                }}
                title={`${title} - Deck`}
                onPress={() => this.handledEvent(title)}
              />
            </Card>
          );
        })}
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#F8F8F8"
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
    marginLeft: 30
  },
  textStyle: {
    fontSize: 24,
    textAlign: "center"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default connect(state => state)(DeckList);