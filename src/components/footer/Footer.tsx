import React, { Fragment } from 'react';

import { ButtonGroup } from '../button-group/ButtonGroup';

type FooterProps = {
    itemCount: number;
};

const Footer = ({ itemCount }: FooterProps) => {
    return (
        <Fragment>
            {itemCount} Items
            <ButtonGroup buttons={['All', 'Active', 'Completed']} />
        </Fragment>
    );
};

export { Footer };
