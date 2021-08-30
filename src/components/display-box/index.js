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
import useData from '../../hooks/useData';

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
    text: {
        display: 'flex',
        paddingRight: '10px',
    },
    textDone: {
        display: 'flex',
        paddingRight: '10px',
        textDecoration: 'line-through',
    },
    icon: {
        display: 'flex',
    },
}));

const DisplayBox = () => {
    const classes = useStyles();
    const [items, setTodoItems] = useData();

    return (
        <div>
            <TransitionGroup>
                {
                    items.map(({ id, text, done }) => (
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
                                        <div className={done ? classes.textDone : classes.text}>
                                            {text}
                                        </div>
                                        {
                                            done ? <UndoIcon onClick={() => {
                                                setTodoItems({
                                                    type: 'TODO_UN_DONE',
                                                    data: {
                                                        id,
                                                    }
                                                });

                                            }} /> :
                                                <DoneCheckCircleOutlineIcon onClick={() => {
                                                    setTodoItems({
                                                        type: 'TODO_DONE',
                                                        data: {
                                                            id,
                                                        }
                                                    });

                                                }} />
                                        }
                                        <DeleteIcon className={classes.icon} onClick={() => {
                                            setTodoItems({
                                                type: 'TODO_DELETE',
                                                data: {
                                                    id,
                                                }
                                            });

                                        }} />
                                    </Grid>
                                </Paper>
                            </div>
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </div>
    );
};

export default DisplayBox;