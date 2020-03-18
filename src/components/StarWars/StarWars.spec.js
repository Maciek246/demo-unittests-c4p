import React from 'react';
import StarWars, { API_URL } from './StarWars';
import { render, fireEvent, queryByLabelText, queryByText, wait } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


describe('StarWars component', () => {
    let mockAxios;

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
    });

    it('should be rendered', () => {
        const { queryByText, queryByLabelText } = render(<StarWars />);
        
        expect(queryByLabelText('input')).toBeInTheDocument();
        expect(queryByText('Go!')).toBeInTheDocument();
    });

    describe('should fetch data from API', () => {
        let containerComponent;
        let input;
        let button;

        beforeEach(() => {
            const { container } = render(<StarWars />);
            containerComponent = container;
            input = queryByLabelText(containerComponent, 'input');
            button = queryByText(containerComponent, 'Go!');
        });

        it('and display data if fetched properly', async () => {
            mockAxios.onGet(`${API_URL}/people/1/`).reply(200, {name: 'TEST', height: 999});
            fireEvent.change(input, { target: { value: "1" } });
            fireEvent.click(button);

            await wait(() => {
                expect(queryByText(containerComponent, 'TEST')).toBeInTheDocument();
                expect(queryByText(containerComponent, '999')).toBeInTheDocument();
            });
        });

        it('and does not display data if occurs error 404', async () => {
            mockAxios.onGet(`${API_URL}/people/qwe/`).reply(404, {});
            fireEvent.change(input, { target: { value: "qwe" } });
            fireEvent.click(button);

            await wait(() => {
                expect(queryByText(containerComponent, 'TEST')).not.toBeInTheDocument();
                expect(queryByText(containerComponent, '999')).not.toBeInTheDocument();
            });
        });
    })
});
