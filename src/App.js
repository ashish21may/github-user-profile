import React, { Component } from 'react'
import axios from 'axios'
import Bio from './components/Bio'
import Filter from './components/Filter'

import './App.css'
import Repos from './components/repos/Repos'

class App extends Component {
  state = {
    user: {},
    repos: []
  }

  async componentDidMount () {
    const userResponse = await axios.get(
      'https://api.github.com/users/supreetsingh247'
    )
    const userRepos = await axios.get(
      'https://api.github.com/users/supreetsingh247/repos'
    )
    // Claring Session Storage to display fresh page on refresh
    sessionStorage.removeItem('repos')
    sessionStorage.removeItem('currentRepos')
    this.setState(
      {
        user: userResponse.data,
        repos: userRepos.data
      },
      () => this.storeRepos()
    )
  }

  handleSearch = searchValue => {
    console.log('Searched value: ', searchValue)
    const repos = JSON.parse(sessionStorage.getItem('currentRepos'))
    const updatedRepos = repos.filter(repo =>
      repo.name.toLowerCase().includes(searchValue.toLowerCase())
    )

    this.setState({
      repos: updatedRepos
    })
  }

  handleSelection = (selectedType, language) => {
    const repos = JSON.parse(sessionStorage.getItem('repos'))
    if (selectedType === 'all' && language === 'all') {
      this.setState({
        repos
      })
    } else {
      let updatedRepos =
        selectedType !== 'all'
          ? repos.filter(repo => repo[selectedType])
          : repos
      updatedRepos =
        language !== 'all'
          ? updatedRepos.filter(repo => repo.language === language)
          : updatedRepos
      this.setState(
        {
          repos: updatedRepos
        },
        () =>
          sessionStorage.setItem(
            'currentRepos',
            JSON.stringify(this.state.repos)
          )
      )
    }
  }

  storeRepos = () => {
    sessionStorage.setItem('repos', JSON.stringify(this.state.repos))
    sessionStorage.setItem('currentRepos', JSON.stringify(this.state.repos))
  }

  render () {
    const { repos, user } = this.state
    return (
      <div className='App'>
        <Bio user={user} />
        <div>
          <Filter
            type={this.handleSelection}
            language={this.handleSelection}
            search={this.handleSearch}
          />
          <Repos repos={repos} />
        </div>
      </div>
    )
  }
}

export default App
