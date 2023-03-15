export const zeroPad = (value, length)=>{
    return `${value}`.padStart(length, '0');
}
const THE_DATE_NOW = new Date()
export const tenYearsAgoDateString = (
    `${THE_DATE_NOW.getUTCFullYear()-10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)
export const tenYearsFutureDateString = (
    `${THE_DATE_NOW.getUTCFullYear()+10}`+
    `-${zeroPad(THE_DATE_NOW.getUTCMonth()+1,2)}-${zeroPad(THE_DATE_NOW.getUTCDate(),2)}`
)

export const parseUTCString = (_theDate)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`+
        `T`+
        `${zeroPad(theDate.getUTCHours(),2)}:${zeroPad(theDate.getUTCMinutes(),2)}`
    )
}
export const parseUTCDateString = (_theDate)=>{
    let theDate = new Date(_theDate.toUTCString())
    return (
        `${theDate.getUTCFullYear()}-${zeroPad(theDate.getUTCMonth()+1,2)}-`+
        `${zeroPad(theDate.getUTCDate(),2)}`
    )
}