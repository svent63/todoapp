import './app.scss';

import React, { Fragment, useState } from 'react';
import { initDB, useIndexedDB } from 'react-indexed-db-hook';

import { Footer } from './components/footer/Footer';
import { TodoList } from './components/TodoList/TodoList';
import { DBConfig } from './dbconfig';

initDB(DBConfig);

const App = () => {
    const [newTodoItem, setNewTodoItem] = useState('');
    const { add } = useIndexedDB('todo');

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            add({ complete: false, task: newTodoItem }).then(
                (event) => {
                    console.log('Item added to list ', event.toString());
                },
                (error) => {
                    console.log(error);
                }
            );
            setNewTodoItem('');
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
                    <TodoList />
                </div>
                <div className='footer-container'>
                    <Footer />
                </div>
            </div>
        </Fragment>
    );
};

export default App;
