import React from 'react';
import axios from 'axios';

export const API_URL = "https://swapi.co/api"

export const Character = ({name, height}) => (
    <div>
        <p>{name}</p>
        <p>{height}</p>
    </div>
);

export default class StarWars extends React.Component {
    state = {
        id: null,
        result: null,
    }

    fetchCharacterById = async (id) => {
        const result = (
            id &&
            await axios.get(`${API_URL}/people/${id}/`)
                .catch(() => ({data: null}))
        );
        this.setState({...this.state, result: result && result.data})
    }

    handleValue = (event) => {
        this.setState({ id: event.target.value })
    }

    render() {
        if(!this.state.result){
            return (
                <React.Fragment>
                    <input
                        aria-label="input"
                        type="text"
                        onChange={this.handleValue}
                    />
                    <button
                        onClick={() => {this.fetchCharacterById(this.state.id)}}>
                            Go!
                    </button>
                </React.Fragment>
            );
        }
        else return <Character name={this.state.result.name} height={this.state.result.height} />
    }
}
