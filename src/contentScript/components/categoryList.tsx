import React, { useState } from "react";
import { getURL } from "../../core/common";

const categories = [
  {
    active_icon: "house_active.svg",
    icon: "house.svg",
    title: "Event",
    value: "event",
  },
  {
    active_icon: "page_active.svg",
    icon: "page.svg",
    title: "Page",
    value: "page",
  },
  {
    active_icon: "marketing_active.svg",
    icon: "marketing.svg",
    title: "Marketing",
    value: "marketing",
  },
  {
    active_icon: "ecommerce_active.svg",
    icon: "ecommerce.svg",
    title: "Ecommerce",
    value: "ecommerce",
  },
  {
    active_icon: "session_active.svg",
    icon: "session.svg",
    title: "Session",
    value: "session",
  },
  {
    active_icon: "user_active.svg",
    icon: "user.svg",
    title: "User",
    value: "user",
  },
  {
    active_icon: "tech_active.svg",
    icon: "tech.svg",
    title: "Tech",
    value: "tech",
  },
  {
    active_icon: "server_side_active.svg",
    icon: "server_side.svg",
    title: "Server Side",
    value: "server_side",
  },
  {
    active_icon: "configuration_active.svg",
    icon: "configuration.svg",
    title: "Configuration",
    value: "configuration",
  },
  {
    active_icon: "other_active.svg",
    icon: "other.svg",
    title: "Core Request",
    value: "other",
  },
];

const CategoryList = ({ selected, onClick }) => {
  const [expand, setExpand] = useState(false);
  return (
    <div className="category-list">
      <div
        onClick={() => setExpand(!expand)}
        className={`category-handle ${expand ? "expand" : "collapse"}`}
        style={{
          background: `url(${getURL(
            "assets/logos/gt.svg"
          )}) no-repeat center center`,
        }}
      />
      <div
        style={{
          height: "auto",
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
          border: "solid 1px #EFEFEF",
        }}
      >
        {categories.map((category, index) => {
          return (
            <div
              key={index}
              onClick={() => onClick(category.value)}
              className={`category-list-item ${
                expand ? "expand" : "collapse"
              } ${selected === category.value ? "select" : ""} tooltip`}
            >
              {/* <div> */}
              <img
                draggable={false}
                src={getURL(
                  `assets/logos/${
                    selected === category.value
                      ? category.active_icon
                      : category.icon
                  }`
                )}
              />

              {/* {!expand && (
                  <span className="tooltiptext">{category.title}</span>
                )} */}
              {/* </div> */}
              <div>{category.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryList;
