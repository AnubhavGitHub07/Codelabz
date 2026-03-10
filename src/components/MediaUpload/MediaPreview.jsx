import React, { useState } from "react";
import {
    Box,
    ImageList,
    ImageListItem,
    IconButton,
    Dialog,
    DialogContent,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MediaPreview = ({
    mediaItems = [],
    editable = false,
    onRemove,
    className = ""
}) => {
    const [lightboxItem, setLightboxItem] = useState(null);

    if (!mediaItems || mediaItems.length === 0) return null;

    const handleClickItem = (item) => {
        setLightboxItem(item);
    };

    const handleCloseLightbox = () => {
        setLightboxItem(null);
    };

    const renderMedia = (item, inLightbox = false) => {
        const styles = inLightbox
            ? { maxWidth: "100%", maxHeight: "80vh", objectFit: "contain" }
            : {
                width: "100%",
                height: "140px",
                objectFit: "cover",
                borderRadius: "8px",
                cursor: "pointer"
            };

        if (item.type === "video") {
            return (
                <video
                    src={item.url}
                    poster={item.thumbnail || undefined}
                    controls={inLightbox}
                    muted={!inLightbox}
                    style={styles}
                    onClick={!inLightbox ? () => handleClickItem(item) : undefined}
                    data-testid={`media-video-${item.id}`}
                />
            );
        }

        return (
            <img
                src={item.url}
                alt={item.name || "media"}
                loading="lazy"
                style={styles}
                onClick={!inLightbox ? () => handleClickItem(item) : undefined}
                data-testid={`media-image-${item.id}`}
            />
        );
    };

    return (
        <>
            <ImageList
                cols={3}
                gap={8}
                className={className}
                sx={{ mt: 1 }}
                data-testid="media-preview-grid"
            >
                {mediaItems.map((item) => (
                    <ImageListItem
                        key={item.id}
                        sx={{ position: "relative", borderRadius: "8px", overflow: "hidden" }}
                    >
                        {renderMedia(item)}
                        {editable && onRemove && (
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(item);
                                }}
                                data-testid={`media-remove-${item.id}`}
                                sx={{
                                    position: "absolute",
                                    top: 4,
                                    right: 4,
                                    backgroundColor: "rgba(0,0,0,0.6)",
                                    color: "#fff",
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
                                    width: 24,
                                    height: 24
                                }}
                            >
                                <CloseIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        )}
                        <Typography
                            variant="caption"
                            noWrap
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                backgroundColor: "rgba(0,0,0,0.5)",
                                color: "#fff",
                                px: 0.5,
                                py: 0.25,
                                fontSize: "0.65rem"
                            }}
                        >
                            {item.name}
                        </Typography>
                    </ImageListItem>
                ))}
            </ImageList>

            {/* Lightbox Dialog */}
            <Dialog
                open={!!lightboxItem}
                onClose={handleCloseLightbox}
                maxWidth="lg"
                data-testid="media-lightbox"
            >
                <DialogContent
                    sx={{
                        p: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    <IconButton
                        onClick={handleCloseLightbox}
                        sx={{ alignSelf: "flex-end", mb: 0.5 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    {lightboxItem && renderMedia(lightboxItem, true)}
                    {lightboxItem && (
                        <Typography variant="caption" sx={{ mt: 1 }} color="text.secondary">
                            {lightboxItem.name} •{" "}
                            {lightboxItem.type?.toUpperCase()} •{" "}
                            {(lightboxItem.size / 1024).toFixed(1)} KB
                        </Typography>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};

export default MediaPreview;
