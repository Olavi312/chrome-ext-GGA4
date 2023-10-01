import React, { useState } from "react";
import { isExportDeclaration } from "typescript";
import { getURL } from "../../core/common";

const ItemTable = ({ datum }) => {
  const [actived, setActived] = useState(false);
  return (
    <div>
      <div className="divider" />
      <div
        className="content"
        onClick={() => setActived(!actived)}
        style={{ cursor: "pointer" }}
      >
        <div className="item">{datum.item_id}</div>
        <div className="v-divider-1" />
        <div className="item">{datum.product_name}</div>
        <div className="v-divider-1" />
        <div className="item">{`Price: ${
          datum.price == undefined ? "Unknown" : datum.price
        }`}</div>
        {/* <div className="v-divider-1" />
        <div className="item">{`Qty: ${
          datum.coupon == undefined ? "" : datum.coupon
        }`}</div> */}
        <div
          className={`sufix${actived ? "-up" : ""}`}
          style={{
            background: `url(${getURL(
              "assets/logos/down.svg"
            )}) no-repeat center`,
            width: 20,
            height: 20,
          }}
        />
      </div>
      <div className={`context ${actived ? "" : "hide"}`}>
        {datum.list.map((data, index) => {
          return (
            <div key={index}>
              <div className="divider" />
              <div className="content">
                <div className="item">{data?.label}</div>
                <div className="item">{data?.value}</div>
                {/* <div className="item">{data.label}</div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ItemsTable = ({ datum }) => {
  return (
    <div style={{ marginLeft: 10 }}>
      <div className="tbl">
        <div className="header">
          <div
            style={{
              width: "100%",
              textAlign: "center",
              fontSize: 14,
              fontWeight: 700,
              color: "#219EBC",
            }}
          >
            Items
          </div>
        </div>
        {datum.map((data, index) => {
          return <ItemTable key={index} datum={data} />;
        })}
      </div>
    </div>
  );
};

export default ItemsTable;
