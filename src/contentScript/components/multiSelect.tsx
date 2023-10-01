import React, { useRef, useEffect, useState } from "react";
import { getURL } from "../../core/common";

const SelectedItem = ({ label, onClick }) => {
  return (
    <div style={{ padding: "4px 0px 4px 0px" }}>
      <span className="item">
        <span className="label">{label}</span>
        <span className="icon" onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="17"
            viewBox="0 0 17 17"
            width="17"
          >
            <path
              d="M8.5 0a8.5 8.5 0 110 17 8.5 8.5 0 010-17zm3.364 5.005a.7.7 0 00-.99 0l-2.44 2.44-2.439-2.44-.087-.074a.7.7 0 00-.903 1.064l2.44 2.439-2.44 2.44-.074.087a.7.7 0 001.064.903l2.439-2.441 2.44 2.441.087.074a.7.7 0 00.903-1.064l-2.441-2.44 2.441-2.439.074-.087a.7.7 0 00-.074-.903z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
        </span>
      </span>
    </div>
  );
};

const SelectMenu = ({ options, value, onChange, open }) => {
  const handleRef = useRef(null);
  useEffect(() => {
    if (handleRef.current) {
      if (open) {
        handleRef.current.style.display = "";
        const divHeight = handleRef.current.offsetHeight;
        handleRef.current.style.top = `-${divHeight + 10}px`;
      } else handleRef.current.style.display = "none";
    }
  }, [, open]);
  return (
    <div className="multi-select-content" ref={handleRef}>
      {options.map((item, index) => {
        return (
          <div
            key={index}
            className={`item ${value.includes(item.value) ? "select" : ""}`}
            onClick={() => onChange(item.value)}
          >
            <span />
            <div>{item.label}</div>
          </div>
        );
      })}
    </div>
  );
};

const MultiSelect = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={getURL("assets/css/multi-select.css")}
      />
      <div className="multi-select"> 
        <div className="multi-select-header">
          {value.length > 0 ? (
            <div className="label">
              {value.map((item, index) => {
                return (
                  <SelectedItem
                    key={index}
                    label={options.filter((e) => e.value === item)[0]?.label}
                    onClick={() => {
                      onChange(item);
                    }}
                  />
                );
              })}
            </div>
          ) : (
            <div
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                marginLeft: 10,
                fontWeight: 500,
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={() => setOpen(true)}
            >
              All Accounts
            </div>
          )}
          <div
            onClick={() => setOpen(!open)}
            id="account_switch"
            style={{
              width: 30,
              height: 30,
              marginRight: 5,
              marginBottom: 5,
              position: "absolute",
              right: 0,
              transform: `${open ? "rotate(180deg)" : ""}`,
              background: `url(${getURL(
                "assets/logos/down.svg"
              )}) no-repeat center`,
            }}
          />
        </div>
        <SelectMenu
          options={options}
          value={value}
          onChange={onChange}
          open={open}
        />
      </div>
    </>
  );
};

export default MultiSelect;
