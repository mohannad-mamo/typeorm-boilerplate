/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */
import 'reflect-metadata';
import { createConnection } from "typeorm";
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { User } from './src/entities/User';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component<any, any> {
  connect() {
    return createConnection({
      type: 'react-native',
      database: 'test',
      location: 'default',
      logging: ['error', 'query', 'schema'],
      synchronize: true,
      entities: [
          User
      ]
    });
  }

  errorCB(err: any) {
    console.warn("SQL Error: " + err);
  }

  successCB() {
    console.warn("SQL executed fine");
  }

  async componentDidMount() {
    // SQLite.openDatabase({name: 'my.db', location: 'Library'}, this.successCB, this.errorCB);
    await this.connect();
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await user.save();

    const allUsers = await User.find();
    console.warn('allUsers', allUsers);
    const firstUser = await User.findOne(1);
    const timber = await User.findOne({ firstName: "Timber", lastName: "Saw" });

    if (timber) {
      await timber.remove();
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});