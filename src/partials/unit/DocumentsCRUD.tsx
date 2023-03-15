import { useContext, useEffect, useState } from 'react'


import { dd } from '@/scripts/helpers/devHelper'
import { FileJustUploaded } from "@/src/items/atoms/inputs/FileJustUploaded"
import { InputFile } from "@/src/items/atoms/inputs/InputFile"
import { API_DOCS, API_DOC_UPLOAD_BASE, API_INVALID_DOC_FILETYPE, API_INVALID_IMAGE_CORRUPT
} from '@/scripts/constants/api'
import { DEFAULT_DOC_CATEGORIES } from '@/scripts/constants/unit'
import { filename2Extension, filename2Type, isValidDocExt } from '@/scripts/helpers/type/stringHelper'
import { BsExclamationCircle } from 'react-icons/bs'
import { AppContext } from '@/scripts/contexts/AppContext'
import { fetchDelete } from '@/scripts/helpers/fetchHelper'
// ReactFunctionComponent
export const DocumentsCRUD = ({fileArrayMap, unit, refetch=(deps=[])=>{}})=>{
    /****** DATA ******/
    const app = useContext(AppContext);
    const [firstFile, s__firstFile] = useState<{name:string,type:string,size:number}>()
    const [failedUpload, s__failedUpload] = useState(false)
    const [firstFileCat, s__firstFileCat] = useState("")
    const [percentComplete, s__percentComplete] =   useState<number>(0);

    
    
    /****** UPDATE ******/
    useEffect(()=>{
        s__percentComplete(0)
        s__firstFileCat("")
        s__firstFile(null)
    }, [fileArrayMap])
    const handleDelete = (category, theFile)=>{ sendDeleteRequest(theFile.id) }
    const handleDownload = (category, theFile)=>{ }
    const _handleUpload = (category, theFile)=>{        
        if (theFile.type == "") return app.alert("error", API_INVALID_IMAGE_CORRUPT)
        let theParsedFileType = filename2Type(theFile.type)
        let theParsedFileExt = filename2Extension(theFile.name.replace(" ","_"))
        if (!isValidDocExt(theParsedFileExt)) { return app.alert("error", API_INVALID_DOC_FILETYPE) }
        s__firstFileCat(category)
        s__firstFile(theFile)
        sendDocument(category, theFile)
    }
    const sendDeleteRequest = async (id)=>{
        app.alert("neutral", "Deleting document...")
        
        let fetchDeleteRes = await fetchDelete(API_DOCS, {docs_ids:[id]})
        if (!fetchDeleteRes) return
        if (fetchDeleteRes.status >= 400) return app.alert("error","Request error")

        app.alert("success", "Document deleted successfully!")
        await refetch(["docs"])
    }
    const sendDocument = (category, firstCurrentFile)=>{
        app.alert("neutral", "Uploading document...")
        let theUrl = API_DOC_UPLOAD_BASE + `${unit.uid}/` // + 1
        const payload = new FormData();
        payload.append("doc", firstCurrentFile, firstCurrentFile.name.replace(" ","_"));
        payload.append("cat_number", `${DEFAULT_DOC_CATEGORIES.indexOf(category)}`);

        const options = { method: 'POST', body: payload,
          headers: {
            'Accept': (
                'text/html,application/xhtml+xml,application/xml;q=0.9,'
                +'image/avif,image/webp,*/*;q=0.8'
            )
          },
        };
        s__failedUpload(false)
        const req = new XMLHttpRequest();
        req.open('POST', theUrl);

        req.onreadystatechange = function (oEvent) {
            if (req.readyState === 4) {
                if (req.status === 200) {
                } else {
                   dd("AlertError", req.statusText);
                   s__failedUpload(true)
                }
            }
        };

        req.upload.addEventListener('progress', (e)=>{
            s__percentComplete(parseInt(`${(e.loaded / e.total)*100}`))
        })
        req.addEventListener('load', async (e)=>{
            if (req.status < 400) {
            } else {
                dd("err")
            }

            if (req.status >= 400)
            {
                if (req.statusText == "Request Entity Too Large")
                {
                    s__firstFile(null)
                    s__firstFileCat("")
                    return alert("Error: File Exceeds the Size Limit!")
                }
            }
            app.alert("success", "Document uploaded successfully!")
            refetch(["docs"])
            
        })
         req.send(payload);
    }



    /****** HTML ******/
    return (
    <div className="">

        {DEFAULT_DOC_CATEGORIES.map((aFileType, index)=>{
            const isCategoryEmpty = !Object.keys(fileArrayMap.get(aFileType)).length
            return (
            <div className='flex-col mt-2' key={index}>
                {((!isCategoryEmpty) || (firstFile && aFileType == firstFileCat)) && 
                    <div className={"flex-center flex-col bord-r-8 w-100 mt-1 pa-2 "+
                        `${!failedUpload ? "ims-border-faded" : "border-red-50"}`}
                    >
                        <div className='w-100 pa-2 mb-2'>{aFileType}</div>
                        {Object.keys(fileArrayMap.get(aFileType)).map((aFileId,index)=>{
                            const theFile = fileArrayMap.get(aFileType)[aFileId]
                            return (
                            <div key={index} className="w-100 px-2">
                                <FileJustUploaded {...{foundFilename: theFile.file_name,
                                        cat: aFileType,validatedFileType: ".",
                                        fileId:aFileId,date: "2022/2/12",
                                        handleDelete, handleDownload,
                                    }}
                                />
                            </div>
                            )
                        })}
                        {firstFile && aFileType == firstFileCat && !failedUpload &&
                            <div key={index} className="w-100 px-2">
                                <FileJustUploaded {...{foundFilename: "loading...",
                                    cat: aFileType,validatedFileType: "pdf",
                                    date: ". . .",
                                    percentComplete:percentComplete
                                }}/>
                            </div>
                        }
                        {failedUpload && (
                            <div className={`flex-col tx-red ${failedUpload ? "scale-outin-once-1" : ""}`}>
                                <span className=' pa-2 pb-1 bord-r-100 noverflow tx-lgx bg-red-25'>
                                    <BsExclamationCircle/>
                                </span>
                                <span>Upload failed, please try again</span>
                            </div>
                        )}
                        <div className='w-100 flex flex-justify-end mt-2'>
                            <InputFile fileMapMap={fileArrayMap.get(aFileType)}
                                handleUpload={(cat,file)=>{_handleUpload(aFileType,file)}}
                                border="dashed" title={aFileType}
                            />
                        </div>
                    </div>
                }
                {aFileType != firstFileCat &&
                Object.keys(fileArrayMap.get(aFileType)).length == 0 &&  /* */
                    <div className='w-100   '>
                        <InputFile fileMapMap={fileArrayMap.get(aFileType)}
                            handleUpload={(cat,file)=>{_handleUpload(aFileType,file)}}
                            border="solid" title={aFileType}
                        />
                    </div>
                }
            </div>
            )
        })}
    </div>
    )
}