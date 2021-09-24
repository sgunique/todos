import {
    TODO_ADD,
    TODO_DELETE,
    TODO_DONE,
    TODO_UPDATE_TEXT,
    TODO_UN_DONE,
    TODO_EDIT
} from './actions';

export const todoReducer = (state, payload) => {
    if (!payload && !payload.data) {
        return state;
    }

    const { data = {}, type } = payload;
    const { id } = data;

    const time = new Date().toLocaleString();

    switch (type) {
        case TODO_ADD:
            data.time = time;
            state.push(data);
            return [...state];
            
        case TODO_DELETE:
            return [...state.filter((item) => {
                return item.id != id
            })];

        case TODO_DONE:
            return state.map((item) => {
                if (item.id === id) {
                    item.time = time;
                    item.done = true;
                }
                return item;
            });
        case TODO_UPDATE_TEXT:
            return state.map((item) => {
                if (item.id === id) {
                    item.time = time;
                    item.text = data.text;
                }
                return item;
            });

        case TODO_UN_DONE:
            return state.map((item) => {
                if (item.id === id) {
                    item.done = false;
                    item.time = time;
                }
                return item;
            });

        case TODO_EDIT:
            return state.map((item) => {
                if (item.id === id) {
                    item.time = time;
                    item.isEditable = data.isEditable;
                }
                return item;
            });

        default:
            return state;
    }
}
