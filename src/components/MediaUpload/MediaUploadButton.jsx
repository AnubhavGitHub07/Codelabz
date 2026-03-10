import React, { useRef, useState } from "react";
import {
    Box,
    Button,
    Typography,
    LinearProgress,
    Paper
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getAllAcceptedTypes, getMediaType, MAX_SIZES } from "../../store/actions";

const MediaUploadButton = ({
    onUpload,
    onError,
    maxItems = 5,
    currentCount = 0,
    disabled = false
}) => {
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);

    const acceptedTypes = getAllAcceptedTypes();
    const isMaxReached = currentCount >= maxItems;

    const validateFile = (file) => {
        const mediaType = getMediaType(file.type);
        if (!mediaType) {
            return `Unsupported file type: ${file.type}`;
        }
        if (file.size > MAX_SIZES[mediaType]) {
            const maxMB = Math.round(MAX_SIZES[mediaType] / 1024 / 1024);
            return `File too large. Max for ${mediaType}: ${maxMB} MB`;
        }
        if (currentCount >= maxItems) {
            return `Maximum ${maxItems} media items per step`;
        }
        return null;
    };

    const handleFile = async (file) => {
        const error = validateFile(file);
        if (error) {
            onError?.(error);
            return;
        }

        setUploading(true);
        try {
            await onUpload(file);
        } catch (e) {
            onError?.(e.message || "Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleInputChange = (e) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
        // Reset input so the same file can be re-selected
        e.target.value = "";
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <Paper
            variant="outlined"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            sx={{
                p: 2,
                textAlign: "center",
                border: isDragOver
                    ? "2px dashed #1976d2"
                    : "2px dashed #ccc",
                borderRadius: 2,
                backgroundColor: isDragOver
                    ? "rgba(25, 118, 210, 0.04)"
                    : "transparent",
                cursor: disabled || isMaxReached ? "not-allowed" : "pointer",
                opacity: disabled || isMaxReached ? 0.5 : 1,
                transition: "all 0.2s ease"
            }}
        >
            <input
                ref={fileInputRef}
                type="file"
                accept={acceptedTypes.join(",")}
                onChange={handleInputChange}
                style={{ display: "none" }}
                data-testid="media-upload-input"
            />

            {uploading ? (
                <Box sx={{ width: "100%" }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Uploading…
                    </Typography>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    <Button
                        variant="outlined"
                        startIcon={<CloudUploadIcon />}
                        disabled={disabled || isMaxReached}
                        onClick={() => fileInputRef.current?.click()}
                        data-testid="media-upload-button"
                        sx={{ mb: 1 }}
                    >
                        Upload Media
                    </Button>
                    <Typography variant="caption" display="block" color="text.secondary">
                        {isMaxReached
                            ? `Maximum ${maxItems} items reached`
                            : "Images, GIFs, or Videos • Drag & drop or click"}
                    </Typography>
                    <Typography variant="caption" display="block" color="text.secondary">
                        {`${currentCount}/${maxItems} items`}
                    </Typography>
                </>
            )}
        </Paper>
    );
};

export default MediaUploadButton;
