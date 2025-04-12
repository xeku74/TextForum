import React, { useState, useRef, useCallback } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import styles from './AvatarEditorModal.module.css';

const AvatarEditorModal = ({ isOpen, onClose, onSave, currentAvatar }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || null);
  const [crop, setCrop] = useState({ 
    unit: '%', 
    width: 100, 
    height: 100,
    aspect: 1 
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setPreviewUrl(reader.result);
        setSelectedFile(e.target.files[0]);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoaded = useCallback((img) => {
    imgRef.current = img;
    return false;
  }, []);

  const generateCrop = useCallback(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    const pixelRatio = window.devicePixelRatio;
    canvas.width = crop.width * pixelRatio;
    canvas.height = crop.height * pixelRatio;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );
  }, [completedCrop]);

  const handleSave = () => {
    generateCrop();
    
    if (previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      canvas.toBlob(
        (blob) => {
          const avatarUrl = URL.createObjectURL(blob);
          onSave(avatarUrl);
          onClose();
        },
        'image/jpeg',
        0.95
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Edit Avatar</h3>
          <button onClick={onClose} className={styles.closeButton}>✕</button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.uploadSection}>
            <input
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              className={styles.fileInput}
              id="avatar-upload"
            />
            <label htmlFor="avatar-upload" className={styles.uploadButton}>
              Choose Image
            </label>
          </div>

          {previewUrl && (
            <div className={styles.cropContainer}>
              <ReactCrop
                src={previewUrl}
                onImageLoaded={onImageLoaded}
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                circularCrop
                keepSelection
              />
            </div>
          )}

          <div className={styles.previewContainer}>
            <h4>Preview</h4>
            <div className={styles.canvasPreview}>
              <canvas
                ref={previewCanvasRef}
                style={{
                  width: completedCrop?.width ?? 0,
                  height: completedCrop?.height ?? 0,
                  borderRadius: '50%',
                  objectFit: 'contain'
                }}
              />
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button 
            onClick={handleSave} 
            className={styles.saveButton}
            disabled={!completedCrop?.width || !completedCrop?.height}
          >
            Save Avatar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarEditorModal; 