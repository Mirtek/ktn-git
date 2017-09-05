
import React from 'react';

const RepoItem = ({gif, onGifSelect}) => {
  return (
    <div className="gif-item" onClick={() => onGifSelect(gif)}>
      <p>Repository: {gif.name}</p>
      <p>Desc: {gif.description}</p>    
      <p>Is a fork? {JSON.stringify(gif.fork)}</p>    
      <p>Stars: {gif.stargazers_count}</p>    
      <p>Last updated: {gif.updated_at}</p>
      <p>Langueage: {gif.language}</p>
      <p>Issues: {gif.open_issues_count}</p>

    </div>
  )
};

export default RepoItem;