import React, { useReducer } from 'react';
// import Scale from './components/scale';
import Input from './components/input';
import DisplayBox from './components/display-box';
import { todoReducer } from './store/reducer';
import DataContext from './hooks/dataContext';
import AppStorage from './utils/storage';

const App = ({ savedItems }) => {
    const [todoItems, setTodoItems] = useReducer(todoReducer, savedItems);
    
    AppStorage.setItem('todos', todoItems);

    return (
        <DataContext.Provider value={[todoItems, setTodoItems]}>
            <Input />
            <DisplayBox />
            {/* <Scale /> */}
        </DataContext.Provider>
    )
}

App.defaultProps = {
    savedItems: AppStorage.getItem('todos', [])
}

export default App;
