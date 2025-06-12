"use client";
import React, { memo, useEffect, useState } from "react";
import { Rnd } from "react-rnd";
import "../style/Draggle.scss";
import styled from "styled-components";
import { getCharmByIndex } from "../common/GetListCharm";

const Element = styled.div`
  position: absolute;
  cursor: move;
  user-select: none;
  width: 200px;
  height: 200px;
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
  activeIdCharm: number;
  setActiveIdCharm?: React.Dispatch<React.SetStateAction<number>>;
  // setContextMenu: React.Dispatch<React.SetStateAction<Menu | null>>;
  rotate: number;
};

const DraggleItem = ({
  scale,
  handleDragStart,
  handleDragStop,
  charm,
  activeIdCharm,
  setActiveIdCharm,
  // setContextMenu,
  rotate,
}: Props) => {
  const [position, setPosition] = useState({ x: charm.x, y: charm.y });

  useEffect(() => {
    setPosition({ x: charm.x, y: charm.y });
  }, [charm]);

  const onDragStop = (_: any, data: { x: number; y: number }) => {
    const newPosition = { x: data.x, y: data.y };
    if (newPosition.x === position.x && newPosition.y === position.y) return;
    setPosition(newPosition);
    handleDragStop?.(charm.id, newPosition);
  };

  // const handleContextMenu = (event: React.MouseEvent, id: number) => {
  //   event.preventDefault();
  //   setContextMenu({
  //     position: {
  //       x: event.pageX,
  //       y: event.pageY,
  //     },
  //     id,
  //   });
  // };

  return (
    <Rnd
      // size={{ width: 200, height: 200 }}
      position={position}
      onDragStart={handleDragStart}
      onDragStop={onDragStop}
      bounds="parent"
      scale={scale / 100}
      enableResizing={false}
      style={{ zIndex: charm.zIndex }}
      onMouseDown={() => setActiveIdCharm?.(charm.id)}
    >
      <Element>
        <Img
          src={getCharmByIndex(charm.charm).src}
          alt=""
          draggable={false}
          style={{
            outline: activeIdCharm === charm.id ? "5px dashed #2563eb" : "",
            transform: `rotate(${
              activeIdCharm !== charm.id ? charm.deg : rotate
            }deg)`,
          }}
          // onContextMenu={(e) => handleContextMenu(e, charm.id)}
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        />
      </Element>
    </Rnd>
  );
};

export default memo(DraggleItem);
