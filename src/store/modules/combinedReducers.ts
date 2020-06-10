import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import errorReducer from './error/reducer';
import acceptanceReducer from './dashboard/reducer';
import countTabsReducer from './tabscount/reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    acceptance: acceptanceReducer,
    tabsCount: countTabsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;