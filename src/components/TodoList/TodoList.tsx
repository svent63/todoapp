import React, { Fragment, useEffect, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

type TodoItemRecord = {
    id: number;
    complete: boolean;
    task: string;
};

const TodoList = () => {
    const [todoItems, setTodoItems] = useState<TodoItemRecord[]>([]);
    const { getAll } = useIndexedDB('todo');

    useEffect(() => {
        getAll().then((todoItemFromDb) => {
            setTodoItems(todoItemFromDb);
        });
    }, []);

    const todoItemList = todoItems.map((item, i) => {
        return (
            <li key={i}>
                <input type='checkbox' name='' id='' checked={item.complete} />
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
