import React from 'react';
import Button from '../Button/Button';

export default class MoreComplexComponent extends React.Component {
    state = {
        value: ''
    }

    handleValue = (event) => {
        this.setState({ value: event.target.value })
    }

    clear = () => {
        this.setState({ value: '' })
    }

    render() {
        return (
        <React.Fragment>
            <input
                aria-label="input"
                className="input"
                type='text'
                onChange={this.handleValue}/>
            <p aria-label="result" className="result">
                {this.state.value}
            </p>
            <Button onClick={this.clear}>Clear</Button>
        </React.Fragment>
        )
    }
}

