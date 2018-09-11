import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction(isRemoval) {
    if(this.props.isRemoval){
      return '-';
    } else {
      return '+';
    }
  }
  addTrack() {
    this.props.onAdd(this.props.track)
  }
  removeTrack() {
    this.props.onRemove(this.props.track)
  }
  trackAction() {
    if(!this.props.isRemoval)
      return (<a className="Track-action" onClick={this.addTrack}>{this.renderAction()}</a>)
    else
      return (<a className="Track-action" onClick={this.removeTrack}>{this.renderAction()}</a>)
  }
  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.trackAction()}
      </div>
    );
  }
}

export default Track;
