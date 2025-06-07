"use client";
import { Button, Menu, Slider, Space, Typography } from "antd";
import React, { useState, useRef, useEffect, useCallback } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import ListDraggleItem from "./ListDraggleItem";
import "./style/Zoom.scss";
import ContentLeft from "./ContentLeft";
import ContentFooter from "./ContentFooter";
import CatLoader from "./CatLoader";

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

// type DesignNow = {
//   designNow: DesignState;
// };

const initialDesign = {
  name: "Design 1",
  background: 0,
  preview: "",
  listCharm: [
    {
      id: 0,
      charm: 0,
      name: "Charm 1",
      x: 50,
      y: 50,
      zIndex: 1,
      deg: 0,
    },
    {
      id: 1,
      charm: 0,
      name: "Charm 1",
      x: 50,
      y: 50,
      zIndex: 1,
      deg: 20,
    },
  ],
};

type Menu = {
  position: {
    x: number;
    y: number;
  };
  id: number;
};
const ZoomContent = () => {
  const [scale, setScale] = useState(35);
  const scrollContainerRef = useRef(null);
  const [designNow, setDesignNow] = useState<DesignState>({
    design: initialDesign,
    index: 0,
  });
  type DesignType = typeof initialDesign;
  type DesignNowType = { design: DesignType; index: number };
  const [stack, setStack] = useState<DesignNowType[]>([]);
  const ps = useRef<PerfectScrollbar | null>(null);
  const isClickBF = useRef(false);
  const [activeIdCharm, setActiveIdCharm] = useState(-1);
  const [rotate, setRotate] = useState(0);

  const [isLoading, setIsLoading] = useState(true);
  const [contextMenu, setContextMenu] = useState<Menu | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1);

    window.addEventListener("click", () => setContextMenu(null));

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", () => setContextMenu(null));
    };
  }, []);

  const initializeScrollbar = () => {
    if (scrollContainerRef.current) {
      if (ps.current) {
        ps.current.destroy();
      }
      ps.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: Math.max(20, 100 - scale / 2),
      });
    }
  };

  useEffect(() => {
    initializeScrollbar();
    return () => {
      if (ps.current) {
        ps.current.destroy();
        ps.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (isClickBF.current) {
      isClickBF.current = false;
      return;
    }
    if (designNow.index <= stack.length - 1) {
      setStack((prev) => {
        const newStack = [...prev.slice(0, designNow.index), designNow];
        return newStack;
      });
    } else {
      // if (stack[stack.length - 1] !== designNow) {
      setStack((prev) => [...prev, designNow]);
      // }
    }
    console.log(stack);
  }, [designNow]);

  useEffect(() => {
    if (activeIdCharm === -1) return;
    setRotate(
      designNow.design.listCharm.find((c) => c.id === activeIdCharm)?.deg ?? 0
    );
  }, [activeIdCharm]);

  const handleRotateChange = (value: number) => {
    setRotate(value);
  };

  const handleAfterRotateChange = () => {
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        listCharm: prev.design.listCharm.map((charm) => {
          if (charm.id === activeIdCharm) {
            return { ...charm, deg: rotate };
          }
          return charm;
        }),
      },
      index: prev.index + 1,
    }));
    console.log(designNow.design.listCharm);
  };

  const handleScaleChange = (value: number) => {
    setScale(value);
    if (ps.current) {
      ps.current.update();
    }
  };

  const handleDragStart = () => {
    if (ps.current) {
      ps.current.destroy();
      ps.current = null;
    }
  };

  const handleDragStop = (id: number, position: { x: number; y: number }) => {
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        listCharm: prev.design.listCharm.map((charm) => {
          if (charm.id === id) {
            return { ...charm, x: position.x, y: position.y };
          }
          return charm;
        }),
      },
      index: prev.index + 1,
    }));

    if (scrollContainerRef.current) {
      ps.current = new PerfectScrollbar(scrollContainerRef.current, {
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 20,
      });
    }
  };

  const handleChangeNail = useCallback((index: number) => {
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        background: index,
      },
      index: prev.index + 1,
    }));
  }, []);

  const handleBack = () => {
    isClickBF.current = true;
    if (designNow.index > 0) {
      setDesignNow((prev) => ({
        ...prev,
        index: prev.index - 1,
        design: stack[prev.index - 1].design,
      }));
    }
  };

  const handleForward = () => {
    isClickBF.current = true;
    if (designNow.index < stack.length - 1) {
      setDesignNow((prev) => ({
        ...prev,
        index: prev.index + 1,
        design: stack[designNow.index + 1].design,
      }));
    }
  };

  const handleDeleteCharm = () => {
    if (!contextMenu) return;
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        listCharm: prev.design.listCharm.filter(
          (charm) => charm.id !== contextMenu.id
        ),
      },
      index: prev.index + 1,
    }));
    setContextMenu(null);
  };

  const handleTryOnNewDesign = () => {
    alert("Try On clicked");
  };

  const handleSaveNewDesign = () => {
    alert("Save clicked");
  };

  return (
    <div className="zoom-container">
      <div className="zoom-container-header">
        <div className="zoom-container-header-left">
          <Button
            className={designNow.index > 0 ? "active" : "none"}
            onClick={handleBack}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m6.05 7.25 2.22-2.22A.75.75 0 0 0 7.2 3.97L4.43 6.75c-.69.68-.69 1.8 0 2.48l2.83 2.83A.75.75 0 0 0 8.32 11L6.07 8.75H16a4.25 4.25 0 1 1 0 8.5h-4a.75.75 0 1 0 0 1.5h4a5.75 5.75 0 0 0 0-11.5H6.05z"
              ></path>
            </svg>
          </Button>

          <Button
            className={designNow.index < stack.length - 1 ? "active" : "none"}
            onClick={handleForward}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="m18.054 7.252-2.296-2.296a.75.75 0 0 1 1.06-1.06l2.83 2.828a1.75 1.75 0 0 1 0 2.475l-2.832 2.831a.75.75 0 0 1-1.06-1.06l2.219-2.22H8a4.25 4.25 0 0 0 0 8.5h4a.75.75 0 0 1 0 1.5H8a5.75 5.75 0 0 1 0-11.5h10c.018 0 .036 0 .054.002Z"
              ></path>
            </svg>
          </Button>
        </div>

        <div className="zoom-container-header-right">
          {activeIdCharm !== -1 && (
            <Space style={{ marginLeft: 30 }} className="change-rotation-charm">
              <Typography.Text>Xoay:</Typography.Text>
              <Slider
                min={0}
                max={360}
                step={1}
                value={rotate}
                onChange={handleRotateChange}
                onAfterChange={handleAfterRotateChange}
                style={{ width: "200px" }}
                tooltip={{ formatter: null }}
              />
              <Typography.Text>{rotate}</Typography.Text>
            </Space>
          )}
          <Space style={{ marginLeft: 30 }}>
            <Typography.Text>Phóng to:</Typography.Text>
            <Slider
              min={10}
              max={150}
              step={1}
              value={scale}
              onChange={handleScaleChange}
              style={{ width: "200px" }}
              tooltip={{ formatter: null }}
            />
            <Typography.Text>{scale}%</Typography.Text>
          </Space>

          <Space style={{ marginLeft: 30 }}>
            <Button type="primary" onClick={handleTryOnNewDesign}>
              Try On
            </Button>
            <Button type="default" onClick={handleSaveNewDesign}>
              Save
            </Button>
          </Space>
        </div>
      </div>
      <div className="zoom-container-content">
        <ContentLeft handleChanegNail={handleChangeNail} />
        <div className="content-right">
          <div className="content-right-draggable" draggable={false}>
            <div className="content-right-draggable-content">
              <div ref={scrollContainerRef} className="scroll-container">
                {isLoading ? (
                  <CatLoader />
                ) : (
                  <div className="scroll-content">
                    <div className="scroll-content-layer1">
                      <div className="scroll-content-layer2">
                        <div className="scroll-content-layer3">
                          <div className="scroll-content-layer4">
                            <ListDraggleItem
                              rotate={rotate}
                              designNow={designNow}
                              scale={scale}
                              handleDragStart={handleDragStart}
                              handleDragStop={handleDragStop}
                              handleDeleteCharm={handleDeleteCharm}
                              setContextMenu={setContextMenu}
                              // handleRotateDeg={handleRotateDeg}
                              activeIdCharm={activeIdCharm}
                              setActiveIdCharm={setActiveIdCharm}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <ContentFooter setDesignNow={setDesignNow} />
        </div>
      </div>

      {contextMenu && (
        <div
          className="position-absolute bg-white border shadow-sm rounded"
          style={{
            top: contextMenu.position.y,
            left: contextMenu.position.x,
            minWidth: 150,
            fontSize: 20,
          }}
        >
          <ul className="list-group">
            <li
              className="list-group-item list-group-item-action"
              style={{ color: "red" }}
              onClick={handleDeleteCharm}
            >
              Delete
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ZoomContent;
