import React from "react";
import Input from "./Input";
import { render } from "@testing-library/react";

describe('Input component', () => {
    it('should be created', () => {
        const { container } = render(<Input />)

        expect(container.firstChild).toBeTruthy()
    })
})