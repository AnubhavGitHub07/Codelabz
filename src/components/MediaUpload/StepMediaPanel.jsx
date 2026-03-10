import React, { useEffect } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import MediaUploadButton from "./MediaUploadButton";
import MediaPreview from "./MediaPreview";
import {
    addStepMedia,
    removeStepMedia,
    fetchStepMedia,
    MAX_ITEMS_PER_STEP
} from "../../store/actions";

const StepMediaPanel = ({ tutorialId, stepId, editable = true }) => {
    const dispatch = useDispatch();
    const firebase = useFirebase();
    const firestore = useFirestore();

    const mediaItems = useSelector(
        ({ media }) => media.byStep[stepId] || []
    );
    const { uploading, uploadError } = useSelector(({ media }) => ({
        uploading: media.uploading,
        uploadError: media.uploadError
    }));
    const { deleting, deleteError } = useSelector(({ media }) => ({
        deleting: media.deleting,
        deleteError: media.deleteError
    }));

    // Fetch media on mount or when stepId changes
    useEffect(() => {
        if (tutorialId && stepId) {
            fetchStepMedia(tutorialId, stepId)(firebase, firestore, dispatch);
        }
    }, [tutorialId, stepId]);

    const handleUpload = async (file) => {
        await addStepMedia(tutorialId, stepId, file)(firebase, firestore, dispatch);
    };

    const handleRemove = (mediaItem) => {
        removeStepMedia(tutorialId, stepId, mediaItem)(firebase, firestore, dispatch);
    };

    const handleError = (message) => {
        console.error("Media upload error:", message);
    };

    const hasMedia = mediaItems.length > 0;

    // Don't render anything if not editable and no media
    if (!editable && !hasMedia) return null;

    return (
        <Box
            sx={{ mt: 2, mb: 1 }}
            data-testid="step-media-panel"
        >
            {(editable || hasMedia) && (
                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                    sx={{ mb: 1 }}
                >
                    Media Attachments
                </Typography>
            )}

            {editable && (
                <MediaUploadButton
                    onUpload={handleUpload}
                    onError={handleError}
                    maxItems={MAX_ITEMS_PER_STEP}
                    currentCount={mediaItems.length}
                    disabled={uploading || deleting}
                />
            )}

            <MediaPreview
                mediaItems={mediaItems}
                editable={editable}
                onRemove={handleRemove}
            />

            {/* Error snackbars */}
            <Snackbar
                open={!!uploadError}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity="error" variant="filled">
                    {uploadError}
                </Alert>
            </Snackbar>

            <Snackbar
                open={!!deleteError}
                autoHideDuration={5000}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            >
                <Alert severity="error" variant="filled">
                    {deleteError}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default StepMediaPanel;
