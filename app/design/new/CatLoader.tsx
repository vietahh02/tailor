import React from "react";
import styled, { keyframes } from "styled-components";

const loop = keyframes`
  from {
    transform: rotate(0) translateX(6em);
  }
  to {
    transform: rotate(-1turn) translateX(6em);
  }
`;

const LoaderWrapper = styled.div`
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  height: calc(100vh - 160px);
  width: calc(100vw - 120px);
  line-height: 1.5;
  font-family: Arial, Helvetica, sans-serif;
`;

const LoadingText = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.9rem;
`;

const Cat = styled.div`
  margin: auto;
  position: relative;
  width: 16em;
  height: 16em;
`;

interface CatSegmentProps {
  rotate: number;
  delay: number;
}

const CatSegment = styled.div<CatSegmentProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3em;
  height: 2em;
  transform: translate(-50%, -50%) rotate(${(props) => props.rotate}deg);

  &:before {
    animation: ${loop} 2s cubic-bezier(0.6, 0, 0.4, 1) infinite;
    animation-delay: ${(props) => props.delay}s;
    background: linear-gradient(90deg, white 20%, #e6e6e6 20% 80%, white 80%);
    border-radius: 0.25em;
    content: "";
    display: block;
    transform: translateX(6em);
    width: 100%;
    height: 100%;
    will-change: transform;
  }

  &:first-child {
    width: 4em;
    height: 4em;
    z-index: 1;
    &:before {
      background: radial-gradient(
          0.25em 0.25em at 1.25em 1.6em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          0.75em 0.75em at 1.25em 1.75em,
          #1a1a1a 48%,
          rgba(26, 26, 26, 0) 50%
        ),
        radial-gradient(
          0.25em 0.25em at 2.75em 1.6em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          0.75em 0.75em at 2.75em 1.75em,
          #1a1a1a 48%,
          rgba(26, 26, 26, 0) 50%
        ),
        radial-gradient(
          0.9em 0.8em at 1.5em 2.65em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          0.9em 0.8em at 2.5em 2.65em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          1em 0.8em at 1.6em 2.75em,
          #cccccc 48%,
          rgba(204, 204, 204, 0) 50%
        ),
        radial-gradient(
          1em 0.8em at 2.4em 2.75em,
          #cccccc 48%,
          rgba(204, 204, 204, 0) 50%
        ),
        radial-gradient(
          0.75em 0.75em at 50% 2.5em,
          #e69999 48%,
          rgba(230, 153, 153, 0) 50%
        ),
        radial-gradient(
          4em 3em at 50% 2em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          4em 3em at 50% 2.2em,
          #cccccc 48%,
          rgba(204, 204, 204, 0) 50%
        ),
        radial-gradient(
          1em 3em at 0.75em 1.5em,
          #e69999 39%,
          white 40% 49%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          1em 3em at 3.25em 1.5em,
          #e69999 39%,
          white 40% 49%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          1em 2em at 0.5em 2.8em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          1em 2em at 0.5em 3em,
          #cccccc 48%,
          rgba(204, 204, 204, 0) 50%
        ),
        radial-gradient(
          1em 2em at 3.5em 2.8em,
          white 48%,
          rgba(255, 255, 255, 0) 50%
        ),
        radial-gradient(
          1em 2em at 3.5em 3em,
          #cccccc 48%,
          rgba(204, 204, 204, 0) 50%
        );
      background-repeat: no-repeat;
    }
  }

  &:last-child {
    width: 3em;
    height: 4em;
    &:before {
      background: linear-gradient(90deg, white 20%, #e6e6e6 20% 80%, white 80%)
          0 1.5em/3em 0.5em,
        radial-gradient(
            3em 2em at top center,
            #e6e6e6 30%,
            white 31% 48%,
            rgba(255, 255, 255, 0) 50%
          )
          0 2em/3em 2em,
        radial-gradient(
            1em 4em at 0.5em 0,
            white 48%,
            rgba(255, 255, 255, 0) 50%
          )
          0 2em/3em 2em,
        radial-gradient(
            1em 4em at 2.5em 0,
            white 48%,
            rgba(255, 255, 255, 0) 50%
          )
          0 2em/3em 2em;
      background-repeat: no-repeat;
    }
  }
`;

const CatLoader = () => {
  const segments = Array.from({ length: 30 }, (_, i) => {
    const rotate = -20 + (40 / 29) * i;
    const delay = i * 0.02;
    return { rotate, delay };
  });

  return (
    <LoaderWrapper>
      <LoadingText>Đang tải...</LoadingText>
      <Cat>
        {segments.map((segment, index) => (
          <CatSegment
            key={index}
            rotate={segment.rotate}
            delay={segment.delay}
          />
        ))}
      </Cat>
    </LoaderWrapper>
  );
};

export default CatLoader;
