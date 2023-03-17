import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { useEventListener, useInterval, useMap, useOnClickOutside } from 'usehooks-ts';


import { useDeviceXS_LG, useDeviceXS_MD, useDeviceXS_SM, useDeviceXS_XL } from '@/scripts/helpers/useHooksHelper';
import { STATIC_IMAGE_BASE } from '@/scripts/constants/api';
import { ImageSlider } from '@/src/items/molecules/carousel/ImageSlider';
import CSS from '@/styles/modules/Slider.module.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
const SliderCarousel = forwardRef(({
    filteredFileList,GW,
    pageOffset, s__pageOffset,
}:any, ref)=>{
    const [loadedImages, loadedImages_do] =    useMap<string, any>(new Map())
    const [isClicking, s__isClicking] =             useState(false)
    // const [pageOffset, s__pageOffset] =             useState(0);
    const isAtFirstImage = useMemo(() => pageOffset >= 0, [pageOffset])
    const currentPage = useMemo(() =>  parseInt((-pageOffset/GW).toString()) , [pageOffset,GW])

    useImperativeHandle(ref, ()=>({
        getCurrentPage: () => (currentPage),
        setPrevPage,
    }));
    const setNextPage = ()=>{
        (pageOffset > -GW*(filteredFileList.length-1)) && s__pageOffset(pageOffset-GW)
    }
    const setPrevPage = ()=>{ (pageOffset < 0) && s__pageOffset(pageOffset+GW) }

    const isAtLastImage = useMemo(() => pageOffset <= -GW*(filteredFileList.length-1)
    , [filteredFileList,pageOffset,GW])

    return (<>
        <ImageSlider {...{
            GW,filteredFileList,
            loadedImages,loadedImages_do,
            isClicking,s__isClicking,
            pageOffset, s__pageOffset}}
        />
        {<div className={`   flex-center left-0 pos-abs clickble ${CSS["emphasis"]}`} >
            <div className={`   ${CSS["emphasis-card"]}
                                ${isAtFirstImage && " none stopcursor opaci-25 "}
                                ord-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2 `}
                 onClick={()=>{setPrevPage() }}
            >
                <div className="noclick"><BsChevronLeft /></div>
            </div>
        </div>}
        {<div className={`   flex-center right-0 pos-abs clickble ${CSS["emphasis"]}`} >
            <div className={`   ${CSS["emphasis-card"]}
                                ${isAtLastImage && " none stopcursor opaci-25 "}
                                ord-r-100p clickble bg-white  tx-mdl   pa-3 pb-2 mr-4 ma-2`}
                 onClick={()=>{setNextPage() }}
            >
                <BsChevronRight />
            </div>
        </div>} 
        

        <div className={`bg-white mb-3 ord-r-25 flex-center bottom-0 pos-abs clickble `} >
            {filteredFileList.map((item,index)=>{
                if (index == 4)
                {
                    if (currentPage >= 4)
                    {
                        return <div key={index} className="tx-lg  px-3 py-1 flex">
                            {currentPage+1}
                            <div className="opaci-25"> / {filteredFileList.length} </div>
                        </div>
                    }
                }
                if (index > 4) return <div key={index}></div>
                return <div key={index}>

                        <div className={
                                `   ${CSS["emphasis-card"]} ${CSS["nav-dot-button"]}
                                    ${currentPage != index ? "ims-tx-faded opaci-hov-10" : ""}
                                    clickble px-2 py-3`
                            }
                             onClick={()=>{s__pageOffset(-GW*index) }}
                        >
                            <div className={`ord-r-100p ${CSS["nav-dot"]}`}
                                style={{
                                    width:"10px",height:"10px",
                                    background:currentPage == index ? "#101828" : "#2C334B"
                                }}
                            >
                            </div>
                        </div>
                </div>
            })}
        </div>
    </>);
});
SliderCarousel.displayName = 'SliderCarousel'
export { SliderCarousel }

// parent
        // const childRef = useRef(null);
        // const handleClick = ()=>{
        //     childRef.current.childFunction1();

        //     childRef.current.childFunction2();
        // };

    // ReactFunctionComponent










