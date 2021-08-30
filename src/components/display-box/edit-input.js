import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(() => ({
    text: {
        display: 'flex',
        paddingRight: '10px',
    },
    textDone: {
        display: 'flex',
        paddingRight: '10px',
        textDecoration: 'line-through',
    },
}));

const EditInput = ({
    handleTodoEdit,
    setTodoItems,
    text,
    id,
    isEditable,
    done,
}) => {
    const classes = useStyles();

    if (!isEditable) {
        return <div className={done ? classes.textDone : classes.text}>{text}</div>;
    }

    const handleOnChange = (e) => {
        setTodoItems({
            type: 'TODO_UPDATE_TEXT',
            data: {
                id,
                text: e.target.value,
            }
        });
    }

    const handleOnKeypress = (e) => {
        if (e.which == 13) {
            handleTodoEdit(false);
        }
    }

    return <Input type={'text'}
        value={text}
        onChange={handleOnChange}
        onKeyPress={handleOnKeypress} />;
}

export default EditInput;