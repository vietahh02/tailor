"use client";
import React, { memo, useEffect, useState } from "react";
import Draggable from "react-draggable";
import type { DraggableEvent, DraggableData } from "react-draggable";
import "./style/Draggle.scss";
import styled from "styled-components";
import { getCharmByIndex } from "./GetListCharm";

const Element = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Img = styled.img`
  &:hover {
    outline: 5px dashed #2563eb;
  }
`;

type Charm = {
  id: number;
  charm: number;
  name: string;
  x: number;
  y: number;
  zIndex: number;
  deg: number;
};

type Menu = {
  position: {
    x: number;
    y: number;
  };
  id: number;
};

type Props = {
  scale: number;
  handleDragStart: () => void;
  handleDragStop: (id: number, position: { x: number; y: number }) => void;
  charm: Charm;
  activeId: number;
  setActiveId?: React.Dispatch<React.SetStateAction<number>>;
  setContextMenu: React.Dispatch<React.SetStateAction<Menu | null>>;
};

const DraggleItem = ({
  scale,
  handleDragStart,
  handleDragStop,
  charm,
  activeId,
  setActiveId,
  setContextMenu,
}: Props) => {
  const [position, setPosition] = useState({ x: charm.x, y: charm.y });

  useEffect(() => {
    setPosition({ x: charm.x, y: charm.y });
  }, [charm]);

  const onDragStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };
    if (newPosition.x === position.x && newPosition.y === position.y) return;
    setPosition(newPosition);

    if (handleDragStop) {
      handleDragStop(charm.id, newPosition);
    }
  };

  const handleContextMenu = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    setContextMenu({
      position: {
        x: event.pageX,
        y: event.pageY,
      },
      id,
    });
  };

  return (
    <>
      <Draggable
        bounds="parent"
        scale={scale / 100}
        position={position}
        onStart={handleDragStart}
        onStop={onDragStop}
        onMouseDown={() => setActiveId && setActiveId(charm.id)}
      >
        <Element style={{ zIndex: charm.zIndex }}>
          <Img
            src={getCharmByIndex(charm.charm).src}
            alt=""
            draggable={false}
            style={{
              width: 200,
              height: 200,
              outline: activeId === charm.id ? "5px dashed #2563eb" : "",
            }}
            onContextMenu={(e) => handleContextMenu(e, charm.id)}
          />
        </Element>
      </Draggable>
    </>
  );
};

export default memo(DraggleItem);
