import React, { Component } from 'react'
import '../styles/Bio.css'

class Bio extends Component {
  render () {
    const {
      avatar_url,
      name,
      location,
      bio,
      company,
      login,
      followers,
      following
    } = this.props.user
    return (
      <div className='bio'>
        <img src={avatar_url} className='round-image' alt='user' />
        <div>
          <strong>{name}</strong>
        </div>
        <div>{login}</div>
        <p>{bio}</p>
        <button className='button'>Follow</button>
        <div className='follower-container'>
          <div>Followers: {followers}</div>
          <div>Following: {following}</div>
        </div>
        <div>{company}</div>
        <div>{location}</div>
      </div>
    )
  }
}

export default Bio
