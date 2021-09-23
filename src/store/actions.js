
export const TODO_ADD = 'TODO_ADD';
export const TODO_UN_DONE = 'TODO_UN_DONE';
export const TODO_DONE = 'TODO_DONE';
export const TODO_DELETE = 'TODO_DELETE';
export const TODO_EDIT = 'TODO_EDIT';
export const TODO_UPDATE_TEXT = 'TODO_UPDATE_TEXT';

export const todoUnDoneAction = Setter => data => {
    Setter({
        type: TODO_UN_DONE,
        data,
    });
}

export const todoDoneAction = Setter => data => {
    Setter({
        type: TODO_DONE,
        data,
    });
}

export const todoDeleteAction = Setter => data => {
    Setter({
        type: TODO_DELETE,
        data,
    });
}

export const todoEditAction = Setter => data => {
    Setter({
        type: TODO_EDIT,
        data,
    });
}