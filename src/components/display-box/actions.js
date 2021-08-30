
export const todoUnDoneAction = Setter => data => {
    Setter({
        type: 'TODO_UN_DONE',
        data,
    });
}

export const todoDoneAction = Setter => data => {
    Setter({
        type: 'TODO_DONE',
        data,
    });
}

export const todoDeleteAction = Setter => data => {
    Setter({
        type: 'TODO_DELETE',
        data,
    });
}