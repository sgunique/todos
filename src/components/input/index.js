import React, { useState } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

import useData from '../../hooks/useData';

import './input.css';

const InputBox = () => {
    const [inputValue, setInputValue] = useState('');
    const [, setTodoItems] = useData();

    const handleOnChange = e => {
        setInputValue(e.target.value);
    };

    const handleOnKeypress = e => {
        if (e.which == 13) {
            setTodoItems({
                type: 'TODO_ADD',
                data: {
                    id: new Date().getTime(),
                    text: e.target.value,
                    done: false,
                }
            });

            //clear input
            setInputValue('');
        }
    }

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="standard-todo-input">Enter Todo Item</InputLabel>
            <Input
                type={'text'}
                id="standard-todo-input"
                value={inputValue}
                onChange={handleOnChange}
                onKeyPress={handleOnKeypress}
            />
        </FormControl>
    );
};

export default InputBox;