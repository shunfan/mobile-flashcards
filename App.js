import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import AppStatusBar from './components/AppStatusBar';
import CardCreate from './components/CardCreate';
import DeckCreate from './components/DeckCreate';
import DeckList from './components/DeckList';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';
import { gray, tomato } from './utils/colors';
import { setLocalNotification } from './utils/api';

const Tabs = createBottomTabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name="cards-outline" size={30} color={tintColor} />,
      },
    },
    DeckCreate: {
      screen: DeckCreate,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => <MaterialIcons name="note-add" size={30} color={tintColor} />,
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: tomato,
      inactiveTintColor: gray,
    },
  },
);

const Stacks = createStackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null,
    },
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.deck.title}`,
    }),
  },
  CardCreate: {
    screen: CardCreate,
    navigationOptions: {
      title: 'Add Card',
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
    },
  },
});

export default class App extends Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppStatusBar backgroundColor={tomato} barStyle="light-content" />
        <Stacks />
      </View>
    );
  }
}
