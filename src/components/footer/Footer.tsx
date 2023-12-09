import React, { Fragment } from 'react';

import { ButtonGroup } from '../button-group/ButtonGroup';

const Footer = () => {
    return (
        <Fragment>
            3 Items
            <ButtonGroup buttons={['All', 'Active', 'Completed']} />
        </Fragment>
    );
};

export { Footer };
