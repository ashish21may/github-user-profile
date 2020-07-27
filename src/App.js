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

  // Currently We are handling multiple changes in drop-down via
  // Session storage. And it handles most of the cases except two cases.
  // To-Do Item: Below 2 cases
  // 1. When one filter is selected and other is made all from some other value.
  // 2. When updatedRepos/ currentrepo becomes empty and we make more selections.

  // Above two cases have arisen because I have added aditional functionality 
  // As I am working with 2 select dropdowns but example only had one functioning drop-down.

  async componentDidMount () {
    const userResponse = await axios.get(
      'https://api.github.com/users/supreetsingh247'
    )
    const userRepos = await axios.get(
      'https://api.github.com/users/supreetsingh247/repos'
    )
    sessionStorage.removeItem('repos');
    sessionStorage.removeItem('currentRepos');
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
    const repos = JSON.parse(sessionStorage.getItem('repos'))
    const updatedRepos = repos.filter(repo =>
      repo.name.toLowerCase().includes(searchValue)
    )

    this.setState({
      repos: updatedRepos
    })
  }

  handleType = selectedType => {
    const repos = JSON.parse(sessionStorage.getItem('repos'))
    const currentRepos = JSON.parse(sessionStorage.getItem('currentRepos'))
    if (selectedType === 'all') {
      this.setState({
        repos
      })
    } else {
      const updatedRepos = currentRepos
        ? currentRepos.filter(repo => repo[selectedType])
        : repos.filter(repo => repo[selectedType])
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

  handleLanguage = language => {
    const repos = JSON.parse(sessionStorage.getItem('repos'))
    const currentRepos = JSON.parse(sessionStorage.getItem('currentRepos'))
    if (language === 'all') {
      this.setState({
        repos
      })
    } else {
      const updatedRepos = currentRepos
        ? currentRepos.filter(repo => repo.language === language)
        : repos.filter(repo => repo.language === language)
      // console.log('Language: ', language, 'UpdatedRepos : ', updatedRepos)
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
    console.log(JSON.parse(sessionStorage.getItem('repos')))
  }

  render () {
    const { repos, user } = this.state
    return (
      <div className='App'>
        <Bio user={user} />
        <div>
          <Filter
            type={this.handleType}
            language={this.handleLanguage}
            search={this.handleSearch}
          />
          <Repos repos={repos} />
        </div>
      </div>
    )
  }
}

export default App
