import './app.scss';

import React, { Fragment, useRef, useState } from 'react';
import { initDB, useIndexedDB } from 'react-indexed-db-hook';

import { FilterType } from './components/button-group/ButtonGroup';
import { Footer } from './components/footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { DBConfig } from './dbconfig';

initDB(DBConfig);

const App = () => {
    const [newTodoItem, setNewTodoItem] = useState('');
    const [itemCount, setItemCount] = useState(0);
    const [filterType, setFilterType] = useState<FilterType>(FilterType.FILTER_NONE);
    const childRef = useRef(null);
    const { add } = useIndexedDB('todo');

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            add({ complete: false, task: newTodoItem }).then(
                (event) => {
                    childRef.current.addTodoToList({ complete: false, task: newTodoItem, id: event });
                    setNewTodoItem('');
                },
                (error) => {
                    console.log(error);
                }
            );
        }
    };

    return (
        <Fragment>
            <div className='container'>
                <h1 className='heading'>Things To Do</h1>
                <input
                    type='text'
                    className='newTodo'
                    placeholder='Add to do'
                    value={newTodoItem}
                    onChange={(e) => setNewTodoItem(e.target.value)}
                    onKeyUp={handleEnterKey}
                />
                <div className='todo-container'>
                    <TodoList filter={filterType} setItemCount={setItemCount} ref={childRef} />
                </div>
                <div className='footer-container'>
                    <Footer itemCount={itemCount} setFilterType={setFilterType} />
                </div>
            </div>
        </Fragment>
    );
};

export default App;
