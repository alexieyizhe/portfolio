import React, { useState, useCallback } from "react";
import styled from "styled-components";

import Button from "~components/Button";
import Particle from "~components/Particle";
import { BaseElementProps } from "~src/types/BaseElementProps";
import { Size } from "~types/Size";

export interface GalleryProps extends BaseElementProps {
  images: string[];
  particles?: boolean;
  defaultIndex?: number;
}

const BUTTON_OFFSET = 20;

const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  & > .left-button {
    position: relative;
    right: -${BUTTON_OFFSET}px;
    z-index: 2;
  }

  & > .right-button {
    position: relative;
    left: -${BUTTON_OFFSET}px;
    z-index: 2;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 300px;
  height: 300px;

  overflow: hidden;

  display: grid;
  justify-content: center;
  align-items: center;

  & > * {
    grid-row: 1;
    grid-column: 1;
  }

  &:after {
    box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.2);
    content: "";
    display: block;
    position: absolute;
    top: 0;
    height: 100%;
    width: 100%;

    border-radius: 50%;
  }
`;

const GalleryImage = styled.img<{ shown: boolean }>`
  width: 100%;

  transition: opacity 150ms ease-in;
  opacity: ${({ shown }) => (shown ? 1 : 0)};
`;

const ParticleTop = styled(Particle)`
  position: absolute;
  top: 0;
  left: 25%;
`;

const ParticleLeft = styled(Particle)`
  position: absolute;
  bottom: 40px;
  left: 6%;
`;

const ParticleRight = styled(Particle)`
  position: absolute;
  bottom: 2px;
  right: 15%;
`;

const Gallery: React.FC<GalleryProps> = ({
  images,
  particles,
  defaultIndex = 0,
}) => {
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
      {images.length > 1 && (
        <Button
          name="chevron-left"
          className="left-button"
          onClick={goPrevImg}
          disabled={curImgIndex === 0}
        />
      )}
      <ImageContainer>
        {images.map((image, i) => (
          <GalleryImage key={image} src={image} shown={i === curImgIndex} />
        ))}
      </ImageContainer>

      {images.length > 1 && (
        <Button
          name="chevron-right"
          className="right-button"
          onClick={goNextImg}
          disabled={curImgIndex === images.length - 1}
        />
      )}

      {particles && (
        <>
          <ParticleTop float color="green" size={Size.SMALL} />
          <ParticleLeft float color="red" size={0.6} />
          <ParticleRight float color="blue" size={0.75} />
        </>
      )}
    </Container>
  );
};

export default Gallery;
