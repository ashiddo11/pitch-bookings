import React, {Component, useEffect} from 'react';
import BookingCard from "../components/Card";
import CardGroup from 'react-bootstrap/CardGroup';

// class Home extends Component {
//   constructor(props){
//     super(props);
//   }
//   componentDidMount = () => {
//     console.log('yoooo')
//     if ("serviceWorker" in navigator) {
//           window.addEventListener("load", function () {
//             navigator.serviceWorker.register("/sw-offline.js").then(
//               function (registration) {
//                 console.log(
//                   "Service Worker registration successful with scope: ",
//                   registration.scope
//                 );
//               },
//               function (err) {
//                 console.log("Service Worker registration failed: ", err);
//               }
//             );
//           });
//         }
//       // this.props.findAll().then(bookings => this.setState({bookings: bookings}))
//       }
//   componentWillReceiveProps(nextProps) {
//     console.log(nextProps)
//     this.setState({bookings: nextProps.bookings });  
//   }
    
//   render() {
//     // if (Array.isArray(this.props.bookings)){
//     //   console.log(this.props.bookings)
//     // }
//     console.log(this.props)
//     return (
//       <div className="p-0">
//           <h1>Welcome to homepage</h1>
//         <div className="py-3 text-white text-center w-100 bg-dark">
//           <p>A PWA Web App built on Next.js</p>
//         </div>
//         <CardGroup>
//         {Array.isArray(this.props.bookings) ? (this.props.bookings.map((b,index) => (
//             <BookingCard players={b.players} index={index} key={b.bookingId} booking={b} pitchId={b.pitchId} startTime={b.startTime} playersCount={b.playersCount}/>
//         ))):null}
//         </CardGroup>
//       </div>
//     );
//   }
// }

// export default Home;


export default function Home(props) {
  const [bookings, setBookings] = React.useState([])

  console.log(props)
  // useEffect(() => {
  //   console.log("yooo")
  //   const getBookings = async () => {
  //     bookings = await props.findAll()
  //     setBookings(bookings)
  //   }
  //   getBookings().catch(console.error)
  //   console.log(bookings)
  // })
  return (
    <div className="p-0">
           <h1>Welcome to homepage</h1>
         <div className="py-3 text-white text-center w-100 bg-dark">
           <p>A PWA Web App built on Next.js</p>
         </div>
         <CardGroup>
         {Array.isArray(props.bookings) ? (props.bookings.map((b,index) => (
            <BookingCard players={b.players} index={index} key={b.bookingId} booking={b} pitchId={b.pitchId} startTime={b.startTime} playersCount={b.playersCount}/>
        ))):null}
        </CardGroup>
      </div>
  )
}