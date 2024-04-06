import React, { useState } from "react";
import { Modal, Fade } from "@mui/material";
import styles from "./ImageGallery.module.css";
import { itemData } from "./imageData";
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ImageGallery({ sectionId }) {
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0); // Track index of selected image

  const handleOpenModal = (index) => {
    setSelectedImageIndex(index);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleNextImage = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % itemData.length); // Increment index cyclically
  };

  const handlePrevImage = (event) => {
    event.stopPropagation(); // Prevent event propagation
    setSelectedImageIndex((prevIndex) =>
      prevIndex === 0 ? itemData.length - 1 : prevIndex - 1
    ); // Decrement index cyclically
  };

  return (
    <div id={sectionId} className={styles.container}>
      {itemData.map((item, index) => (
        <img
          key={index}
          src={item.img}
          alt={item.title}
          className={styles.image}
          onClick={() => handleOpenModal(index)}
        />
      ))}
      <Modal open={open} onClose={handleCloseModal}>
        <Fade in={open} onClick={handleCloseModal}>
          <div className={styles.modalContainer}>
            <IconButton
              className={styles.nextPrevImgButton}
              aria-label="previous"
              onClick={handlePrevImage}
              disableRipple
            >
              <ArrowBackIosIcon />
            </IconButton>
            <img
              src={itemData[selectedImageIndex].img}
              alt={itemData[selectedImageIndex].title}
              className={styles.modalImage}
            />
            <IconButton
              className={styles.nextPrevImgButton}
              aria-label="next"
              onClick={handleNextImage}
              disableRipple
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ImageGallery;
