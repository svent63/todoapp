import React, { useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

type CheckboxProps = {
    id: number;
    isChecked: boolean;
    task: string;
};

const Checkbox = ({ id, isChecked, task }: CheckboxProps) => {
    const [checked, setChecked] = useState(isChecked);
    const { update } = useIndexedDB('todo');

    const handleChange = (id: number) => {
        setChecked(!checked);
        update({ id: id, complete: !checked, task: task });
    };

    return <input type='checkbox' name='' id='' checked={checked} onChange={() => handleChange(id)} />;
};

export { Checkbox };
