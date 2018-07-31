import { 
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGGING_USER_IN,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    FORGOT_PASSWORD,
    PASSWORD_RECOVERY
 } from '../actions/types.js';

const INITIAL_STATE = {
	email: '',
	password: '',
	user: null,
	error: '',
	loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMAIL_CHANGED: {
            return { ...state, email: action.payload };
        }
        case PASSWORD_CHANGED: {
            return { ...state, password: action.payload };
        }
        case LOGGING_USER_IN: {
            console.log('LOGGING_USER_IN');
            return { ...state,
				loading: true,
                error: '' 
            };
        }
        case LOGIN_USER_SUCCESS: {
            console.log('LOGIN_USER_SUCCESS');
            return { ...state, ...INITIAL_STATE, user: action.payload };
        }
        case LOGIN_USER_FAIL:
            return { ...state,
                error: action.payload,
                password: '',
                loading: false
        };
        case FORGOT_PASSWORD:
            return { ...state, ...INITIAL_STATE, email: action.payload };
        case PASSWORD_RECOVERY:
            return state; //TODO - send instructions to recover password on email
        default: {
            return state;
        }
    }
};
