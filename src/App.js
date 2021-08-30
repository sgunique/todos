import React, { useReducer } from 'react';
import Scale from './components/scale';
import Input from './components/input';
import DisplayBox from './components/display-box';
import { todoReducer } from './reducer';
import DataContext from './hooks/dataContext';

const App = () => {
    const [todoItems, setTodoItems] = useReducer(todoReducer, []);

    return (
        <DataContext.Provider value={[todoItems, setTodoItems]}>
            <Input />
            <DisplayBox />
            <Scale />
        </DataContext.Provider>
    )
}

export default App;
