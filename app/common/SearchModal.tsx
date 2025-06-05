"use client";

import { useEffect, useRef, useState } from "react";
import "./search.css";
import { IoIosSearch } from "react-icons/io";
import { LuDelete } from "react-icons/lu";
import Link from "next/link";
import { useRouter } from "next/navigation";
type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function Search({ isOpen, onClose }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      setValue("");
    }
  }, [isOpen]);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/search?s=${value}`);
      onClose();
    }
  };

  return (
    <div className={`search ${isOpen ? "show-search" : ""}`}>
      <div className="search__modal-close" onClick={onClose}>
        X
      </div>
      <form className="search__form" onSubmit={(e) => e.preventDefault()}>
        <div className="search__input-wrapper">
          <input
            type="text"
            className="search__input"
            placeholder="What are you looking for?"
            value={value}
            ref={inputRef}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => handleEnter(e)}
          />
          <IoIosSearch className="search__icon" />
          {value && (
            <>
              <LuDelete
                className="search__clear"
                onClick={() => setValue("")}
              />
            </>
          )}
        </div>
      </form>
      {value && (
        <Link
          className="search__search"
          href={`/search?s=${value}`}
          onClick={onClose}
        >
          Show all products
        </Link>
      )}
    </div>
  );
}
