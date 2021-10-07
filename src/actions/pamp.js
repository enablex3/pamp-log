import {
    RETRIEVE_LOG,
    CREATE_FEED_LOG,
    CREATE_BOWEL_LOG,
    UPDATE_LOG,
    DELETE_FEED_LOG,
    DELETE_BOWEL_LOG
} from "./type";

import PampApi from "../utils/api_calls";

export const retrieveLog = () => async (dispatch) => {
    try {
        const res = await PampApi.getAll();

        dispatch({
            type: RETRIEVE_LOG,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createFeedLog = (ounces, time) => async (dispatch) => {
    try {
        const res = await PampApi.create_feed({ounces, time});

        dispatch({
            type: CREATE_FEED_LOG,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteFeedLog = (rowid) => async (dispatch) => {
    try {
        const res = await PampApi.delete_feed({rowid});

        dispatch({
            type: DELETE_FEED_LOG,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const createBowelLog = (void_p, excrement, time) => async (dispatch) => {
    try {
        const res = await PampApi.create_bowel({void_p, excrement, time});

        dispatch({
            type: CREATE_BOWEL_LOG,
            payload: res.data
        });
        console.log(res.data)
        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteBowelLog = (rowid) => async (dispatch) => {
    try {
        const res = await PampApi.delete_bowel({rowid});

        dispatch({
            type: DELETE_BOWEL_LOG,
            payload: res.data
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};