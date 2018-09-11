import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePlayListSave = this.handlePlayListSave.bind(this);
  }
  handleNameChange(event) {
    this.props.onNameChange(event.target.value)
  }
  handlePlayListSave(event) {
    let playlistName = this.props.playlistName;
    let playlistTracks = this.props.playlistTracks;
    if(playlistName && playlistTracks) {
        this.props.onSave(playlistName, playlistTracks);
    }
  }
  render() {
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={this.props.playlistName} value={this.props.playlistName}/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save" onClick={this.handlePlayListSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
