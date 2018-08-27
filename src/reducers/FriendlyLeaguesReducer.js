import {
    FRIENDLY_LEAGUE_NAME_CHANGED,
    FRIEND_EMAIL_CHANGED,
    NEW_FRIENDLY_LEAGUE_SUCCESS,
    INVITE_FRIEND_SUCCESS,
    FRIENDLY_LEAGUES_FETCH_SUCCESS,
    OPEN_LEAGUE,
    FETCH_USERNAMES_SUCCESS,
    FETCH_PARTICIPANTS_AVATARS_SUCCESS,
    FETCH_CHAT,
    MESSAGE_CHANGED,
    SEND_MESSAGE,
    ON_TEXT_CHANGE,
    DATA_AFTER_SEARCH
} from '../actions/types.js';

const INITIAL_STATE = {
    friendlyLeagueName: '',
    friendEmail: '',
    friendlyLeaguesListFetch: [],
    selectedFriendlyLeagueId: '',
    displayNames: [],
    friendlyLeagueAvatars: [],
    message: '',
    chat: [],
    isTyping: null,
    textToSearch: '',
    dataToShow: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FRIENDLY_LEAGUE_NAME_CHANGED: {
            return { ...state, friendlyLeagueName: action.payload };
        }
        case FRIEND_EMAIL_CHANGED: {
            return { ...state, friendEmail: action.payload };
        }
        case NEW_FRIENDLY_LEAGUE_SUCCESS: {
            return { ...state, friendlyLeagueName: '' };
        }
        case INVITE_FRIEND_SUCCESS: {
            return { ...state, friendEmail: '' };
        }
        case FRIENDLY_LEAGUES_FETCH_SUCCESS: {
            return { ...state, friendlyLeaguesListFetch: action.payload, dataToShow: action.payload };
        }
        case OPEN_LEAGUE: {
            return { ...state, selectedFriendlyLeagueId: action.payload };
        }
        case FETCH_USERNAMES_SUCCESS: {
            return { ...state, displayNames: action.payload };
        }
        case FETCH_PARTICIPANTS_AVATARS_SUCCESS: {
            return { ...state, friendlyLeagueAvatars: action.payload };
        }
        case FETCH_CHAT: {
            console.log('chat fetched', action.payload);
            return { ...state, chat: action.payload || [] };
        }
        case MESSAGE_CHANGED: {
            return { ...state, message: action.payload };
        }
        case SEND_MESSAGE: {
            return { ...state, chat: action.payload };
            /* return { ...state, chat: [...action.payload, ...state.chat] }; */
        }
        case ON_TEXT_CHANGE:
            return { ...state, textToSearch: action.payload };
        case DATA_AFTER_SEARCH:
            return { ...state, dataToShow: action.payload };
        default: {
            return state;
        }
    }
};
