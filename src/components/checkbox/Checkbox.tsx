import React, { useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

import { TodoItemRecord } from '../TodoList/TodoList';

type CheckboxProps = {
    id: number;
    isChecked: boolean;
    task: string;
    updateTaskStatus: (id: number, status: boolean) => void;
};

const Checkbox = ({ id, isChecked, task, updateTaskStatus }: CheckboxProps) => {
    const [checked, setChecked] = useState(() => (isChecked ? true : false));
    const { update, getByID } = useIndexedDB('todo');

    useEffect(() => {
        setChecked(isChecked);
    }, []);

    useEffect(() => {
        updateTaskStatus(id, checked);
    }, [checked]);

    const handleChange = () => {
        update({ id: id, complete: !isChecked, task: task }).then((event) => {
            getByID(id).then((updatedRecord: TodoItemRecord) => {});
            setChecked(!checked);
        });
    };

    return <input type='checkbox' name='' id='' checked={isChecked} onChange={() => handleChange()} />;
};

export { Checkbox };
