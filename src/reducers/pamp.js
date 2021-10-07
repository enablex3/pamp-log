import {
    RETRIEVE_LOG,
    CREATE_FEED_LOG,
    CREATE_BOWEL_LOG,
    UPDATE_LOG,
    DELETE_FEED_LOG,
    DELETE_BOWEL_LOG
} from "../actions/type";

const initialState = {};

function pampReducer(pamp = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_LOG:
            return payload;

        case CREATE_FEED_LOG:
            return payload;

        case DELETE_FEED_LOG:
            return payload;

        case CREATE_BOWEL_LOG:
            return payload;

        case DELETE_BOWEL_LOG:
            return payload;

        default:
            return pamp;
    }
};

export default pampReducer;