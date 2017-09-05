import React from 'react';

class FilterBar extends React.Component {
    constructor() {
        super();
        this.state = { term: '' }
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onTermChange(term);
    }

    render() {
        return (
            <div className="search">
                <label className={this.props.shouldHide ? 'hidden' : ''}>{this.props.barName}: </label>
                <input className={this.props.shouldHide ? 'hidden' : ''} id={this.props.barName} onChange={event => this.onInputChange(event.target.value)} />
            </div>
        );
    }
}

export default FilterBar;