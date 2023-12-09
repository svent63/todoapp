import React, { Fragment, useState } from 'react';

type ButtonGroupProps = {
    buttons: string[];
};

const ButtonGroup = ({ buttons }: ButtonGroupProps) => {
    const [active, setActive] = useState(0);

    const group = buttons.map((btn, i) => {
        return (
            <button key={i} onClick={() => setActive(i)} className={i === active ? 'active' : ''}>
                {btn}
            </button>
        );
    });

    return <div>{group}</div>;
};

export { ButtonGroup };
