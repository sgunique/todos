import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { TODO_UPDATE_TEXT } from '../../store/actions';

const useStyles = makeStyles(() => ({
    text: {
        display: 'flex',
        paddingRight: '10px',
    },
    textDone: {
        display: 'flex',
        paddingRight: '10px',
        textDecoration: 'line-through',
        resize: 'none',
    },
    textarea: { 
        minWidth: '300px', 
        lineHeight: '20px', 
        fontSize: '16px' 
    }
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
    const restClasses = [
        (done || isEditable) ? classes.textDone : classes.text, 
        classes.textarea
    ].join(" ");

    const handleOnChange = (e) => {
        setTodoItems({
            type: TODO_UPDATE_TEXT,
            data: {
                id,
                text: e.target.value,
            }
        });
    }

    const handleOnKeypress = (e) => {
        if (e.which == 13 && (e.shiftKey || e.ctrlKey)) {
            handleTodoEdit(false);
        }
    }

    return <TextareaAutosize
                disabled={done || isEditable}
                minRows={2}
                value={text}
                onChange={handleOnChange}
                onKeyPress={handleOnKeypress}
                onBlur={() => {
                    handleTodoEdit(false);
                }} 
                className={restClasses}
            />;
}

export default EditInput;