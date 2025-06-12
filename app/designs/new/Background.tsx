"use client";

import React, { memo } from "react";
import "../style/Background.scss";
import { getMByIndex } from "../common/GetListCharm";
import Image from "next/image";

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

type DesignNow = {
  designNow: DesignState;
};

const Background = ({ designNow }: DesignNow) => {
  const baseHeight = 1512;
  const baseWidth = 1512;

  return (
    <div className="background-container" draggable={false}>
      <div className="background-wrapper">
        <div
          className="background-content"
          style={{
            width: baseWidth,
            height: baseHeight,
          }}
        >
          <Image
            className="background-img"
            src={getMByIndex(designNow.design.background)}
            alt=""
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(Background);
