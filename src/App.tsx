import 'reflect-metadata';
import { createConnection } from "typeorm";
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { User } from './entities/User';
import { Car } from './entities/Car';

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
        User, Car
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

    try {
      // connect to db
      await this.connect();

      // first car
      const car1 = new Car();
      car1.brand = 'Audi';
      car1.model = 'R8';
      car1.year = 2014;
      await car1.save();

      // second car
      const car2 = new Car();
      car2.brand = 'Mercedes-AMG';
      car2.model = 'CLS 63 AMG';
      car2.year = 2015;
      await car2.save();

      //create a user
      const user = new User();
      user.firstName = "Timber";
      user.lastName = "Saw";
      user.age = 25;
      user.cars = [car1, car2];
      await user.save();

      // desplay the data
      const allUsers = await User.find({ relations: ["cars"] });
      console.warn('allUsers', allUsers);
      const allCars = await Car.find();

      for (let i = 0; i < allCars.length; i++) {
        await allCars[i].remove();
      }

      for (let i = 0; i < allUsers.length; i++) {
        await allUsers[i].remove();
      }
    } catch (err) {
      console.error(err);
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