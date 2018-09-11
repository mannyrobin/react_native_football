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
    UPLOAD_FRIENDLY_LEAGUE_PHOTO,
    FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS,
    INVITE_FRIEND_FAILED,
    UPDATE_USERNAMES_DB
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
    friendlyLeaguePhoto: null,
    friendlyLeaguesAvatars: []
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
        case INVITE_FRIEND_FAILED: {
            return { ...state };
        }
        case FRIENDLY_LEAGUES_FETCH_SUCCESS: {
            return { ...state, friendlyLeaguesListFetch: action.payload };
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
        case UPLOAD_FRIENDLY_LEAGUE_PHOTO: {
            return { ...state, friendlyLeaguePhoto: action.payload };
        }
        case FETCH_FRIENDLY_LEAGUES_AVATARS_SUCCESS: {
            return { ...state, friendlyLeaguesAvatars: action.payload };
        }
        case UPDATE_USERNAMES_DB : {
            return { ...state, displayNames: action.payload };
        }
        default: {
            return state;
        }
    }
};

