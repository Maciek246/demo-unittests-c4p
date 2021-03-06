import React from "react";
import Button from "./Button";
import { render, fireEvent } from "@testing-library/react";

describe('Button component', () => {
    it('should be rendered', () => {
        const { container } = render(<Button />)

        expect(container.firstChild).toBeInTheDocument()
    });

    it('should render children prop as label', () => {
        const component = render(<Button>TEST</Button>);

        expect(component.queryByText('TEST')).toBeInTheDocument();
    });

    it('should call function given as prop by clicking button', () => {
        const mock = jest.fn();
        const component = render(<Button onClick={mock}>TEST</Button>);

        fireEvent.click(component.queryByText('TEST'));

        expect(mock).toHaveBeenCalledTimes(1);
    });

    it('should display extra paragraph if `extraParagraph` prop is set', () => {
        const component = render(<Button extraParagraph={true}>TEST</Button>);

        expect(component.queryByText('Extra paragraph')).toBeInTheDocument();
    });

    it('should not display extra paragraph if `extraParagraph` prop is falsy', () => {
        const component = render(<Button extraParagraph={false}>TEST</Button>);

        expect(component.queryByText('Extra paragraph')).toBeNull();

    });
})

