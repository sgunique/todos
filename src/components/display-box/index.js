import React from 'react';
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
import { wrapSetter } from '../../utils';

import {
    todoUnDoneAction,
    todoDoneAction,
    todoDeleteAction,
    todoEditAction,
} from '../../store/actions';

import './displaybox.css';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'no-wrap',
        '& > *': {
            padding: '5px 10px',
            margin: theme.spacing(1),
            minWidth: theme.spacing(8),
            height: 'auto',
        },
    },
    icon: {
        display: 'flex',
    },
    small: {
        fontSize: '12px',
        paddingTop: '10px'
    }
}));

const DoneIconToggler = ({
    done,
    handleTodoUnDone,
    handleTodoDone
}) => {
    if (done) {
        return <UndoIcon onClick={handleTodoUnDone} />
    }

    return <DoneCheckCircleOutlineIcon onClick={handleTodoDone} />
}

const DisplayBox = () => {
    const classes = useStyles();
    const [items, setTodoItems] = useData();

    const {
        _todoUnDoneAction,
        _todoDoneAction,
        _todoDeleteAction,
        _todoEditAction,
    } = wrapSetter(setTodoItems, {
        todoUnDoneAction,
        todoDoneAction,
        todoDeleteAction,
        todoEditAction,
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

        handleTodoEdit(item)(false);
    };

    const handleTodoDelete = item => () => {
        _todoDeleteAction({
            id: item.id,
        });
    }

    const handleTodoEdit = item => data => {
        _todoEditAction({
            id: item.id,
            isEditable: data || !item.isEditable,
        });
    }

    return (
        <div>
            <TransitionGroup>
                {
                    items.map(item => {
                        const { id, text, done, isEditable } = item;

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
                                                disable={done || !isEditable}
                                                item={item}
                                                handleTodoEdit={handleTodoEdit(item)}
                                                setTodoItems={setTodoItems}
                                                text={text} />


                                            {
                                                !done && <EditIcon onClick={handleTodoEdit(item)} />
                                            }

                                            <DoneIconToggler
                                                done={done}
                                                handleTodoUnDone={handleTodoUnDone(item)}
                                                handleTodoDone={handleTodoDone(item)} />

                                            <DeleteIcon className={classes.icon}
                                                onClick={handleTodoDelete(item)} />
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-end"
                                            alignItems="center"
                                            wrap="nowrap"
                                        >
                                            <i className={classes.small}>{item.time}</i>
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