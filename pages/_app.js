import Head from "next/head";
import Script from "next/script";
import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import '../styles/globals.css'
import { Schema } from '../utils/schema';
import { createRxDatabase, addRxPlugin, isRxDatabase, throwIfIsStorageWriteError } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/dexie';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
const _ = require('lodash'); 
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// addRxPlugin(RxDBDevModePlugin);
const dbName = 'payment-tracker';

class MyApp extends Component {

  constructor(props) {
    super(props);
    this.nukeDB = this.nukeDB.bind(this);
    this.upsert = this.upsert.bind(this);
    this.insert = this.insert.bind(this);
    this.findAll = this.findAll.bind(this);
    this.handleBookingsChange = this.handleBookingsChange.bind(this);
    this.state = {
      db: {},
      bookings: [],
    };
  }
  
  async createDatabase() {
    // if (_.isEmpty(this.state.db)){
    try {
      const db = await createRxDatabase({
        name: dbName,
        storage: getRxStorageDexie()
      });
      await db.addCollections({
        bookings: {
          schema: Schema
        },
      });
      console.log("created")
      // this.setState({db: db})
      return db; 
    } catch (error) {
      console.error(error)
    }
    // }
  }

  async componentDidMount() {
    // if (_.isEmpty(this.state.db)){
    // if (!this.db) {
    try {
        this.db = await this.createDatabase();
    } catch (error) {
      console.error(error)
    }
    // }
  }

  // componentDidUpdate() {
  //   console.log(localStorage.getItem("bookings"))
  // }

  handleBookingsChange(b) {
    this.setState({bookings: b})
  }

  async insert({pitchId, startTime, playersCount}) {
    // if (!(_.isEmpty(this.state.db))){
    console.log("inserting")
    try {
      const res = await this.db.bookings.insert({pitchId: pitchId,
        startTime: startTime,
        playersCount: playersCount})
      console.log(res)
      // Notify.success('Sol lucet omnibus');
    } catch (error) {
      console.error(error)
    }
    // }
  }

  async findAll() {
    console.log('find')
    // if (!(_.isEmpty(this.state.db))){
    try {
      const result = await this.db.bookings.find().exec()
      const bookings = []
      result.map(booking => {
        bookings.push({total: booking.total, players: booking.players, playersCount: booking.playersCount, startTime: booking.startTime, pitchId: booking.pitchId, bookingId: booking.bookingId})
      })
      console.log(bookings)
      this.setState({"bookings": bookings})
      return bookings
    } catch (error) {
      console.error(error)
    }
    // }
  }

  async nukeDB() {
    // if (!(_.isEmpty(this.state.db))){
    try {
      console.log("Doing")
      localStorage.setItem("bookings", "[]")
      localStorage.setItem("updateBookings", true)
      await this.db.remove()
      const db = await createRxDatabase({
        name: dbName,
        storage: getRxStorageDexie()
      });
      await db.addCollections({
        bookings: {
          schema: Schema
        },
      });
      this.db = db
    } catch (error) {
      console.error(error)
    }
    console.log("done")
    // }
  }

  async upsert({pitchId, startTime, playersCount, players}){
    // if (!(_.isEmpty(this.state.db))){
    console.log("upserting")
    try {
      const res = await this.db.bookings.upsert({pitchId: pitchId,
        startTime: startTime,
        playersCount: playersCount,
      players: players})
      console.log(res)
      const bookings = await this.findAll()
      localStorage.setItem("bookings", JSON.stringify(bookings))
    } catch (error) {
      console.error(error)
    }
    // }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
          />
          <link rel='manifest' href='/manifest.json' />
        </Head>

        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        <Navbar nukeDB = {this.nukeDB} state = {this.state} />
        <Component  bookings={this.state.bookings} onBookingsChange = {this.handleBookingsChange} upsert = {this.upsert} findAll = {this.findAll} insert = {this.insert}  rootState={this.state}/>
      </>
    );
  }
}

export default MyApp;
