import React, {Component, useEffect} from 'react';
import BookingCard from "../components/Card";
import CardGroup from 'react-bootstrap/CardGroup';

class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      bookings: []
    }
  }
  // componentDidMount = () => {
  //   if ("serviceWorker" in navigator) {
  //         window.addEventListener("load", function () {
  //           navigator.serviceWorker.register("/sw-offline.js").then(
  //             function (registration) {
  //               console.log(
  //                 "Service Worker registration successful with scope: ",
  //                 registration.scope
  //               );
  //             },
  //             function (err) {
  //               console.log("Service Worker registration failed: ", err);
  //             }
  //           );
  //         });
  //       }
  //     // this.props.findAll().then(bookings => this.setState({bookings: bookings}))
  //     }

  componentDidUpdate(){
    const bookings = JSON.parse(localStorage.getItem("bookings")) || []
    if ((bookings.length !== this.state.bookings.length) || (localStorage.getItem("updateBookings"))) {
      console.log('updating state')
      this.setState({bookings: bookings})
      localStorage.setItem("updateBookings", "")
      localStorage.setItem("updatePlayers", true)
    }
  }
    
  render() {
    return (
      <div className="p-0">
          <h1>Welcome to homepage</h1>
        <div className="py-3 text-white text-center w-100 bg-dark">
          <p>A PWA Web App built on Next.js</p>
        </div>
        <CardGroup>
        {Array.isArray(this.state.bookings) ? (this.state.bookings.map((b,index) => (
            <BookingCard players={b.players} index={index} key={b.bookingId} booking={b} pitchId={b.pitchId} startTime={b.startTime} playersCount={b.playersCount}/>
        ))):null}
        </CardGroup>
      </div>
    );
  }
}

export default Home;


// export default function Home(props) {
//   const [bookings, setBookings] = React.useState([])

//   console.log(props)
  // useEffect(() => {
  //   console.log("yooo")
  //   const getBookings = async () => {
  //     bookings = await props.findAll()
  //     setBookings(bookings)
  //   }
  //   getBookings().catch(console.error)
  //   console.log(bookings)
  // })
//   return (
//     <div className="p-0">
//            <h1>Welcome to homepage</h1>
//          <div className="py-3 text-white text-center w-100 bg-dark">
//            <p>A PWA Web App built on Next.js</p>
//          </div>
//          <CardGroup>
//          {Array.isArray(props.bookings) ? (props.bookings.map((b,index) => (
//             <BookingCard players={b.players} index={index} key={b.bookingId} booking={b} pitchId={b.pitchId} startTime={b.startTime} playersCount={b.playersCount}/>
//         ))):null}
//         </CardGroup>
//       </div>
//   )
// }