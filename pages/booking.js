import { useRouter } from "next/router";
import React, {useEffect} from "react";




export default function Booking(props) {
  const router = useRouter();
  const query = router.query;
  console.log(query)
  console.log(props)
  const [players, setPlayers] = React.useState({})
  


  useEffect(() => {
    console.log(props.bookings)
    if (props.bookings[query.index]) {
      console.log(props.bookings[query.index])
    }
    for (let i=0; i < Number(query.playersCount); i++){
      if (!players[i]) {
        setPlayers({
          ...players, [i]: {name: "", method: "", extra_notes: ""}
        })
      }
    }
    })
  function handleChange(evt) {
    const value = evt.target.value;
    console.log(evt.target)
    console.log(evt.target.getAttribute("data-type"))
    setPlayers({
      ...players, [evt.target.id]: {...players[evt.target.id], [evt.target.getAttribute("data-type")]: value}}
    )
    
    // for (let i=0; i < Number(query.playersCount); i++){
    //   if (players[i]) {
    //     setPlayers({
    //       [i]: {name: value},
    //     })
    //   }
    // }
  }


  return (
    <div style={{ padding: 40 }}>
      <h1>Pitch {query.pitchId} at {query.startTime} PM</h1>
      <h2>
        Player Count: {query.playersCount}
      </h2>
      <form>
        
          {Object.keys(players).map((key, index) => { 
            return(
              <div className="form-group mb-4 align-middle" style={{display: 'flex', flexDirection: 'row'}}>
                <input data-type="name" style={{width: "200px"}} key={"name"+key} type="text" className="mb-4 form-control" id={index} placeholder="Name" value={players[key].name}
              onChange={handleChange}
              />
              <select data-type="method" key={"method"+key} id={index} className="form-select mb-4 " style={{width: "180px"}} value={players[key].method}
                onChange={handleChange}>
                  <option selected>Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
            )
            }
          )}
          
        <button onClick={() => {
          query.players = players
          console.log(query)
          props.upsert({...query})
          // props.upsert({pitchId: query.pitchId, playersCount: query.playersCount, startTime: query.startTime, players:players})
          console.log(players)
          router.push("/")}} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}