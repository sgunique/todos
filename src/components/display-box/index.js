import React, { useState } from 'react';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import DoneCheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import UndoIcon from '@material-ui/icons/Undo';
import EditIcon from '@material-ui/icons/Edit';
import useData from '../../hooks/useData';
import EditInput from './edit-input';
import { 
    todoUnDoneAction, 
    todoDoneAction,
    todoDeleteAction
} from './actions';

import './displaybox.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'no-wrap',
        '& > *': {
            padding: '5px 10px',
            margin: theme.spacing(1),
            minWidth: theme.spacing(4),
            height: 'auto',
        },
    },
    icon: {
        display: 'flex',
    },
}));

const wrapSetter = (setter, methods, prefix = '') => {
    const allMethods = Object.keys(methods);

    return allMethods.reduce((acc, funName) => {
        acc[`${prefix}${funName}`] = methods[funName](setter);
        return acc;
    }, {});
}

const DisplayBox = () => {
    const classes = useStyles();
    const [items, setTodoItems] = useData();
    const [isEditable, setIsEditable] = useState(false);

    const {
        _todoUnDoneAction,
        _todoDoneAction,
        _todoDeleteAction
     } = wrapSetter(setTodoItems, {
            todoUnDoneAction, 
            todoDoneAction, 
            todoDeleteAction
        }, '_');

    const handleTodoUnDone = item => () => {
        _todoUnDoneAction({
            id: item.id,
        });
    };

    const handleTodoDone = item => () => {
        _todoDoneAction({
            id: item.id,
        });
        setIsEditable(false);
    };

    const handleTodoDelete = item => () => {
        _todoDeleteAction({
            id: item.id,
        });
    }

    return (
        <div>
            <TransitionGroup>
                {
                    items.map(item => {
                        const { id, text, done } = item;

                        return (
                            <CSSTransition
                                key={id}
                                timeout={500}
                                classNames="item"
                            >
                                <div className={classes.root}>
                                    <Paper elevation={3}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            wrap="nowrap"
                                        >
                                            
                                            <EditInput
                                                id={id}
                                                done={done}
                                                isEditable={isEditable}
                                                setIsEditable={setIsEditable}
                                                setTodoItems={setTodoItems}
                                                text={text} />


                                            {
                                                !done && <EditIcon onClick={() => {
                                                    setIsEditable(!isEditable);
                                                }} />
                                            }


                                            {
                                                done ?
                                                    <UndoIcon
                                                        onClick={handleTodoUnDone(item)} />
                                                    :
                                                    <DoneCheckCircleOutlineIcon
                                                        onClick={handleTodoDone(item)} />
                                            }


                                            <DeleteIcon className={classes.icon}
                                                onClick={handleTodoDelete(item)} />
                                        </Grid>
                                    </Paper>
                                </div>
                            </CSSTransition>
                        )
                    })

                }
            </TransitionGroup>
        </div>
    );
};

export default DisplayBox;