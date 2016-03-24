export const HOUR = 'HOUR';
export const SECOND = 'SECOND';


export const clock = (state = new Date(), {type})=> {
    const date = new Date(state.getTime());
    switch(type){
        case SECOND:
            date.setSeconds(date.getSeconds() + 1);
            return date;

        case HOUR:
            date.setHours(date.getHours() + 1);
            return date;

    }

    return state;
};