export const HOUR = 'HOUR';
export const SECOND = 'SECOND';


export const clock = (state = new Date(), {type, payload})=> {
    const date = new Date(state.getTime());
    switch(type){
        case SECOND:
            date.setSeconds(date.getSeconds() + payload);
            return date;

        case HOUR:
            date.setHours(date.getHours() + payload);
            return date;

    }

    return state;
};