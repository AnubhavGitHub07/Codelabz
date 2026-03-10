import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import {
    addStepMedia,
    removeStepMedia,
    fetchStepMedia,
    clearStepMediaState
} from "../store/actions";

/**
 * Thin hook wrapping step-media Redux actions.
 * All Firebase logic lives in mediaActions.js — this hook only dispatches.
 */
const useMediaUpload = () => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const firestore = useFirestore();

    const uploadState = useSelector(({ media }) => ({
        uploading: media.uploading,
        progress: media.progress,
        error: media.uploadError
    }));

    const deleteState = useSelector(({ media }) => ({
        deleting: media.deleting,
        error: media.deleteError
    }));

    const getStepMedia = (stepId) =>
        useSelector(({ media }) => media.byStep[stepId] || []);

    const uploadMedia = (file, tutorialId, stepId) =>
        addStepMedia(tutorialId, stepId, file)(firebase, firestore, dispatch);

    const deleteMedia = (tutorialId, stepId, mediaItem) =>
        removeStepMedia(tutorialId, stepId, mediaItem)(firebase, firestore, dispatch);

    const loadStepMedia = (tutorialId, stepId) =>
        fetchStepMedia(tutorialId, stepId)(firebase, firestore, dispatch);

    const resetState = () => clearStepMediaState()(dispatch);

    return {
        uploadMedia,
        deleteMedia,
        loadStepMedia,
        resetState,
        uploadState,
        deleteState,
        getStepMedia
    };
};

export default useMediaUpload;
