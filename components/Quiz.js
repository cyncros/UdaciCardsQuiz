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

export default class App extends React.Component {
  render() {
    const users = [
        {
          name: "brynn",
          avatar: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"
        }
      ],
      url = "http://lorempixel.com/400/200/";

    return (
      <View style={styles.container}>
        {users.map((u, i) => {
          return (
            <Card
              containerStyle={{ padding: 5 }}
              key={i}

              image={{ uri: url }}
              featuredTitle={"New DECK TITLE"}
            >
              <FormLabel>Question</FormLabel>
              <FormInput/>
              <FormValidationMessage>Error message</FormValidationMessage>
              <FormLabel>Answer</FormLabel>
              <FormInput/>
              <FormValidationMessage>Error message</FormValidationMessage>
              <Button
                raised
                large
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
          );
        })}
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
  }
});
