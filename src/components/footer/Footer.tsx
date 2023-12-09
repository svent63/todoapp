import React, { Fragment } from 'react';

import { ButtonGroup, FilterType } from '../button-group/ButtonGroup';

type FooterProps = {
    itemCount: number;
    setFilterType: (filter: FilterType) => void;
};

const Footer = ({ itemCount, setFilterType }: FooterProps) => {
    return (
        <Fragment>
            {itemCount} Items
            <ButtonGroup buttons={['All', 'Active', 'Completed']} setFilterType={setFilterType} />
        </Fragment>
    );
};

export { Footer };
