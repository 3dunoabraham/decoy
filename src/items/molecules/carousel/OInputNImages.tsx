import { useState, useMemo, useRef, useEffect, useContext } from 'react'
import { useOnClickOutside, useMap } from 'usehooks-ts'
import { BsThreeDots, BsTrash, BsPlus } from 'react-icons/bs'


import { useDeviceXS_LG, useDeviceXS_MD, useDeviceXS_SM, useDeviceXS_XL
} from '@/scripts/helpers/useHooksHelper';
import { dd } from '@/scripts/helpers/devHelper';
import { fetchJsonArray, fetchPostImage } from '@/scripts/helpers/fetchHelper';
import { API_IMAGE_UPLOAD_BASE, STATIC_IMAGE_BASE, API_IMAGES,
    API_INVALID_IMAGE_ALREADY_LOADING,API_INVALID_IMAGE_FILETYPE, API_INVALID_IMAGE_CORRUPT,
} from '@/scripts/constants/api'
import { filename2Extension, filename2Type, isValidImgExt} from '@/scripts/helpers/type/stringHelper'
import Modal from '@/src/items/atoms/common/Modal'
import { AppContext } from '@/scripts/contexts/AppContext';
import { SliderCarousel } from '@/src/items/molecules/carousel/SliderCarousel';
import CSS from '@/styles/modules/Slider.module.css'
import { InputImage } from '@/src/items/atoms/inputs/InputImage';
type I_OInputNImages = {
    uid: string; filelistString: string;
    config?: any; 
    updateNewData: (newObj:any)=>void; refetch: ()=>void;
}
// ReactFunctionComponent
export const OInputNImages = ({
    uid, filelistString,
    config = {}, 
    updateNewData, refetch=()=>{},
}: I_OInputNImages)=>{
    /****** CREATE ******/
    useEffect(()=>{
        refetchImagesArray()
    },[])



    /****** DATA ******/
    const app = useContext(AppContext)
    const $childRef =           useRef<any>()
    const $divObj =          useRef<HTMLDivElement>()
    const [isOpen, s__isOpen] =                     useState(false);
    const [isGalleryModal, s__isGalleryModal] =     useState(false);
    const _useDeviceXS_SM = useDeviceXS_SM()
    const _useDeviceXS_MD = useDeviceXS_MD()
    const _useDeviceXS_LG = useDeviceXS_LG()
    const _useDeviceXS_XL = useDeviceXS_XL()
    const [isUploading, s__isUploading] =           useState<boolean>(false)
    const [pageOffset, s__pageOffset] =             useState(0);
    const [liveImagesArray, s__liveImagesArray] =   useState([]);
    const [percentComplete, s__percentComplete] =   useState<number>(0);
    const [firstFile, s__firstFile] =               useState<{name:string,type:string,size:number}>()
    const [imgMap, imgMap_do] =                useMap(new Map())
    const [failedUpload, s__failedUpload] = useState(false)
    const $theInput =           useRef<HTMLInputElement>()
    const GW = useMemo(()=>{
        if (_useDeviceXS_SM) return 320
        if (_useDeviceXS_MD) return 420
        if (_useDeviceXS_LG) return 600
        if (_useDeviceXS_XL) return 480
        return 600
    }, [_useDeviceXS_SM,_useDeviceXS_MD,_useDeviceXS_LG, _useDeviceXS_XL])
    const parsedImagesArray = useMemo(()=>(filelistString == "[]" || !liveImagesArray.length)
        ? []
        : JSON.parse(filelistString).map((aImg, index)=>{
            let theReferenceArray = liveImagesArray || []
            let theFoundExt = theReferenceArray.filter((theRefImg, index)=>{
                return theRefImg.id == aImg
            })

            let staticURL = STATIC_IMAGE_BASE+"000000"

            if (theFoundExt.length == 0) return aImg
            return aImg+theFoundExt[0].img_ext
        })
    , [filelistString,liveImagesArray])



    /****** UPDATE ******/
    useOnClickOutside($divObj, ()=>{s__isOpen(false) })
    const handleDrop = (e)=>{}
    const removeCurrentImage = async ()=>{
        let _currentPage = $childRef.current.getCurrentPage()
        let theExt = filename2Extension(parsedImagesArray[_currentPage])
        let theFileName = parsedImagesArray[_currentPage].replace(theExt, "")
        sendDeleteRequest(theFileName)
    }
    const refetchImagesArray = async ()=>{
        let theImgObjArray = await fetchJsonArray(API_IMAGES,"Data")        
        s__liveImagesArray(theImgObjArray)
    }
    const sendDeleteRequest = async (theImageName)=>{
        let theImageId = theImageName
        try {
            let theResult = await fetch(API_IMAGES, {
                headers:{"Content-Type":"application/json"},
                method: 'DELETE',body:`{"imgs_ids":[${theImageId}]}`
            })
            await refetch()
            $childRef.current.setPrevPage()
            app.alert("success", "Image deleted successfully!")
        } catch (err) { dd('Error:', err); }
    }
    const handleChange = ()=>{
        if (isUploading) return alert(API_INVALID_IMAGE_ALREADY_LOADING)
        const firstCurrentFile = $theInput.current.files[0]

        if (firstCurrentFile.type == "") return alert(API_INVALID_IMAGE_CORRUPT)
        let theParsedFileType = filename2Type(firstCurrentFile.type)
        let theParsedFileExt = filename2Extension(firstCurrentFile.name.replace(" ","_"))
        if (!isValidImgExt(theParsedFileType,theParsedFileExt))
        {
            return alert(API_INVALID_IMAGE_FILETYPE)
        }

        s__firstFile(firstCurrentFile)
        s__isUploading(true)
        sendImage(firstCurrentFile)
    }
    const sendImage = async (firstCurrentFile)=>{
        let theUrl = API_IMAGE_UPLOAD_BASE+`${uid}/`
        s__failedUpload(false)

        let {req, payload}:any = await fetchPostImage(theUrl, firstCurrentFile, {
            onProgress: (e)=>{s__percentComplete(parseInt(`${(e.loaded / e.total)*100}`))},
            onReady: () => {
                if (req.readyState === 4 && req.status >= 300) { s__isUploading(false); s__failedUpload(true) }
            },
        })
        
        req.addEventListener('load', async (e) => {
            s__isUploading(false)
            await refetchImagesArray()
            s__isOpen(false);s__isGalleryModal(false)
            s__percentComplete(0)            
            s__firstFile(null)
            app.alert("success", "Image uploaded successfully!")
            await refetch()
        })
        req.send(payload);
    }



    /****** HTML ******/
    return (
    <div className="flex-col bord-r-8  ims-bg-faded w-100 pos-rel" >
        <SliderCarousel ref={$childRef} {...{GW,filteredFileList:parsedImagesArray,pageOffset, s__pageOffset}} />

        <div className="pos-abs  top-0 right-0" >
            <div className={` bord-r-100p tx-lg ${CSS["dots-button"]} pa-5`} onClick={()=>(s__isOpen(!isOpen))}>
                <span className={`pa-2 px-3 pb-2 pt-3 bg-w-50 bord-r-8 ${CSS["dots-dots"]}`}><BsThreeDots /></span>
            </div>
            {isOpen && <div className="w-min-200px  pos-abs right-0 top-0 "  ref={$divObj}>
                <div className='tx-mdl z-100 bg-white ims-border-faded bord-r-8  w-100 autoverflow-y' >
                    <div className="flex-col flex-align-start flex-justify-start  " >
                        {!!parsedImagesArray.length && <>
                            <button className={`flex-center flex-justify-start pa-2 tx-md ims-tx-error w-100 opaci-chov--50`}
                                onClick={()=>{s__isOpen(!isOpen);removeCurrentImage()}
                            }>
                                <span className="px-2 "><BsTrash /></span><span className="pb-1">Remove</span>
                            </button>
                            <hr className="w-100"/>
                        </>}
                        <button className={`flex-center flex-justify-start pa-2  w-100 opaci-chov--50`}
                            onClick={()=>{s__isOpen(!isOpen);s__isGalleryModal(!isGalleryModal)}}
                        >
                            <span className="px-1 tx-lgx ims-tx-faded"><BsPlus /></span>
                            <span className="pb-1 tx-mdl opaci-75 tx-ls-1">Add</span>
                        </button>
                    </div>
                </div>
            </div>}
        </div>
        {parsedImagesArray.length == 0 &&
            <div className={`   flex-center pos-abs clickble ${CSS["emphasis"]}`} >
                <div className={`flex-col bord-r-8 clickble bg-white px-4 py-6 pb-1 mr-4 ma-2 ${CSS["emphasis-card"]}`}
                    onClick={()=>{s__isGalleryModal(!isGalleryModal) }}
                >
                    <span className="tx-sm">Add Image</span>
                    <span className="tx-xxl"><BsPlus /></span>
                </div>
            </div>
        }
        {isGalleryModal &&
            <Modal  title="Images" subtitle="Upload or remove images associated with this trailer"
                handleClose={()=>{ if (!isUploading) { s__isGalleryModal(!isGalleryModal) } imgMap_do.reset() }}
            >
                <InputImage {...{ failedUpload, s__failedUpload, percentComplete, s__percentComplete,
                    handleDrop, handleChange, sendImage, firstFile, s__firstFile, $theInput
                }}/>
            </Modal>
        }
    </div>
    )
}