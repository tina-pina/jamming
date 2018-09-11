import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
  render() {
      return (
        <div className="TrackList">
          {
            this.props.tracks.map(
              track =>
                <Track
                  key={track.id}
                  onAdd={this.props.onAdd}
                  onRemove={this.props.onRemove}
                  isRemoval={this.props.isRemoval}
                  key={track.id}
                  track={track}
                />
            )
          }
        </div>
      );
  }
}

export default TrackList;
