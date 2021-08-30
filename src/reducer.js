
export const todoReducer = (state, payload) => {
    if (!payload && !payload.data) {
        return state;
    }

    const { data = {}, type } = payload;
    const { id } = data;

    switch (type) {
        case 'TODO_ADD':
            state.push(data);
            return [...state];

        case 'TODO_DELETE':
            return [...state.filter((item) => {
                return item.id != id
            })];

        case 'TODO_DONE':
            return state.map((item) => {
                if (item.id === id) {
                    item.done = true;
                }
                return item;
            });
        case 'TODO_UPDATE_TEXT':
            return state.map((item) => {
                if (item.id === id) {
                    item.text = data.text;
                }
                return item;
            });

        case 'TODO_UN_DONE':
            return state.map((item) => {
                if (item.id === id) {
                    item.done = false;
                }
                return item;
            });

        case 'TODO_EDIT':
            return state.map((item) => {
                if (item.id === id) {
                    item.isEditable = data.isEditable;
                }
                return item;
            });

        default:
            return state;
    }
}
