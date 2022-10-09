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
import { ToastContainer, toast } from 'react-toastify';
import * as moment from 'moment';

// addRxPlugin(RxDBDevModePlugin);
const dbName = 'payment-tracker';

class MyApp extends Component {

  constructor(props) {
    super(props);
    this.nukeDB = this.nukeDB.bind(this);
    this.upsert = this.upsert.bind(this);
    this.insert = this.insert.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateBooking = this.updateBooking.bind(this);
    this.state = {
      db: {},
      bookings: [],
      abz: {}
    };
  }
  
  async createDatabase() {
    if (_.isEmpty(this.state.db)){
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
        await this.setState({db: db})
        return db; 
      } catch (error) {
        console.error(error)
      }
    }
  }

  async componentDidMount() {
    if (_.isEmpty(this.state.db)){
      try {
          this.db = await this.createDatabase();
      } catch (error) {
        console.error(error)
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState)
  }
  updateBooking(bookings) {
    this.setState({bookings: bookings})
  }

  async insert({pitchId, startTime, playersCount}) {
    if (!(_.isEmpty(this.state.db))){
      console.log("inserting")
      try {
        const res = await this.state.db.bookings.insert({pitchId: pitchId,
          startTime: startTime,
          playersCount: playersCount})
        console.log(res)
        const listBookings = await this.findAll()
        await this.setState({bookings: listBookings})
        await this.setState({abz: listBookings})
        console.log(this.state.bookings)
      } catch (error) {
        console.error(error)
      }
    }
  }

  async findAll() {
    if (!(_.isEmpty(this.state.db))){
      try {
        const result = await this.state.db.bookings.find().exec()
        const bookings = []
        result.map(booking => {
          bookings.push({players:booking.players, playersCount: booking.playersCount, startTime: booking.startTime, pitchId: booking.pitchId, bookingId: booking.bookingId})
        })
        return bookings
      } catch (error) {
        console.error(error)
      }
    }
  }

  async nukeDB() {
    if (!(_.isEmpty(this.state.db))){
      try {
        await this.state.db.bookings.clear()
        await db.addCollections({
          bookings: {
            schema: Schema
          },
        });
      } catch (error) {
        console.error(error)
      }
      console.log("done")
    }
  }

  async upsert({pitchId, startTime, playersCount, players}){
    if (!(_.isEmpty(this.state.db))){
      console.log("upserting")
      try {
        const res = await this.state.db.bookings.upsert({pitchId: pitchId,
          startTime: startTime,
          playersCount: playersCount,
        players: players})
        console.log(res)
        const bookings = await this.findAll()
        console.log(bookings)
        await this.setState({bookings: bookings})
        console.log(this.state.bookings)
      } catch (error) {
        console.error(error)
      }
    }
  }

  render() {
    console.log(this)
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
        <Component {...pageProps} updateBooking = {this.updateBooking} upsert = {this.upsert} findAll = {this.findAll} insert = {this.insert}  rootState={this.state} bookings={this.state.bookings}/>
      </>
    );
  }
}

export default MyApp;
