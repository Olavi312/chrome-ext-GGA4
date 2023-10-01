import React, { useEffect, useReducer, useRef, useState } from "react";
import { getURL } from "../../core/common";
import { BOTTOM_MESSAGE_URL } from "../../core/constants";
import Papa from "papaparse";
import MultiSelect from "./multiSelect";

const Footer = ({ accounts, selectedAccounts, onChangeAccount, selectRef = useRef(null)}) => {
  const [msgData, setMsgData] = useState(null);
 
  const commonConfig = { delimiter: "," };
  useEffect(() => {
    Papa.parse(getURL(BOTTOM_MESSAGE_URL), {
      ...commonConfig,
      header: true,
      download: true,
      complete: (result) => {
        setMsgData(result.data[0]);
      },
    });
  }, []); 
  useEffect(() => {}, []);
  return (
    <>
      <div className="footer" style={{}}>
        <div className="rate">
          <img src={getURL("assets/logos/star.svg")} />
          <a
            target="_blank"
            style={{
              color: "#000000",
              marginLeft: 10,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textDecoration: "none",
            }}
            href={msgData && msgData.url}
          >
            {msgData && msgData.description
              ? msgData.description
              : "Please rate our extension on App Store"}
          </a>
        </div>
        <div 
          className="account" 
          ref={selectRef}>
          <MultiSelect
            options={accounts}
            value={selectedAccounts}
            onChange={onChangeAccount}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
