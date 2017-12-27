import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import reducer from "./reducers";
import DeckList from "./components/DecksList";
import CreateDeck from "./components/CreateDeck";
import Deck from "./components/Deck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz"
import { Constants } from "expo";

const store = createStore(reducer);

function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    History: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Deck List",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="folder" size={30} color={tintColor} />
        )
      }
    },
    CreateDeck: {
      screen: CreateDeck,
      navigationOptions: {
        tabBarLabel: "Add Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="folder-open" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? "purple" : "white",
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? "white" : "purple",
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      title: "HOME"
    }
  },
  DeckList: {
    screen: DeckList
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      title: "Deck"
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: "Add new Question..."
    }
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: "Quiz ! ! !"
    }
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar backgroundColor={"purple"} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
