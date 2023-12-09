import React, { Fragment, useState } from 'react';

type ButtonGroupProps = {
    buttons: string[];
    setFilterType: (filter: FilterType) => void;
};

export enum FilterType {
    FILTER_NONE,
    FILTER_ACTIVE,
    FILTER_COMPLETE,
}

const ButtonGroup = ({ buttons, setFilterType }: ButtonGroupProps) => {
    const [active, setActive] = useState(0);

    const group = buttons.map((btn, i) => {
        return (
            <button
                key={i}
                onClick={() => {
                    setActive(i);
                    setFilterType(i);
                }}
                className={i === active ? 'active' : ''}
            >
                {btn}
            </button>
        );
    });

    return <div>{group}</div>;
};

export { ButtonGroup };
