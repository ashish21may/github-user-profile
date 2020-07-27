import React from 'react'
import PropTypes from 'prop-types'

import '../../styles/RepoItem.css'

const RepoItem = ({ repo }) => {
  return (
    <div className='repo-item'>
      <div className='stats-container'>
        <h1>
          <a href={repo.html_url}>{repo.name}</a>
        </h1>
        <p className='repo-desc'>{repo.description}</p>
        <div className='repo-stats'>
          {repo.language && <span>Language: {repo.language}</span>}
          {repo.forks > 0 && <span>Forks: {repo.forks}</span>}
          {repo.license && <span>License: {repo.license.name}</span>}
          {repo.updated_at && (
            <span>Last Updated at: {new Date(repo.updated_at).toLocaleString()} </span>
          )}
        </div>
      </div>
      <div className='button-container'>
        <button className='button' style={{ width: '100px' }}>
          {' '}
          Star{' '}
        </button>
      </div>
    </div>
  )
}

RepoItem.propTypes = {
  repos: PropTypes.array.isRequired
}

export default RepoItem
