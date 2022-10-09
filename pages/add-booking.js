import React, {Component} from 'react';
import { useHistory } from 'react-router-dom';

class AddBooking extends Component {

  constructor(props){
    super(props);
    this.state = {
      pitchId: '',
      startTime: '',
      playersCount: ''
    }
    this.handleChangePitchId = this.handleChangePitchId.bind(this);
    this.handleChangePlayersCount = this.handleChangePlayersCount.bind(this);
    this.handleChangeStartTime = this.handleChangeStartTime.bind(this);
  }

  handleChangePitchId(event) {
    this.setState({pitchId: event.target.value});
  }
  handleChangeStartTime(event) {
    this.setState({startTime: event.target.value});
  }
  handleChangePlayersCount(event) {
    this.setState({playersCount: event.target.value});
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Pitch #</label>
          <select className="form-select" aria-label="Default select example" value={this.state.pitchId}
          onChange={this.handleChangePitchId}>
            <option selected>Select Pitch</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="3">4</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="playersCount">Number of Players</label>
          <input type="text" className="form-control" id="playersCount" placeholder="Number of Players" value={this.state.playersCount}
          onChange={this.handleChangePlayersCount}/>
        </div>
        <div className="form-group">
          <label htmlFor="startTime">Time game starts</label>
          <input type="text" className="form-control" id="startTime" placeholder="Time game starts" value={this.state.startTime}
          onChange={this.handleChangeStartTime}/>
        </div>
        <button onClick={async() => this.props.insert({
          pitchId: this.state.pitchId, 
          startTime: this.state.startTime, 
          playersCount: this.state.playersCount}
          )} type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
}

export default AddBooking