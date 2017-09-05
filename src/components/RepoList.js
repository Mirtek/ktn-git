import React from 'react';
import RepoItem from './RepoItem';

const RepoList = (props) => {
  const gifItems = props.gifs.map((repo) => {
    return <RepoItem key={repo.id} 
                    gif={repo} 
                    onGifSelect={props.onGifSelect} />
  });

  return (
    <div className="gif-list">{gifItems}</div>
  );
};

export default RepoList;