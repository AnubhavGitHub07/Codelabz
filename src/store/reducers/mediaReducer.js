import * as actions from "../actions/actionTypes";

const initialState = {
    byStep: {}, // { [stepId]: [mediaItem, ...] }
    uploading: false,
    progress: 0,
    uploadError: null,
    deleting: false,
    deleteError: null,
    fetching: false,
    fetchError: null
};

const mediaReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case actions.CLEAR_STEP_MEDIA_STATE:
            return initialState;

        // Upload
        case actions.STEP_MEDIA_UPLOAD_START:
            return {
                ...state,
                uploading: true,
                uploadError: null
            };

        case actions.STEP_MEDIA_UPLOAD_SUCCESS: {
            const { stepId, mediaItem } = payload;
            const existing = state.byStep[stepId] || [];
            return {
                ...state,
                uploading: false,
                uploadError: null,
                byStep: {
                    ...state.byStep,
                    [stepId]: [...existing, mediaItem]
                }
            };
        }

        case actions.STEP_MEDIA_UPLOAD_FAIL:
            return {
                ...state,
                uploading: false,
                uploadError: payload
            };

        // Delete
        case actions.STEP_MEDIA_DELETE_START:
            return {
                ...state,
                deleting: true,
                deleteError: null
            };

        case actions.STEP_MEDIA_DELETE_SUCCESS: {
            const { stepId, mediaId } = payload;
            const current = state.byStep[stepId] || [];
            return {
                ...state,
                deleting: false,
                deleteError: null,
                byStep: {
                    ...state.byStep,
                    [stepId]: current.filter((item) => item.id !== mediaId)
                }
            };
        }

        case actions.STEP_MEDIA_DELETE_FAIL:
            return {
                ...state,
                deleting: false,
                deleteError: payload
            };

        // Fetch
        case actions.STEP_MEDIA_FETCH_START:
            return {
                ...state,
                fetching: true,
                fetchError: null
            };

        case actions.STEP_MEDIA_FETCH_SUCCESS: {
            const { stepId, items } = payload;
            return {
                ...state,
                fetching: false,
                fetchError: null,
                byStep: {
                    ...state.byStep,
                    [stepId]: items
                }
            };
        }

        case actions.STEP_MEDIA_FETCH_FAIL:
            return {
                ...state,
                fetching: false,
                fetchError: payload
            };

        default:
            return state;
    }
};

export default mediaReducer;
