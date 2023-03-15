import { MapOrEntries } from "usehooks-ts"


export const obj2MapArray = (theObj): MapOrEntries<string, any> =>{
    return Object.keys(theObj).map((theObjKey, index)=>{
        return [theObjKey, theObj[theObjKey]]
    })
}
