import * as actions from "./actionTypes";
import { v4 as uuidv4 } from "uuid";

/**
 * Accepted MIME types grouped by media category
 */
export const ACCEPTED_TYPES = {
    image: ["image/jpeg", "image/png", "image/webp", "image/svg+xml"],
    gif: ["image/gif"],
    video: ["video/mp4", "video/webm", "video/ogg"]
};

/**
 * Max file sizes in bytes
 */
export const MAX_SIZES = {
    image: 50 * 1024 * 1024, // 50 MB
    gif: 50 * 1024 * 1024, // 50 MB
    video: 200 * 1024 * 1024 // 200 MB
};

export const MAX_ITEMS_PER_STEP = 5;

/**
 * Determine media category from MIME type
 */
export const getMediaType = (mimeType) => {
    if (ACCEPTED_TYPES.image.includes(mimeType)) return "image";
    if (ACCEPTED_TYPES.gif.includes(mimeType)) return "gif";
    if (ACCEPTED_TYPES.video.includes(mimeType)) return "video";
    return null;
};

/**
 * Get all accepted MIME types as a flat array
 */
export const getAllAcceptedTypes = () =>
    [
        ...ACCEPTED_TYPES.image,
        ...ACCEPTED_TYPES.gif,
        ...ACCEPTED_TYPES.video
    ];

/**
 * Extract the file extension from a filename
 */
const getFileExtension = (filename) => {
    const parts = filename.split(".");
    return parts.length > 1 ? parts.pop() : "";
};

/**
 * Generate a thumbnail data-URI from a video file (first frame)
 */
const generateVideoThumbnail = (file) =>
    new Promise((resolve) => {
        const video = document.createElement("video");
        video.preload = "metadata";
        video.muted = true;
        video.playsInline = true;

        video.onloadeddata = () => {
            video.currentTime = 0.5; // seek to 0.5s for a meaningful frame
        };

        video.onseeked = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext("2d").drawImage(video, 0, 0);
            const dataURI = canvas.toDataURL("image/jpeg", 0.7);
            URL.revokeObjectURL(video.src);
            resolve(dataURI);
        };

        video.onerror = () => {
            URL.revokeObjectURL(video.src);
            resolve(null);
        };

        video.src = URL.createObjectURL(file);
    });

/**
 * Upload a media file to a tutorial step
 * Thunk: (firebase, firestore, dispatch)
 */
export const addStepMedia =
    (tutorialId, stepId, file) => async (firebase, firestore, dispatch) => {
        try {
            dispatch({ type: actions.STEP_MEDIA_UPLOAD_START });

            const mediaType = getMediaType(file.type);
            if (!mediaType) {
                throw new Error(`Unsupported file type: ${file.type}`);
            }

            const maxSize = MAX_SIZES[mediaType];
            if (file.size > maxSize) {
                throw new Error(
                    `File too large. Max size for ${mediaType}: ${Math.round(maxSize / 1024 / 1024)} MB`
                );
            }

            const mediaId = uuidv4();
            const ext = getFileExtension(file.name);
            const storagePath = `tutorials/${tutorialId}/steps/${stepId}/media/${mediaId}${ext ? "." + ext : ""}`;

            // Upload to Firebase Storage
            const storageRef = firebase.storage().ref().child(storagePath);
            await storageRef.put(file);
            const downloadURL = await storageRef.getDownloadURL();

            // Generate thumbnail for videos
            let thumbnail = null;
            if (mediaType === "video") {
                thumbnail = await generateVideoThumbnail(file);
            }

            // Build metadata object
            const metadata = {
                id: mediaId,
                type: mediaType,
                url: downloadURL,
                thumbnail,
                name: file.name,
                size: file.size,
                mimeType: file.type,
                storagePath,
                uploadedAt: new Date().toISOString()
            };

            // Append to Firestore step document
            await firestore
                .collection("tutorials")
                .doc(tutorialId)
                .collection("steps")
                .doc(stepId)
                .update({
                    media: firestore.FieldValue.arrayUnion(metadata)
                });

            dispatch({
                type: actions.STEP_MEDIA_UPLOAD_SUCCESS,
                payload: { stepId, mediaItem: metadata }
            });

            return metadata;
        } catch (e) {
            console.error("STEP_MEDIA_UPLOAD_FAIL", e);
            dispatch({
                type: actions.STEP_MEDIA_UPLOAD_FAIL,
                payload: e.message
            });
            throw e;
        }
    };

/**
 * Remove a media item from a tutorial step
 * Thunk: (firebase, firestore, dispatch)
 */
export const removeStepMedia =
    (tutorialId, stepId, mediaItem) => async (firebase, firestore, dispatch) => {
        try {
            dispatch({ type: actions.STEP_MEDIA_DELETE_START });

            // Delete from Storage
            const storageRef = firebase.storage().ref().child(mediaItem.storagePath);
            await storageRef.delete();

            // Remove from Firestore step document
            await firestore
                .collection("tutorials")
                .doc(tutorialId)
                .collection("steps")
                .doc(stepId)
                .update({
                    media: firestore.FieldValue.arrayRemove(mediaItem)
                });

            dispatch({
                type: actions.STEP_MEDIA_DELETE_SUCCESS,
                payload: { stepId, mediaId: mediaItem.id }
            });
        } catch (e) {
            console.error("STEP_MEDIA_DELETE_FAIL", e);
            dispatch({
                type: actions.STEP_MEDIA_DELETE_FAIL,
                payload: e.message
            });
        }
    };

/**
 * Fetch media items for a specific step
 * Thunk: (firebase, firestore, dispatch)
 */
export const fetchStepMedia =
    (tutorialId, stepId) => async (firebase, firestore, dispatch) => {
        try {
            dispatch({ type: actions.STEP_MEDIA_FETCH_START });

            const stepDoc = await firestore
                .collection("tutorials")
                .doc(tutorialId)
                .collection("steps")
                .doc(stepId)
                .get();

            const media = stepDoc.exists ? stepDoc.data().media || [] : [];

            dispatch({
                type: actions.STEP_MEDIA_FETCH_SUCCESS,
                payload: { stepId, items: media }
            });
        } catch (e) {
            console.error("STEP_MEDIA_FETCH_FAIL", e);
            dispatch({
                type: actions.STEP_MEDIA_FETCH_FAIL,
                payload: e.message
            });
        }
    };

/**
 * Clear all media state
 */
export const clearStepMediaState = () => (dispatch) => {
    dispatch({ type: actions.CLEAR_STEP_MEDIA_STATE });
};
