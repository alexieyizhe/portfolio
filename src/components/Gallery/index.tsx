import React, { useState, useCallback } from "react";
import styled from "styled-components";

import { Button } from "~src/components";
import { BaseElementProps } from "~utils/types/BaseElementProps";

export interface GalleryProps extends BaseElementProps {
  images: string[];
  defaultIndex?: number;
}

const BUTTON_OFFSET = 20;

const Container = styled.div`
  display: flex;
  align-items: center;

  & > .left-button {
    position: relative;
    right: -${BUTTON_OFFSET}px;
  }

  & > .right-button {
    position: relative;
    left: -${BUTTON_OFFSET}px;
  }
`;

const ImageContainer = styled.div`
  border-radius: 50%;
  width: 300px;
  height: 300px;

  overflow: hidden;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);

  display: grid;
  justify-content: center;
  align-items: center;

  & > img {
    grid-row: 1;
    grid-column: 1;
  }
`;

const GalleryImage = styled.img<{ shown: boolean }>`
  width: 100%;

  transition: opacity 150ms ease-in;
  opacity: ${({ shown }) => (shown ? 1 : 0)};
`;

const Gallery: React.FC<GalleryProps> = ({ images, defaultIndex = 0 }) => {
  const [curImgIndex, setCurImgIndex] = useState(defaultIndex);

  const goPrevImg = useCallback(
    () => setCurImgIndex(curIndex => Math.max(0, curIndex - 1)),
    [setCurImgIndex]
  );

  const goNextImg = useCallback(
    () => setCurImgIndex(curIndex => Math.min(images.length - 1, curIndex + 1)),
    [images.length]
  );

  return (
    <Container>
      <Button
        name="chevron-left"
        className="left-button"
        onClick={goPrevImg}
        disabled={curImgIndex === 0}
      />
      <ImageContainer>
        {images.map((image, i) => (
          <GalleryImage key={image} src={image} shown={i === curImgIndex} />
        ))}
      </ImageContainer>
      <Button
        name="chevron-right"
        className="right-button"
        onClick={goNextImg}
        disabled={curImgIndex === images.length - 1}
      />
    </Container>
  );
};

export default Gallery;
