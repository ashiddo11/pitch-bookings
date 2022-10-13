import { useRouter } from "next/router";
import React, {useEffect} from "react";




export default function Booking(props) {
  const router = useRouter();
  const query = router.query;
  const [players, setPlayers] = React.useState({})
  const [amountPaid, setAmountPaid] = React.useState(0)
  const [amountLeft, setAmountLeft] = React.useState(0)
  const [perPlayer, setPerPlayer] = React.useState((Number(query.total) / Number(query.playersCount)).toFixed(2))

  useEffect(() => {
    if (amountLeft === 0) {
      setAmountLeft(JSON.parse(localStorage.getItem("bookings"))[query.index].total)
    }
    if (Object.keys(players).length < query.playersCount) {
      for (let i=0; i < Number(query.playersCount); i++){
        if (!players[i]) {
          setPlayers({
            ...players, [i]: {name: "", method: "", extra_notes: "", canMark: false}
          })
        }
      }
    } else {
      const storagePlayers = JSON.parse(localStorage.getItem("bookings"))[query.index].players
      console.log(players, storagePlayers)
      if (localStorage.getItem("updatePlayers")) {
        setPlayers(storagePlayers)
        localStorage.setItem("updatePlayers", "")
      }
    } 
    })
  function handleChange(evt) {
    const value = evt.target.value;
    console.log(evt.target)
    console.log(evt.target.getAttribute("data-type"))
    if (evt.target.getAttribute("data-type") === "amountPaid") {
      setPlayers({
        ...players, [evt.target.id]: {...players[evt.target.id], canMark: !_.isEmpty(value), amountPaid: value}}
      )
    } else if (evt.target.getAttribute("data-type") === "paid") {
      setPlayers({
        ...players, [evt.target.id]: {...players[evt.target.id], paid: evt.target.checked}}
      )
    } else {
      setPlayers({
        ...players, [evt.target.id]: {...players[evt.target.id], [evt.target.getAttribute("data-type")]: value}}
      )
    }
  }


  return (
    <div style={{ padding: 40 }}>
      <h1>Pitch {query.pitchId} at {query.startTime} PM</h1>
      <h2>
        Player Count: {query.playersCount}
      </h2>
      <h2>Total Amount: {query.total}</h2>
      <h3>Total left: {amountLeft}</h3>
      <h3>Total paid: {amountPaid}</h3>
      <h3>Amount per Player: {perPlayer} AED</h3>
      <button onClick={() => {
        let total = 0
        Object.keys(players).map(key => {
          if (players[key].amountPaid){
            total = (total + Number(players[key].amountPaid))
          }
        })
        console.log(Number(query.total) - total)
        setAmountLeft(Number(query.total) - total)
        setAmountPaid(total)
      }} type="submit" className="btn btn-primary">Calculate</button>
      <form>
        
          {Object.keys(players).map((key, index) => { 
            return(
              <div key={index} className="form-group align-middle" style={{display: 'flex', flexDirection: 'row', marginBottom: '-30px'}}>
                <input data-type="name" style={{width: "150px", fontSize: "12px"}} key={"name"+key} type="text" className="mb-5 form-control" id={index} placeholder="Name" value={players[key].name}
              onChange={handleChange}
              />
              <input data-type="amountPaid" style={{width: "100px", fontSize: "12px"}} key={"amountPaid"+key} type="text" className="mb-5 form-control" id={index} placeholder="Amount Paid" value={players[key].amountPaid}
              onChange={handleChange}
              />
              <select data-type="method" key={"method"+key} id={index} className="form-select mb-5" style={{width: "150px", fontSize: "12px"}} value={players[key].method}
                onChange={handleChange}>
                  <option selected>Payment Method</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
                <input data-type="extraNotes" style={{width: "200px", fontSize: "12px"}} key={"extraNotes"+key} type="text" className="mb-5 form-control" id={index} placeholder="Extra Notes" value={players[key].extraNotes}
                onChange={handleChange}
                />
                <div className="form-check">
                <input id={index} className="form-check-input" type="checkbox" value=""  disabled={!players[key].canMark} checked={players[key].paid}
                data-type="paid" onChange={handleChange}/>
                <label className="form-check-label" forHtml="flexCheckDisabled">
                  Paid
                </label>
                </div>
              </div>
            )
            }
          )}
          
        <button onClick={() => {
          const { ['canMark']: canMark, ...playersPush } = players
          query.players = playersPush
          console.log(query)
          props.upsert({...query})
          // props.upsert({pitchId: query.pitchId, playersCount: query.playersCount, startTime: query.startTime, players:players})
          props.findAll().then(b => {
            localStorage.setItem("bookings", JSON.stringify(b))
          })
          console.log(playersPush)
          router.push("/")}} type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}