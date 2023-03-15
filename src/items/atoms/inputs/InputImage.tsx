import { parseReadableSize } from "@/scripts/helpers/type/numberHelper"
import { filename2Extension, filename2Type, isValidImgExt } from "@/scripts/helpers/type/stringHelper"
import { useMemo, useRef } from "react"
import { BsExclamationCircle, BsUpload } from "react-icons/bs"
import { OInputNImagesJustUploaded } from "@/src/items/molecules/carousel/OInputNImagesJustUploaded"

export const InputImage = ({
    sendImage, handleDrop, handleChange, s__firstFile, firstFile, $theInput,
    failedUpload, s__failedUpload, percentComplete, s__percentComplete
})=> {

    const foundFileType = useMemo(() => firstFile?.type ? filename2Type(firstFile.type) : ""
    , [firstFile])
    const foundSize = useMemo(() => !!firstFile && parseReadableSize(firstFile?.size.toString())
    , [firstFile])
    const foundExtInFilename = useMemo(()=>(
        firstFile?.name ? filename2Extension(firstFile.name.replace(" ","_")) : ""
    ),[firstFile])
    const foundFilename = useMemo(() => firstFile?.name.replace(" ","_"), [firstFile])


    const validatedFileType = useMemo(()=>(
        isValidImgExt(foundFileType, foundExtInFilename) ? foundFileType : null
    ),[foundFileType,foundExtInFilename] )

    
    return (<>
        
        {!!$theInput.current && !!firstFile && !failedUpload && (<>
                <OInputNImagesJustUploaded {...{
                    theKey:0,
                    validatedFileType,foundFilename,foundSize,
                    percentComplete:percentComplete == 100 ? 99 : percentComplete}}
                />
            </>)}
                    

            <div className={`pos-rel flex-center flex-col  bord-r-8 ims-border-faded   `}>
                <span className="clickble block w-100">
                    <label htmlFor="theImage" className=" block w-100" onDrop={()=>{}}>
                        <span className=" w-100 py-4 flex-col flex-center">
                            <div className='flex'>
                                <div className={"ims-circ-button-primary-desat tx-lg w-50px h-50px"}> 
                                    <BsUpload />
                                </div>
                            </div>
                            
                            <div className="ims-tx-primary py-2">
                                <span className="tx-bold-6">Click to upload</span>
                                <span className="px-1">or</span>
                                <span>drag and drop</span>
                            </div>
                            <span className="tx-bold-2 ims-tx-primary">JPG or PNG</span>
                                <input type="file" ref={$theInput}
                                    role="button" accept="image/*" id="theImage"
                                    className={
                                        " clickble scale-110 pb-100 pt-8  "+
                                        " w-100 opaci-0 pos-abs z-700 "
                                    }
                                    style={{height:"0"}} 
                                    onDrop={handleDrop} onChange={handleChange} 
                                />
                        </span>
                    </label>
                </span>
            </div>
            {failedUpload && (<div className='flex-center mt-4'>
                <div className='tx-red pt-2 pb-1 mr-3 px-2 bord-r-100 tx-lgx bg-red-25'><BsExclamationCircle/></div>
                <div>
                    <div className='py-1 tx-red'>Upload failed, please try again</div>
                    <span className='ims-tx-lightdark'>{firstFile?.name}</span>
                    <span className='tx-start flex py-1 tx-red opaci-chov--50' onClick={()=>{sendImage(firstFile)}}>
                        <div  style={{borderBottom: "1px solid red"}}>Try Again</div>
                    </span>
                </div>
            </div>)}
    </>)
}