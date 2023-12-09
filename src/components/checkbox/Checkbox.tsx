import React, { useState } from 'react';

type CheckboxProps = {
    isChecked: boolean;
};

const Checkbox = ({ isChecked }: CheckboxProps) => {
    const [checked, setChecked] = useState(isChecked);

    const handleChange = () => {
        setChecked(!checked);
    };

    return <input type='checkbox' name='' id='' checked={checked} onChange={handleChange} />;
};

export { Checkbox };
