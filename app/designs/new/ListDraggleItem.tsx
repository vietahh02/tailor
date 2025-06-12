"use client";
import React, { memo, useEffect } from "react";
import Background from "./Background";
import "../style/ListDraggleItem.scss";
import DraggleItem from "./DraggleItem";

type Charm = {
  id: number;
  charm: number;
  name: string;
  x: number;
  y: number;
  zIndex: number;
  deg: number;
};

type Design = {
  name: string;
  background: number;
  preview: string;
  listCharm: Charm[];
};

type DesignState = {
  design: Design;
  index: number;
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
  designNow: DesignState;
  // handleDeleteCharm?: () => void;
  // setContextMenu: React.Dispatch<React.SetStateAction<Menu | null>>;
  // handleRotateDeg?: (id: number, deg: number) => void;
  activeIdCharm: number;
  setActiveIdCharm: React.Dispatch<React.SetStateAction<number>>;
  rotate: number;
  componentRef: React.RefObject<HTMLDivElement | null>;
};

const ListDraggleItem = ({
  scale,
  handleDragStart,
  handleDragStop,
  designNow,
  // handleDeleteCharm,
  activeIdCharm,
  setActiveIdCharm,
  // setContextMenu,
  rotate,
  componentRef,
}: // handleRotateDeg,
Props) => {
  const baseHeight = 1512;
  const baseWidth = 1512;

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement;

    // Nếu click vào trong vùng .react-draggable
    if (target.closest(".react-draggable")) {
      return; // không làm gì cả
    }

    // Nếu click vào trong vùng .zoom-container
    if (target.closest(".change-rotation-charm")) {
      return; // không làm gì cả
    }

    // Ngược lại (click ra ngoài cả 2) thì reset state
    setActiveIdCharm(-1);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="list-container">
      <div
        className="list-wrapper"
        style={{
          width: baseWidth * (scale / 100) + "px",
          height: baseHeight * (scale / 100) + "px",
        }}
      >
        <div
          className="list-content1"
          style={{
            width: baseWidth,
            height: baseHeight,
            transform: `scale(${scale / 100})`,
            transformOrigin: "0px 0px",
          }}
        >
          <div
            className="list-content2"
            style={{
              width: baseWidth,
              height: baseHeight,
            }}
          >
            <Background designNow={designNow} />
            {designNow?.design?.listCharm?.map((item, index) => (
              <DraggleItem
                rotate={rotate}
                activeIdCharm={activeIdCharm}
                setActiveIdCharm={setActiveIdCharm}
                key={index}
                scale={scale}
                charm={item}
                handleDragStart={handleDragStart}
                handleDragStop={handleDragStop}
                // handleDeleteCharm={handleDeleteCharm}
                // setContextMenu={setContextMenu}
                // handleRotateDeg={handleRotateDeg}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ListDraggleItem);
