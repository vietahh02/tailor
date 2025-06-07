"use client";

import React, { memo } from "react";
import { getListCharms } from "./GetListCharm";
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

type Props<T extends DesignState> = {
  setDesignNow: React.Dispatch<React.SetStateAction<T>>;
};

const ContentFooter = <T extends DesignState>({ setDesignNow }: Props<T>) => {
  const listCharm = getListCharms();

  const handleClick = (item: number) => {
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        listCharm: [
          ...prev.design.listCharm,
          {
            id:
              prev?.design?.listCharm[prev?.design?.listCharm?.length - 1]?.id +
                1 || 0,
            charm: item,
            deg: 0,
            name: "Charm 1",
            x: 50,
            y: 50,
            zIndex: 1,
          },
        ],
      },
      index: prev.index + 1,
    }));
  };

  return (
    <div className="content-right-footer">
      <div className="footer-wrapper">
        {listCharm.map((item, index) => (
          <div key={index}>
            <Image
              src={item}
              alt={"charm"}
              onClick={() => handleClick(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ContentFooter);
