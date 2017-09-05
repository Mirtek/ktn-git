import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'react-button';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import RepoModal from './components/RepoModal';
import RepoList from './components/RepoList';
import request from 'superagent';

import './styles/app.css';
import "react-datepicker/dist/react-datepicker.min.css";

class App extends React.Component {
    constructor() {
        super();

        this.state = {
            gifs: [],
            selectedGif: null,
            repos: [],
            modalIsOpen: false,
            shouldHide: true,
            issuesFilter: 0,
            topicsFilter: 0,
            stargazersFilter: 0,
            updatedAt: 0
        }
    }

    openModal(gif) {
        this.setState({
            modalIsOpen: true,
            selectedGif: gif
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            selectedGif: null
        });
    }

    handleTermChange = (term) => {

        const repos_url = `https://api.github.com/users/${term.replace(/\s/g, '+')}/repos`;


        request  
          .get(repos_url)
          .accept('application/vnd.github.mercy-preview+json.')
          .end((err, res) => {
            console.log('Hello');
            console.log(res.body);
            this.setState({ repos: res.body })
          });
    };

    handleIssuesFilter = (term) => {
        this.setState( { issuesFilter: term } );
    }; 

    handleTopicsFilter = (term) => {
        this.setState( { topicsFilter: term } );
    }; 

    handleTopicsFilter = (term) => {
        this.setState( { stargazersFilter: term } );
    }; 

    handleDateFilter = (term) => {
        this.setState( { updatedAt : term } );
    }

    hideShowFilters = () => {
        this.state.shouldHide ? this.setState({ shouldHide : false }) : 
                                this.setState({ shouldHide : true })  
    };

    render() {
      let repos = this.state.repos.slice();
      if(this.state.issuesFilter) {
      repos = repos.filter(item => item.open_issues >= this.state.issuesFilter);
    }
      if(this.state.topicsFilter) {
      repos = repos.filter(item => item.topics.length >= this.state.topicsFilter);
    }
      if(this.state.stargazersFilter) {
      repos = repos.filter(item => item.stargazers_count >= this.state.stargazersFilter);
    }
      if(this.state.updatedAt) {
      repos = repos.filter(item => Date.parse(item.updated_at) >= this.state.updatedAt.toDate());
    }

        return (
         <div>
          <SearchBar onTermChange={this.handleTermChange} />
          <div>          
            <FilterBar shouldHide={this.state.shouldHide} barName="Issues" onTermChange={this.handleIssuesFilter} />
            <FilterBar shouldHide={this.state.shouldHide} barName="Topics" onTermChange={this.handleTopicsFilter} />
            <FilterBar shouldHide={this.state.shouldHide} barName="Stars" onTermChange={this.handleTopicsFilter} />
            <label className={this.state.shouldHide ? 'hidden' : ''}>Updated at: </label>
            <DatePicker className={this.state.shouldHide ? 'hidden' : ''} 
            selected={this.state.updatedAt} withPortal onChange={this.handleDateFilter} />
          </div>
          <Button onClick={this.hideShowFilters} >Hide/Show Filters</Button>

          <RepoList  gifs={repos} 
                     onGifSelect={selectedGif => this.openModal(selectedGif) }
          />
 
          {/*
 <RepoModal modalIsOpen={this.state.modalIsOpen}
                     selectedGif={this.state.selectedGif}
                     onRequestClose={ () => this.closeModal() } />
            */}
         
         
         </div>
         );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));