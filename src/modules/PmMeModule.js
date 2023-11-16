import { createActions, handleActions} from 'redux-actions';

const initialState = [];

export const GET_PM_SEARCHNAME = 'serchName/GET_PM_SEARCHNAME';
export const UPDATE_SEARCH_RESULTS = 'updateSearch/'
const actions = createActions({
    [GET_PM_SEARCHNAME]: () => {},

    
});

const PmSearchReduccer = handleActions(
    {
        [GET_PM_SEARCHNAME]: (state, {payload}) => {
            return payload;
        }
        
        
    },
    initialState  
);




export default PmSearchReduccer;
