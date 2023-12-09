import React, { Fragment, useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

import { Checkbox } from '../checkbox/Checkbox';

type TodoItemRecord = {
    id: number;
    complete: boolean;
    task: string;
};

type TodoListProps = {
    setItemCount: (value: number) => void;
};

const TodoList = ({ setItemCount }: TodoListProps) => {
    const [todoItems, setTodoItems] = useState<TodoItemRecord[]>([]);
    const { getAll } = useIndexedDB('todo');

    useEffect(() => {
        getAll().then((todoItemFromDb) => {
            setTodoItems(todoItemFromDb);
        });
        setItemCount(todoItems.length);
    });

    const todoItemList = todoItems.map((item, i) => {
        return (
            <li key={i}>
                <Checkbox id={item.id} isChecked={item.complete} task={item.task} />
                {item.task}
            </li>
        );
    });

    return (
        <Fragment>
            <ul>{todoItemList}</ul>
        </Fragment>
    );
};

export { TodoList };
