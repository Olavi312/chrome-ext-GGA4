import React, { useState, useEffect } from "react";
import { getURL } from "../../core/common";
import EventList from "./eventList";
import CategoryList from "./categoryList";
import EventTable from "./EventTable";
import TransactionTable from "./transactionTable";
import ItemsTable from "./itemsTable";
import Table1 from "./Table1";

const ContentItem = ({ index, url, items, active, filterAccount }) => {
  const [selected, setSelected] = useState(active);
  const [selectedCategory, setSelectedCategory] = useState("event");
  const [selectedEventItemIndex, setSelectedEventItemIndex] = useState(
    items.length - 1
  ); // set last index
  const [selectedEventItem, setSelectedEventItem] = useState(null);
  const [filteredItem, setFilteredItem] = useState([]);

  const [eventListData, setEventListData] = useState([]);
  const [transactionData, setTransactionData] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const [marketingData, setMarketingData] = useState([]);
  const [sesseionData, setSessionData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [configData, setConfigData] = useState([]);
  const [serverSideData, setServerSideData] = useState([]);
  const [otherData, setOtherData] = useState(null);

  const [height, setHeight] = useState(400);

  const ViewTable = () => {
    if (selectedEventItem == null) return <></>;
    if (selectedCategory === "event") {
      return (
        <EventTable
          datum={selectedEventItem.parsed.event_param}
          event_name={selectedEventItem.parsed.event_name}
        />
      );
    }
    if (selectedCategory === "ecommerce") {
      return (
        <>
          {transactionData.length > 0 && (
            <TransactionTable datum={transactionData} />
          )}
          {itemData.length > 0 && (
            <>
              <div style={{ height: 20 }} />
              <ItemsTable datum={itemData} />
            </>
          )}
        </>
      );
    }
    if (selectedCategory === "page" && pageData && pageData.length > 0) {
      return <Table1 title={"Page"} datum={pageData} />;
    }
    if (
      selectedCategory === "marketing" &&
      marketingData &&
      marketingData.length > 0
    ) {
      return <Table1 title={"Marketing"} datum={marketingData} />;
    }

    if (
      selectedCategory === "session" &&
      sesseionData &&
      sesseionData.length > 0
    ) {
      return <Table1 title={"Session"} datum={sesseionData} />;
    }

    if (selectedCategory === "user" && userData && userData.length > 0) {
      return <Table1 title={"User Data"} datum={userData} />;
    }

    if (selectedCategory === "tech" && techData && techData.length > 0) {
      return <Table1 title={"Tech Data"} datum={techData} />;
    }

    if (
      selectedCategory === "configuration" &&
      configData &&
      configData.length > 0
    ) {
      return <Table1 title={"Configuration Data"} datum={configData} />;
    }
    if (
      selectedCategory === "server_side" &&
      serverSideData &&
      serverSideData.length > 0
    ) {
      return <Table1 title={"Server Side"} datum={serverSideData} />;
    }

    if (selectedCategory === "other" && otherData) {
      return (
        <>
          {otherData.consent.length > 0 && (
            <>
              <Table1 title={"Consent"} datum={otherData.consent} />
              <div style={{ height: 20 }} />
            </>
          )}
          {otherData.core_request.length > 0 && (
            <>
              <Table1 title={"Core-Request"} datum={otherData.core_request} />
              <div style={{ height: 20 }} />
            </>
          )}
          {otherData.promotion.length > 0 && (
            <>
              <Table1 title={"Promotion"} datum={otherData.promotion} />
              <div style={{ height: 20 }} />
            </>
          )}

          {otherData.other.length > 0 && (
            <>
              <Table1 title={"Other"} datum={otherData.other} />
              <div style={{ height: 20 }} />
            </>
          )}
        </>
      );
    }
    return <></>;
  };

  useEffect(() => {
    setSelectedEventItem(filteredItem[selectedEventItemIndex]);
  }, [selectedEventItemIndex, filteredItem]);

  useEffect(() => {
    if (selectedEventItem == null) return;
    setTransactionData(selectedEventItem.parsed.ecommerce_param.transaction);
    setItemData(selectedEventItem.parsed.ecommerce_param.items);
    setPageData(selectedEventItem.parsed.page_param);
    setMarketingData(selectedEventItem.parsed.marketing_param);
    setSessionData(selectedEventItem.parsed.session_param);
    setTechData(selectedEventItem.parsed.tech_param);
    setUserData(selectedEventItem.parsed.user_param);
    setConfigData(selectedEventItem.parsed.config_param);
    setServerSideData(selectedEventItem.parsed.server_side_params);
    setOtherData(selectedEventItem.parsed.other_params);
  }, [selectedEventItem]);

  useEffect(() => {
    let event_names = [];
    filteredItem.map((item) => {
      event_names.push(item.parsed.event_name);
    });
    setEventListData(event_names);
  }, [filteredItem]);
  useEffect(() => {
    let filters = [...items];
    if (filterAccount.length > 0)
      filters = items.filter((e) => filterAccount.includes(e.parsed.account));
    setFilteredItem(filters);
    setSelectedEventItemIndex(filters.length - 1);
  }, [items, filterAccount]);

  return (
    <div className={`content-item`}>
      <div
        className={`content-item-title${selected ? " select" : ""}`}
        onClick={() => setSelected(!selected)}
      >
        <div className="prefix">{`#${index + 1}`}</div>
        <div className="v-divider" />
        <div className="content">{url}</div>
        <div
          className={`sufix${selected ? "-up" : ""}`}
          style={{
            background: `url(${getURL(
              "assets/logos/down.svg"
            )}) no-repeat center`,
          }}
        />
      </div>
      <div
        className={`content-item-content`}
        style={{ height: selected ? height : 0 }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          }}
        >
          <EventList
            list={eventListData}
            selected={selectedEventItemIndex}
            onClick={setSelectedEventItemIndex}
          />
          <div style={{ height: 388 }}>
            <CategoryList
              selected={selectedCategory}
              onClick={setSelectedCategory}
            />
          </div>
          <div
            style={{
              marginLeft: 5,
              marginTop: 8,
              marginBottom: 4,
              paddingBottom: 10,
              width: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            {selectedEventItem && selectedEventItem.parsed && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    margin: "5px 20px 5px 10px",
                  }}
                >
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Event Name
                  </div>
                  <div
                    style={{ fontSize: 14, fontWeight: 500, color: "#939299" }}
                  >
                    {selectedEventItem.parsed.event_name}
                  </div>
                </div>
                <ViewTable />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentItem;
