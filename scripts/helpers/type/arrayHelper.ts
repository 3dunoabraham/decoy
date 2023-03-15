
export const sortUIDAsc = (a, b)=>{
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemA - parseIntUIDItemB;
}
export const sortUIDDesc = (a, b)=>{
    let parseIntUIDItemA = parseInt(a.uid.replace("-",""))
    let parseIntUIDItemB = parseInt(b.uid.replace("-",""))
    return  parseIntUIDItemB - parseIntUIDItemA;
}
export const sortIDDesc = (a, b)=>{
    let parseIntUIDItemA = parseInt(a.id)
    let parseIntUIDItemB = parseInt(b.id)
    return  parseIntUIDItemB - parseIntUIDItemA;
}