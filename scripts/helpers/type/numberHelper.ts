export const parseReadableSize = (fileSize)=>{
    if(fileSize.length < 7) return `${Math.round(+fileSize/1024).toFixed(2)} KB`
    return `${(Math.round(+fileSize/1024)/1000).toFixed(2)} MB`
}