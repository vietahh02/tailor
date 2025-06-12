"use client";
import { Button, Image, Input, Slider, Space, Typography } from "antd";
import React, { useState, useRef, useEffect, useCallback } from "react";
import PerfectScrollbar from "perfect-scrollbar";
import ListDraggleItem from "./ListDraggleItem";
import "../style/Zoom.scss";
import ContentLeft from "./ContentLeft";
import ContentFooter from "./ContentFooter";
import FullScreenSpinner from "@/app/loading/Spiner";
import { DeleteOutlined } from "@ant-design/icons";
// import html2canvas from "html2canvas";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";
import { createDesignApi } from "@/app/util/api";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { useAuth } from "@/app/context/auth.context";

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

const initialDesign: Design = {
  name: "Design 1",
  background: 0,
  preview: "",
  listCharm: [],
};

const ZoomContent = () => {
  const [scale, setScale] = useState(35);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [designNow, setDesignNow] = useState<DesignState>({
    design: initialDesign,
    index: 0,
  });
  type DesignNowType = { design: typeof initialDesign; index: number };
  const [stack, setStack] = useState<DesignNowType[]>([]);
  const ps = useRef<PerfectScrollbar | null>(null);
  const isClickBF = useRef(false);
  const [activeIdCharm, setActiveIdCharm] = useState(-1);
  const [rotate, setRotate] = useState(0);
  const [name, setName] = useState("");
  const router = useRouter();
  const componentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Handle loading spinner
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Initialize and update PerfectScrollbar
  const initializeScrollbar = useCallback(() => {
    if (scrollContainerRef.current && !ps.current) {
      try {
        ps.current = new PerfectScrollbar(scrollContainerRef.current, {
          wheelSpeed: 1,
          wheelPropagation: true,
          minScrollbarLength: Math.max(20, 100 - scale / 2),
        });
      } catch (error) {
        console.error("Failed to initialize PerfectScrollbar:", error);
      }
    }
  }, [scale]);

  // Update scrollbar when scale changes
  useEffect(() => {
    if (ps.current && scrollContainerRef.current) {
      ps.current.update();
    }
  }, [scale]);

  // Initialize scrollbar on mount and clean up on unmount
  useEffect(() => {
    initializeScrollbar();
    return () => {
      if (ps.current) {
        ps.current.destroy();
        ps.current = null;
      }
    };
  }, [initializeScrollbar]);

  // Update stack for undo/redo
  useEffect(() => {
    if (isClickBF.current) {
      isClickBF.current = false;
      return;
    }
    if (designNow.index <= stack.length - 1) {
      setStack((prev) => [...prev.slice(0, designNow.index), designNow]);
    } else {
      setStack((prev) => [...prev, designNow]);
    }
  }, [designNow]);

  // Update rotation value when active charm changes
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
  };

  const handleScaleChange = (value: number) => {
    setScale(value);
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
    initializeScrollbar();
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
    setDesignNow((prev) => ({
      ...prev,
      design: {
        ...prev.design,
        listCharm: prev.design.listCharm.filter(
          (charm) => charm.id !== activeIdCharm
        ),
      },
      index: prev.index + 1,
    }));
    setActiveIdCharm(-1);
  };

  const handleTryOnNewDesign = async () => {
    toast.info("Đang tải thiết kế mới, vui lòng đợi...");
  };

  const handleCapture = async () => {
    if (!componentRef.current) return;
    try {
      const dataUrl = await toPng(componentRef.current, {
        quality: 0.95,
        pixelRatio: window.devicePixelRatio,
      });
      const file = await fetch(dataUrl)
        .then((res) => res.blob())
        .then(
          (blob) => new File([blob], "screenshot.png", { type: "image/png" })
        );
      return file;
    } catch (err) {
      console.error("Error capturing design:", err);
      toast.error("Đã có lỗi xảy ra khi lưu thiết kế hãy thử lại sau ít phút");
    }
  };

  const handleSaveNewDesign = async () => {
    if (!name.trim()) {
      toast.error("Vui lòng nhập tên trước khi chụp ảnh");
      return;
    }

    const file = await handleCapture();
    if (!file) return;

    const designToSave = {
      name: name,
      background: designNow.design.background,
      listCharm: designNow.design.listCharm.map((charm) => ({
        charm: charm.charm,
        name: charm.name,
        x: charm.x,
        y: charm.y,
        zIndex: charm.zIndex,
        deg: charm.deg,
      })),
    };

    try {
      const res = (await createDesignApi(
        JSON.stringify(designToSave),
        file
      )) as any;
      if (res.message === "Design created successfully") {
        toast.success("Lưu thiết kế thành công");
        router.push("/designs");
      } else {
        toast.info("Hãy đăng nhập để có thể lưu bản thiết kế");
        console.error("Error saving design:", res);
      }
    } catch (err) {
      console.error("Error saving design:", err);
      toast.error("Lưu thiết kế thất bại");
    }
  };

  return (
    <div className="zoom-container">
      <div className="zoom-container-header">
        <div className="zoom-container-header-left">
          <FaHome
            style={{ fontSize: 20, margin: " 0 5px", cursor: "pointer" }}
            onClick={() => router.push("/designs")}
          />
          <div className="zoom-container-header-left-buttons">
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
                />
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
                />
              </svg>
            </Button>
          </div>
          <Input
            placeholder="Nhập tên Design"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: 200, fontSize: 18 }}
          />
        </div>

        <div className="zoom-container-header-right">
          {activeIdCharm !== -1 && (
            <>
              <Space
                style={{ marginLeft: 20 }}
                className="change-rotation-charm"
              >
                <DeleteOutlined
                  style={{ color: "red", cursor: "pointer", fontSize: 18 }}
                  onClick={handleDeleteCharm}
                />
              </Space>
              <Space
                style={{ marginLeft: 20 }}
                className="change-rotation-charm"
              >
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
            </>
          )}
          <Space style={{ marginLeft: 20 }}>
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
                  <FullScreenSpinner />
                ) : (
                  <div className="scroll-content">
                    <div className="scroll-content-layer1">
                      <div className="scroll-content-layer2">
                        <div className="scroll-content-layer3">
                          <div
                            className="scroll-content-layer4"
                            ref={componentRef}
                          >
                            <ListDraggleItem
                              componentRef={componentRef}
                              rotate={rotate}
                              designNow={designNow}
                              scale={scale}
                              handleDragStart={handleDragStart}
                              handleDragStop={handleDragStop}
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
    </div>
  );
};

export default ZoomContent;
