import './app.scss';

import React, { Fragment } from 'react';

import { Footer } from './components/footer/Footer';
import { TodoList } from './components/TodoList/TodoList';

const App = () => {
    return (
        <Fragment>
            <div className='container'>
                <h1 className='heading'>Things To Do</h1>
                <input type='text' className='newTodo' placeholder='Add to do' />
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
