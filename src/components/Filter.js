import React, { Component } from 'react'
import '../styles/Filter.css'

class Filter extends Component {
  state = {
    searchValue: '',
    selectedType: 'all',
    selectedlanguage: 'all'

  }
  handleInputChange = (e) => {
    this.setState({
      searchValue: e.target.value
    }, () => this.props.search(this.state.searchValue))
  }

  handleTypeChange = (e) => {
    this.setState({
      selectedType: e.target.value
    }, () => this.props.type(this.state.selectedType))
  }

  handleLanguageChange = (e) => {
    this.setState({
      selectedlanguage: e.target.value
    }, () => this.props.language(this.state.selectedlanguage))
  }

  render () {
    const { searchValue, selectedType, selectedlanguage } = this.state
    return (
      <div className='filter'>
        <input
          className='search'
          value={searchValue}
          onChange={this.handleInputChange}
          placeholder='Repo Name ...'
        />
        <div className='select'>
          <select value={selectedType} onChange={this.handleTypeChange}>
            <option value='all'>All</option>
            <option value='forks'>Forks</option>
          </select>
          <select value={selectedlanguage} onChange={this.handleLanguageChange}>
            <option value='all'>All</option>
            <option value='JavaScript'>Javascript</option>
            <option value='CSS'>CSS</option>
            <option value='HTML'>HTML</option>
          </select>
        </div>
      </div>
    )
  }
}

export default Filter
