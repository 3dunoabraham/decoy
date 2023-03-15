import { useState, useRef } from 'react'


// import { isDevEnvironment  } from '@/scripts/helpers/devHelper';
import { API_IMAGE_UPLOAD_BASE, API_IMAGES, API_INVALID_IMAGE_DUPLICATE
} from '@/scripts/constants/api'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper';
export interface NputFileProps {
    label?: string; display?: string; value?: string; editMode?: boolean;
    refetch?: () => void;
}
// CORE ReactFunctionComponent
export const InputFile = ({...others })=>{
    /****** DATA ******/
    const MAX_IMAGE_SIZE:number = 2097152
    const duplicateMessage = (
        "an image with the same name is already exist for another Unit, "+
        "change the name or delete the existing one first"
    )
    const [isUploading, s__isUploading] =           useState<boolean>(false)
    const $theInput =           useRef<HTMLInputElement>()
    const [firstFile, s__firstFile] =               useState<{name:string,type:string,size:number}>()
    const [percentComplete, s__percentComplete] =   useState<number>(0);
    const [liveImagesArray, s__liveImagesArray] =   useState();
    const [isOpen, s__isOpen] =                     useState(false);
    const [isGalleryModal, s__isGalleryModal] =     useState(false);
    const [autoincrementID, s__autoincrementID] =   useState<number>(0)



    /****** UPDATE ******/
    const handleDrop = (e)=>{}
    const handleChange = ()=>{
        others.handleUpload(others.title, $theInput.current.files[0])
    }
    
    const sendDocument = (firstCurrentFile)=>{
        let theUrl = API_IMAGE_UPLOAD_BASE // +`${uid}/`
        const payload = new FormData();
        payload.append("img", firstCurrentFile, firstCurrentFile.name.replace(" ","_"));

        const options = { method: 'POST', body: payload,
          headers: {
            'Accept':
                'text/html,application/xhtml+xml,application/xml;q=0.9,'+
                'image/avif,image/webp,*/*;q=0.8',
          },
        };

        const req = new XMLHttpRequest();
        req.open('POST', theUrl);
        req.upload.addEventListener('progress', (e)=>{
            s__percentComplete(parseInt(`${(e.loaded / e.total)*100}`))
        })
        req.addEventListener('load', async (e)=>{
            s__isUploading(false)
            if (req.status >= 400)
            {
                if (req.statusText == "Request Entity Too Large")
                {
                    s__firstFile(null)
                    return alert("File Exceeds the Size Limit")
                }
            }
            if (    req.response.trim()[0] == "{" && JSON.parse(req.response) &&
                    JSON.parse(req.response).Message == duplicateMessage)
            {
                s__firstFile(null)
                return alert(API_INVALID_IMAGE_DUPLICATE)
            }
            let newSavedImage = {
                size:firstCurrentFile.size,  name:firstCurrentFile.name.replace(" ","_"),
                lastModified:firstCurrentFile.lastModified,  type:firstCurrentFile.type,
            }
            await refetchImagesArray()
            s__isOpen(false);s__isGalleryModal(false)
            s__percentComplete(0)
            s__autoincrementID(autoincrementID+1)
            s__firstFile(null)
            await others.refetch()
        })
         req.send(payload);

    }
    const refetchImagesArray = async ()=>{
        let theImgObjArray = await fetchJsonArray(API_IMAGES,"Data")        
        s__liveImagesArray(theImgObjArray)
    }



    /****** HTML ******/
    return (
    <div className="pos-rel flex-center flex-col  bord-r-8 "
        style={{border: `2px ${others.border} var(--border-faded)`}}
    > 
        {/* ims-border-faded */}
        <span className="clickble block w-100">
            <label htmlFor="theImage" className=" block w-100" onDrop={()=>{}}>
                <span className=" w-100 py-1 flex-col flex-center">
                    <div className=" py-2 w-100 flex-between ">
                        {others.border != "dashed" &&
                            <span className='ims-tx-dark px-4'>{others.title}</span>
                        }
                        {/* <span className="px-1">or</span> */}
                        <span className="tx-bold-6 ims-tx-primary px-4">Upload</span>
                    </div>
                    <input type="file"  ref={$theInput}
                        role="button" id="theImage"
                        className="clickble  py-6 w-100 opaci-0  pos-abs z-800 "
                        style={{height:"0",cursor:"pointer !important"}} 
                        onDrop={handleDrop} onChange={handleChange}
                    />
                </span>
            </label>
        </span>
    </div>
    )
}