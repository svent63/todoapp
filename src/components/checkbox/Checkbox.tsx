import React, { useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

type CheckboxProps = {
    id: number;
    isChecked: boolean;
    task: string;
    updateTaskStatus: (id: number, status: boolean) => void;
};

const Checkbox = ({ id, isChecked, task, updateTaskStatus }: CheckboxProps) => {
    const [checked, setChecked] = useState(isChecked);
    const { update } = useIndexedDB('todo');

    const handleChange = (id: number) => {
        setChecked(!checked);
        update({ id: id, complete: !checked, task: task }).then(() => {
            updateTaskStatus(id, !checked);
        });
    };

    return <input type='checkbox' name='' id='' checked={checked} onChange={() => handleChange(id)} />;
};

export { Checkbox };
