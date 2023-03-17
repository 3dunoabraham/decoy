import { BsTrash, BsCloudArrowDown, BsExclamationTriangle } from 'react-icons/bs'
import { AiOutlineLoading } from 'react-icons/ai'


import { STATIC_DOC_BASE } from '@/scripts/constants/api'
import Link from 'next/link'
// ReactFunctionComponent
export const FileJustUploaded = ({
    cat, fileId="", 
    validatedFileType,foundFilename,date,
    percentComplete = 101,
    handleDelete = (category, theFile)=>{}, handleDownload = (category, theFile)=>{},
})=>{
    return (
    <div className="  w-100" >
        <div className="flex-justify-between flex w-100" > 
            <div className="flex-1 flex-col flex-align-start noverflow ">
                <Link href={percentComplete < 100 ? "#" :  `${STATIC_DOC_BASE}${foundFilename}`}
                    target={percentComplete < 100 ? "" : "_blank"} rel="noreferrer"
                    className="ims-tx-primary opaci-chov--50 underline tx-bold-5 ims-underline-primary"  
                >
                    {foundFilename}
                </Link>
            </div>
            <div className=" ims-tx-faded  px-2" >{date}</div>
            {(foundFilename == "loading..." )  && <div className="spin-1 " ><AiOutlineLoading /></div>}
            {(foundFilename != "loading..." )  &&
                <div className="flex ims-tx-faded tx-lg tx-bold-5 " >
                    <div className="px-1 opaci-chov--50" onClick={()=>{handleDelete(cat,{id:fileId})}}>
                        <BsTrash />
                    </div>
                    <Link
                        href={percentComplete < 100 ? "#" :  `${STATIC_DOC_BASE}${foundFilename}`}
                        download={`${foundFilename}`} target="_blank" rel="noreferrer"
                        className="px-1 opaci-chov--50"  
                    >
                        <BsCloudArrowDown />
                    </Link>
                    
                </div>
            }
        </div>
        {!(foundFilename != "loading..." || percentComplete == 100) && 
            <div className="flex-center" > 
                <div className="flex-1  bg-b-20 ord-r-25">
                    <div className="ims-bg-primary ord-r-25 py-1"
                        style={{width:parseInt(`${percentComplete}`)+"%"}}
                    >
                    </div>
                </div>
                <div className="tx-mdl pl-2" > {parseInt(`${percentComplete}`)}%</div>
                {!validatedFileType && 
                    <div className="pl-3 tx-lgx tx-red" title="Wrong Extension"> <BsExclamationTriangle /></div>
                }
            </div>
        }
    </div>
    )
}