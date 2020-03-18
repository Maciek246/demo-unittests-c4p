import React from 'react';

const Button = (props) => (
    <div>
        <button onClick={props.onClick} className="btn">
            {props.children}
        </button>
        {props.extraParagraph && <p>Extra paragraph</p>}
    </div>
)

export default Button;