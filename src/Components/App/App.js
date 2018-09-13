import React from 'react';

import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    let playListTracks = this.state.playlistTracks;
    let playListTrackIds = playListTracks.map(t => t.id);
    if(!playListTrackIds.includes(track.id)) {
      playListTracks.push(track);
      this.setState({
        playlistTracks: playListTracks
      });
    }
  }

  removeTrack(track) {
    let filteredTracks = this.state.playlistTracks.filter(t => t.id !== track.id);
    this.setState({
      playlistTracks: filteredTracks
    })
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(playlistName, playlistTracks) {
    if(this.state.playlistTracks.length > 0) {
        let trackUriArray = this.state.playlistTracks.map(track => track.uri);
        Spotify.savePlaylist(playlistName, trackUriArray).then(() => {
          this.setState(
            {
              playlistName: 'New Playlist',
              playlistTracks: []
            })
        })
    }
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(results => {
      this.setState({
        searchResults: results
      })
    })
  }

  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
              <SearchBar
                onSearch={this.search}
              />
              <div className="App-playlist">

                <SearchResults
                  onAdd={this.addTrack}
                  searchResults={this.state.searchResults}
                />

                <Playlist
                  playlistName={this.state.playlistName}
                  playlistTracks={this.state.playlistTracks}
                  onRemove={this.removeTrack}
                  onNameChange={this.updatePlaylistName}
                  onSave={this.savePlaylist}
                />

              </div>
          </div>
      </div>
    );
  }
}

export default App;
