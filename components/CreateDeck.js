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
import { connect } from "react-redux";
import {
  h1,
  Card,
  ListItem,
  Button,
  FormLabel,
  FormInput,
  FormValidationMessage
} from "react-native-elements";
import { addDeck } from "../actions";
import { saveDeckTitle } from "../utils/api";

class CreateDeck extends Component {
  state = {
    title: "",
    validate: false
  };
  componentWillUnmount() {
    this.setState({ title: "", validate: false });
    this.FormInput.clearText();
  }

  addDeck = () => {
    const { title } = this.state;
    if (title.length > 0) {
      this.props.dispatch(addDeck(title));
      this.props.navigation.navigate("Deck", { title });
      saveDeckTitle(title);
      this.setState({ title: "", validate: false });
    } else {
      this.setState({ validate: true });
    }
  };

  render() {
    const url = "http://lorempixel.com/400/200/";

    return (
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Card
            style={styles.card}
            containerStyle={{ padding: 10 }}
            image={{ uri: url }}
            featuredTitle={"New DECK TITLE"}
          >
            <FormInput
              placeholder="Deck Title"
              onChangeText={title => this.setState({ title })}
              value={this.state.title}
              shake={this.state.validate}
            />
            {this.state.validate && (
              <FormValidationMessage>Deck Title Required</FormValidationMessage>
            )}
            <Button
              raised
              large
              onPress={this.addDeck}
              buttonStyle={{
                backgroundColor: "green",
                borderRadius: 20,
                margin: 20
              }}
              icon={{
                name: "diff",
                type: "octicon"
              }}
              title="Submit ! ! "
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
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F8F8F8"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center"
  }
});
export default connect()(CreateDeck);
