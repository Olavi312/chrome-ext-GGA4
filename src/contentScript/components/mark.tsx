import React, {useState, useEffect} from "react";
import { BUTTON_BOTTOM, ISDEBUG } from "../../core/constants";
import Draggable from "react-draggable";
import { getURL } from "../../core/common";
export const DraggableComponent = ({ onClick =()=>{}}) => {
    const [prevPos, setPrevPos] = useState(null);
    const [totalCount, setTotalCount] = useState(0) 
    const [bottomPosition, setBottomPosition] = useState(0)
    const [clickable, setClickable] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => { 
        const bottomPos = JSON.parse(localStorage.getItem('buttonBottom'))
        if (bottomPos){
            setBottomPosition(parseInt(bottomPos))
            setShow(true)
        }
        else{
            setBottomPosition(BUTTON_BOTTOM);
            localStorage.setItem("buttonBottom", JSON.stringify(BUTTON_BOTTOM));
            setShow(true);
        }
        // if (ISDEBUG) {
        //     const topPos = JSON.parse(localStorage.getItem('buttonTop'))
        //     if (topPos)
        //         setTopPosition(parseInt(topPos))
        //     else{
        //         setTopPosition(BUTTON_TOP);
        //         localStorage.setItem("buttonTop", JSON.stringify(BUTTON_TOP));
        //     }
        // } else {
        //     chrome.storage.sync.get().then(result => {
        //         if (result.buttonTop) {
        //             setTopPosition(parseInt(result.buttonTop))
        //         }else{
        //             setTopPosition(BUTTON_TOP);
        //             chrome.storage.sync.set({'buttonTop': BUTTON_TOP});
        //         }
        //     })
        // }
    }, [])
  
    const onDragStartListener = (e, data) => {
        setPrevPos({ x: e.clientX, y: e.clientY });
        setClickable(false);
    }
    const onDragStopListener = (e, data) => {
        if (prevPos.x == e.clientX && prevPos.y == e.clientY) {
            // onClick();
            setClickable(true)
        } else {
            const bottomPos = JSON.parse(localStorage.getItem('buttonBottom')) ? JSON.parse(localStorage.getItem('buttonBottom')) : 0
            localStorage.setItem('buttonBottom', (parseInt(bottomPos) - e.clientY + prevPos.y).toString()); 
            setTimeout(()=> setClickable(true), 500)
        }
    }
    return (
        <Draggable
            axis="y"
            onStart={onDragStartListener}
            onStop={onDragStopListener}
        >
          <div id="discount-button" style={{ bottom: bottomPosition, display: show ? '' : 'none' }}>
                <div className="close-rect">
                    {/* <span className="close" onClick={()=>console.log('close button')} ></span> */}
                    <div id="discount-button-hide" style={{ width: 35, height:35}} onClick={() => clickable && onClick()} />
                </div>
                <div id="draggable-button" onClick={onClick} style={{width:'35px', height: '35px',display: 'flex', alignItems:'center', justifyContent:'center'}}>
                    <div style={{display: 'flex', justifyContent:'center'}}>
                        <img src={getURL('assets/logos/GA4-EventMonitor-Icon-256.png')} draggable={false} style={{width:25, height: 25}}/>
                    </div> 
                </div>
            </div> 
        </Draggable>
    )
}
