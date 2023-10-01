import React from "react";
import { isExportDeclaration } from "typescript";
import { formatDefaultLabel } from "../../core/common";

const EventTable = ({ datum, event_name }) => {
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
            {/* {formatDefaultLabel(event_name)} */}
            Event
          </div>
        </div> 
        <div className="divider" />
        <div className="header">
          <div className="item" style={{ width: "50%" }}>
            Key
          </div>
          <div className="item" style={{ width: "50%" }}>
            Value
          </div>
          {/* <div className="item">Type</div> */}
        </div>
        {datum.map((data, index) => {
          return (
            <div key={index}>
              <div className="divider" />
              <div className="content">
                <div className="item" style={{ width: "50%" }}>
                  {data?.label}
                </div>
                <div className="item" style={{ width: "50%" }}>
                  {data?.value}
                </div>
                {/* <div className="item">{data.type}</div> */}
              </div>{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EventTable;
