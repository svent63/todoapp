import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useIndexedDB } from 'react-indexed-db-hook';

import { FilterType } from '../button-group/ButtonGroup';
import { Checkbox } from '../checkbox/Checkbox';

export type TodoItemRecord = {
    id: number;
    complete: boolean;
    task: string;
};

type TodoListProps = {
    filter: number;
    setItemCount: (value: number) => void;
};

let listData: TodoItemRecord[] = [];

const TodoList = forwardRef(({ filter, setItemCount }: TodoListProps, ref) => {
    const [todoItems, setTodoItems] = useState<TodoItemRecord[]>([]);
    const { getAll } = useIndexedDB('todo');

    useImperativeHandle(ref, () => ({
        addTodoToList(obj: TodoItemRecord) {
            listData = [];
            getAll().then((dataList) => {
                listData = dataList;
                let list: TodoItemRecord[] = [];
                if (filter === FilterType.FILTER_NONE) {
                    list = listData;
                } else if (filter === FilterType.FILTER_ACTIVE) {
                    list = listData.filter((item) => item.complete === false);
                } else if (filter === FilterType.FILTER_COMPLETE) {
                    list = listData.filter((item) => item.complete === true);
                }
                setTodoItems(list);
            });
        },
    }));

    useEffect(() => {
        getAll().then((todoItemFromDb) => {
            listData = todoItemFromDb;
            setTodoItems(todoItemFromDb);
        });
        setItemCount(listData.length);
    }, []);

    useEffect(() => {
        getAll().then((dataList) => {
            let list: TodoItemRecord[] = [];
            if (filter === FilterType.FILTER_NONE) {
                list = dataList;
            } else if (filter === FilterType.FILTER_ACTIVE) {
                list = dataList.filter((item) => item.complete === false);
            } else if (filter === FilterType.FILTER_COMPLETE) {
                list = dataList.filter((item) => item.complete === true);
            }

            setTodoItems(list);
            setItemCount(list.length);
        });
    }, [filter]);

    const updateTaskStatus = (id: number, status: boolean) => {
        console.log('updateTaskStatus was called');
        getAll().then((dataList) => {
            console.log('reading all the records from the database');
            console.log(dataList);
            let list: TodoItemRecord[] = [];
            if (filter === FilterType.FILTER_NONE) {
                list = dataList;
            } else if (filter === FilterType.FILTER_ACTIVE) {
                list = dataList.filter((item) => item.complete === false);
            } else if (filter === FilterType.FILTER_COMPLETE) {
                list = dataList.filter((item) => item.complete === true);
            }

            setTodoItems(list);
            setItemCount(list.length);
        });
    };

    const todoItemList = todoItems.map((item, i) => {
        console.log(item.id);
        return (
            <li key={i}>
                <Checkbox id={item.id} isChecked={item.complete} task={item.task} updateTaskStatus={updateTaskStatus} />
                {item.task}
            </li>
        );
    });

    console.log(filter);

    return <ul>{todoItemList}</ul>;
});

export { TodoList };
