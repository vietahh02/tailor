"use client";
import React, { useRef, useEffect, memo } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { getListM } from "./GetListCharm";
import Image from "next/image";

const ContentLeft = ({
  handleChanegNail,
}: {
  handleChanegNail: (index: number) => void;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const ps = useRef<PerfectScrollbar | null>(null);
  const listNail = getListM();

  useEffect(() => {
    if (scrollContainerRef.current) {
      ps.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20,
      });
    }

    return () => {
      if (ps.current) {
        ps.current.destroy();
        ps.current = null;
      }
    };
  }, []);

  return (
    <div className="content-left">
      <div className="content-left-wrapper" ref={scrollContainerRef}>
        <div className="wrapper-item">
          {listNail.map((nail, index) => (
            <div
              className="item"
              key={index}
              onClick={() => handleChanegNail(index)}
            >
              <Image src={nail} alt="" style={{ width: "100%" }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(ContentLeft);
