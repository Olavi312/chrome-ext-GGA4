import React, { ReactElement, useEffect, useState, useRef, useMemo } from "react";
import { deepEqual, getURL } from "../core/common";
import {
  APP_NAME,
  GET_PANEL_WIDTH,
  GET_REQUEST_LIST,
  ISDEBUG,
  NOT_FOUND_TIME,
  PANEL_MIN_WIDTH,
  REMOVE_ALL,
  SET_PANEL_WIDTH,
  SHADOW_ROOT_ID,
  sample_data,
} from "../core/constants";
import Footer from "./components/footer";
import ContentItem from "./components/contentItem";
import { DraggableComponent } from "./components/mark";

const Panel = () => {
  const handleRef = useRef(null); // handler of root panel, it's need to control width with animation
  const [minimalMode, setMinimalMode] = useState(false);
  const [items, setItems] = useState([]); // display data
  const [width, setWidth] = useState(null);
  const [showPanel, setShowPanel]= useState(false); 
  const [showDrag, setShowDrag] = useState(true);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [cleared, setCleared] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const selectRef = useRef(null) 

  // const subscribe = () => {
  //   if (ISDEBUG) {
  //   } else {
  //     chrome.runtime.sendMessage({ code: GET_REQUEST_LIST }, (data) => {
  //       if (data && Array.isArray(data.list)) {
  //         if (!deepEqual(data.list, items)) setItems(data.list);
  //       }
  //     });
  //   }
  // };

  const onAccountsChange = (value) => {
    let values = [...selectedAccounts];
    let lastIndex = values.lastIndexOf(value);
    if (lastIndex > -1) values.splice(lastIndex, 1);
    else values.push(value);
    setSelectedAccounts(values);
  };

  const setParamFromService = () => {
    try {
      if (ISDEBUG) {
      } else {
        chrome.runtime.sendMessage(
          { code: GET_REQUEST_LIST, url: location.origin },
          (data) => {
            if (data && Array.isArray(data.list)) {
              let li = data.list;
              li.reverse(); 
              setItems(li);
            }
            if (data && Array.isArray(data.accounts)) {
              let acc = [];
              data.accounts.map((item, index) => {
                acc.push({
                  label: item,
                  value: item,
                });
              });
              setAccounts(acc);
            }
          }
        );
      } 
    } catch (error) {
      
    }
  };

  const handleStorageChange = (changes, area) => {
    try{
      const is_reload =  localStorage.getItem('isReload'); 
      if(is_reload == '1' && changes?.is_complete){  
        setTimeout(()=>{  
          setShowPanel(true); 
          setShowDrag(false); 
        }, 1500)
      } 
      setParamFromService();
  }catch{}
  };

  useEffect(() => { 
    try { 
      setTimeout(()=>{  
        if(items.length == 0) setNotFound(true);
      }, NOT_FOUND_TIME*1000)
      if (ISDEBUG) {
        const width = localStorage.getItem("width");  
        setWidth(width);
        setItems(sample_data); 
        setAccounts([{value:'1', label:'G-JNS'}])
      } else {
        // get panel width from service_worker and then set it to root_panel width
        chrome.runtime.sendMessage({ code: GET_PANEL_WIDTH }, (data) => {
          setWidth(data.width);
        });
        // subscribe request_list from service_worker each 500ms
        // setInterval(() => {
        //   subscribe();
        // }, 15);
        setParamFromService();
        chrome.storage.onChanged.addListener(handleStorageChange);
        return () => {
          chrome.storage.onChanged.removeListener(handleStorageChange);
        };
      }
    } catch (error) {
      
    }
  }, []);

  //initial set width of root_panel
  useEffect(() => {
    if (showPanel && handleRef) {
      handleRef.current.style.minWidth = width;
      handleRef.current.style.width = width;
    }
  }, [handleRef, width]);

  // save current width to storage, call this function when dragEnd, onOpenPanel, onClosePanel
  const saveWidth = () => {
    try {
      if (ISDEBUG) {
        localStorage.setItem("width", handleRef.current.style.width);
      } else {
        chrome.runtime.sendMessage({
          code: SET_PANEL_WIDTH,
          width: handleRef.current.style.width,
        });
      } 
    } catch (error) {
      
    }
  };

  // onDragListener => change root_panel width
  const handleDrag = (event) => {
    if (event.clientX != 0) {
      const newWidth = window.innerWidth - event.clientX + 5;
      if (newWidth < 440) setMinimalMode(true);
      else setMinimalMode(false);
      handleRef.current.style.width = `${newWidth}px`;
    }
  };

  // onDragStartListener => remove transition effect and minWidth
  const handleDragStart = (event) => {
    handleRef.current.style.transitionTimingFunction = "";
    handleRef.current.style.transitionDuration = "";
    handleRef.current.style.minWidth = PANEL_MIN_WIDTH;
  };

  // onDrageEndListener => add transition effect
  const handleDragEnd = (event) => {
    handleRef.current.style.transitionTimingFunction = "ease-in-out";
    handleRef.current.style.transitionDuration = "300ms";
    handleRef.current.style.minWidth = PANEL_MIN_WIDTH;
    saveWidth(); // if user dragEnd, call saveWidth function to store current width to storage
  };

  // close root_panel with set width to 15px, when user click crossbutton top-right corner this function be called.
  const onClose = () => { 
    handleRef.current.style.minWidth = "0px";
    handleRef.current.style.width = "0px";
    saveWidth();
    // setTimeout(()=>{
      setShowDrag(true); 
      localStorage.setItem('isReload', '0');
    // }, 500)
  };

  //change panel width when click handle, store width to storage
  // 1 : open minimum panel if closed,
  // 2 : close panel if width is minium,
  // 3: set panel width to minium if width > miniumwidth
  const onClickHandle = () => {
    if (handleRef.current.style.width === "15px") {
      handleRef.current.style.minWidth = PANEL_MIN_WIDTH;
      handleRef.current.style.width = PANEL_MIN_WIDTH;
      setShowDrag(false);
    } else if (handleRef.current.style.width === PANEL_MIN_WIDTH) {
      handleRef.current.style.minWidth = "0px";
      handleRef.current.style.width = "0px";
      localStorage.setItem('isReload', '0');
      setShowDrag(true)
    } else {
      handleRef.current.style.minWidth = PANEL_MIN_WIDTH;
      handleRef.current.style.width = PANEL_MIN_WIDTH;
    }
    saveWidth();
  };

  // clear request list, send REMOVE_ALL request to service_worker
  const clearHistory = () => {
    try {
      setItems([]);
      setCleared(true);
      if (ISDEBUG) {
      } else {
        chrome.runtime.sendMessage({ code: REMOVE_ALL, url: location.origin });
      } 
    } catch (error) {
      
    }
  }; 

  const hideSelect = () => {
    if(selectRef == null) return;
    if(selectRef.current.querySelector('.multi-select-content').style.display != 'none')
      selectRef.current.querySelector('#account_switch').click();
  }

  //refresh page, 
  const reloadPage = () => {   
    localStorage.setItem('isReload', '1');
    setNotFound(false);
    setCleared(false);
    location.reload();
  }
  return (
    <>
      <link
        rel="stylesheet"
        type="text/css"
        href={getURL("assets/css/side-bar.css")}
      />
      <link
        rel="stylesheet"
        type="text/css"
        href={getURL("assets/css/tailwind.css")}
      />
      {showDrag && <DraggableComponent onClick={()=>{
        if(!showPanel){
          localStorage.setItem('isReload', '1');
          setShowPanel(true); 
          setShowDrag(false)
        }else{ 
          if (handleRef.current.style.width === "0px") {
            handleRef.current.style.minWidth = PANEL_MIN_WIDTH;
            handleRef.current.style.width = PANEL_MIN_WIDTH;
            setShowDrag(false);
          }else{ 
            handleRef.current.style.minWidth = '0px';
            handleRef.current.style.width = '0px';
          } 
        }
      }}/>}
      {showPanel && <div
        ref={handleRef} // set handle ref for control width
        id="sidebar-root"
        style={{
          width: PANEL_MIN_WIDTH,
          transitionTimingFunction: "ease-in-out",
          transitionDuration: "300ms",
        }}
      >
        <div
          className="content-handle"
          onClick={onClickHandle}
          onDrag={handleDrag}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <img src={getURL("assets/logos/handle.svg")} />
        </div>
        <div style={{ width: "100%" }} onClick={()=>hideSelect()}>
          {/* extension header */}
          <div className="sidebar-header">
          <img src={getURL('assets/logos/GA4-EventMonitor-Icon-256.png')} draggable={false} style={{width:25, height: 25}}/>
            <div className="title">{APP_NAME}</div> 
            <img onClick={reloadPage} src={getURL("assets/logos/refresh.png")} className="refresh"/>
            <img
              className="brush"
              onClick={() => clearHistory()}
              src={getURL("assets/logos/delete.png")}
            />
            <img
              className="closet"
              src={getURL("assets/logos/cross.svg")}
              onClick={() => onClose()}
            />
          </div>
          {/* extension header */}
          <div className="divider mt-8" />
          <div
            className="sidebar-content"
            style={{ bottom: minimalMode ? "110px" : "60px" }}
          >
            <div className="content">
              {items.length > 0 ? (
                items.map((element, index) => {
                  return (
                    <ContentItem
                      key={index}
                      index={items.length - 1 - index}
                      url={element.url}
                      items={element.list}
                      active={false}
                      filterAccount={selectedAccounts}
                    />
                  );
                })
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >  
                  { 
                    cleared ? (
                      <> 
                        <div style={{ fontWeight: "bold" }}>Events Cleared.</div>
                        <div style={{ fontWeight: "bold" }}>Please reload the page to display events.</div>
                      </>
                      ):
                      notFound ? 
                      <>
                        <div style={{ fontWeight: "bold" }}>Google Analytics 4 not found.</div>
                        <div style={{ fontWeight: "bold" }}>Refresh the page to try again.</div>
                      </> : (
                      <>
                        <img src={getURL("assets/logos/loading.gif")} />
                        <div style={{ fontWeight: "bold" }}>Loading...</div>
                      </>
                    )
                  }
                </div>
              )}
            </div>
          </div>
          <Footer
            accounts={accounts}
            selectedAccounts={selectedAccounts}
            onChangeAccount={onAccountsChange}
            selectRef={selectRef}
          />
        </div>
      </div>}
    </>
  );
};

export default Panel;
