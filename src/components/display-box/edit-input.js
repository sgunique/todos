import React, { useEffect, useRef } from 'react';
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
    },
    textarea: { 
        minWidth: '300px', 
        lineHeight: '20px', 
        fontSize: '16px' 
    },
    noResize: {
        resize: 'none',
    }
}));

const EditInput = ({
    handleTodoEdit,
    setTodoItems,
    text,
    id,
    done,
    disable,
}) => {
    const inputRef = useRef(null);

    const classes = useStyles();
    const restClasses = [
        done ? classes.textDone : classes.text, 
        classes.textarea,
        disable ? classes.noResize : ''
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
    
    useEffect(() => {
        const elm = inputRef.current;
        elm.selectionStart = text.length;
        elm.selectionEnd = text.length;
        elm.focus();
    }, [!disable, text]);

    return <TextareaAutosize
                ref={inputRef}
                disabled={disable}
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