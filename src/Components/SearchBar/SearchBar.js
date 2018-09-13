import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    }
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }

  search() {
    this.props.onSearch(this.state.searchTerm)
  }

  handleTermChange(event) {
    this.setState({
      searchTerm: event.target.value
    })
  }

  handleKeyEvent(event) {
    if(event.keyCode === 13) {
      console.log("enter is pressed!")
      this.props.onSearch(this.state.searchTerm)
    }
  }

  render() {
    return (
      <div className="SearchBar">
        <input onKeyUp={this.handleKeyEvent} onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={this.search}>SEARCH</a>
      </div>
    );
  }
}

export default SearchBar;
