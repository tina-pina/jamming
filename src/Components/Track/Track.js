import React from 'react';
import './Track.css';


class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction() {
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
      <div>
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.trackAction()}
      </div>
      <div>
        <audio controls>
          <source src={this.props.track.previewUrl} type="audio/ogg"/>
          <source src={this.props.track.previewUrl} type="audio/mpeg"/>
        Your browser does not support the audio element.
        </audio>
      </div>
      </div>
    );
  }
}

export default Track;
