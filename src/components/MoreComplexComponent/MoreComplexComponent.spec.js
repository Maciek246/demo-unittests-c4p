import React from "react";
import MoreComplexComponent from "./MoreComplexComponent";
import { render, fireEvent, queryByLabelText, cleanup, getByText } from "@testing-library/react";

describe('MoreComplexComponent', () => {

    afterEach(() => cleanup())

    it('should be created', () => {
        const { container } = render(<MoreComplexComponent />)

        expect(container.firstChild).toBeInTheDocument()
    });

    describe('should refresh value in paragraph', () => {
        let containerComponent;

        beforeEach(() => {
            const { container } = render(<MoreComplexComponent />);
            containerComponent = container;
        });

        it('on change value' , () => {
            const input = queryByLabelText(containerComponent, 'input');
            const paragraph = queryByLabelText(containerComponent, 'result');

            expect(paragraph.innerHTML).toEqual("");
    
            fireEvent.change(input, { target: { value: "some value" } });

            expect(paragraph.innerHTML).toEqual("some value");
        });

        it('on click `Clear` button', () => {
            const input = queryByLabelText(containerComponent, 'input');
            const paragraph = queryByLabelText(containerComponent, 'result');
            const clearButton = getByText(containerComponent, 'Clear');
            fireEvent.change(input, { target: { value: "some value" } });
            
            fireEvent.click(clearButton)
            expect(paragraph.innerHTML).toEqual("");
        })
    });
});
