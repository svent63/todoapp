import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

import { Checkbox } from '../checkbox/Checkbox';

type TodoItemRecord = {
    id: number;
    complete: boolean;
    task: string;
};

type TodoListProps = {
    filter: number;
    setItemCount: (value: number) => void;
};

const TodoList = forwardRef(({ filter, setItemCount }: TodoListProps, ref) => {
    const [todoItems, setTodoItems] = useState<TodoItemRecord[]>([]);
    const { getAll } = useIndexedDB('todo');

    useImperativeHandle(ref, () => ({
        addTodoToList(obj) {
            const newItem: TodoItemRecord = { id: obj.id, complete: obj.complete, task: obj.task };
            const oldList = [...todoItems];
            oldList.push(newItem);
            setTodoItems(oldList);
        },
    }));

    useEffect(() => {
        getAll().then((todoItemFromDb) => {
            setTodoItems(todoItemFromDb);
        });
        setItemCount(todoItems.length);
    }, []);

    const todoItemList = todoItems.map((item, i) => {
        return (
            <li key={i}>
                <Checkbox id={item.id} isChecked={item.complete} task={item.task} />
                {item.task}
            </li>
        );
    });

    return <ul>{todoItemList}</ul>;
});

export { TodoList };
