import { useEffect, useMemo, useState } from 'react'


import { BottomSectionInputModule } from '@/src/partials/unit/BottomSectionInputModule'
import { BottomSectionOutputModule } from '@/src/partials/unit/BottomSectionOutputModule'
import { fetchJsonArray } from '@/scripts/helpers/fetchHelper'
import { API_PEOPLE_BASE, API_UNIT_OPTS_BASE } from '@/scripts/constants/api'
import { DEFAULT_COLOR_OBJARRAY } from '@/scripts/constants/unit'
import localJson from '@/localJson.json'
// ReactFunctionComponent
export const UnitBottomForm =({
    unit, 
    values, optMapObj,
    editMode,
    updateNewData,
})=>{
    /****** CREATE ******/
    useEffect(()=>{
        fetchJsonArray(API_UNIT_OPTS_BASE+"title_states").then((res)=>{s__title_statesArray(res)})
        fetchJsonArray(API_PEOPLE_BASE+"customers", "Data").then((res)=>{s__customersArray(res)})
        fetchJsonArray(API_PEOPLE_BASE+"investors", "Data").then((res)=>{s__investorsArray(res)})
    },[])



    /****** DATA ******/
    const [investorsArray, s__investorsArray] = useState([])
    const [customersArray, s__customersArray] = useState([])
    const [title_statesArray, s__title_statesArray] = useState([])
    const parsed_investorsArray = useMemo(()=>(
        investorsArray.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`})
    )),[investorsArray])
    const parsed_customersArray = useMemo(()=>(
        customersArray.map((x)=>({...x,_name:`${x.full_name.first_name} ${x.full_name.last_name}`})
    )),[customersArray])
    const axlesObjArray = (
        Array.from(Array(4).keys()).map(i => ({label:`${i+1}`,id:`${i+1}`}))
    )
    const inputsMapObj = {
        "price": {
            _: {label: "Price"},
            sales_price: {
                title:"Sales Price", inputName:"retail_price", defaultValue: "",
                widget: "string", customFormat: "price", limit:999000,
            },
            min_sales_price: {
                title:"Min Sales Price", inputName:"min_retail_price", defaultValue: "",
                widget: "string", customFormat: "price", limit:999000,
            },
            lease_price: {
                title:"Lease Price", inputName:"agreement_price", defaultValue: "",
                widget: "string", customFormat: "price", limit:999000,
            },
            min_lease_price: {
                title:"Min Lease Price", inputName:"min_agreement_price", defaultValue: "",
                widget: "string", customFormat: "price", limit:999000,
            },
        },
        "characteristics": {
            _: {label: "Characteristics"},
            color: {
                title:"Color", defaultValue: "",
                widget: "color", customFormat: "", limit: 24, inputName:"color",
            },
            axles: {
                title:"Axles", defaultValue: "",
                widget: "select", customFormat: "intrange", inputName:"axles", limit:4, 
                config:["isReadOnly"],  optName:"label"
            },
            hitch_type: {
                title:"Hitch Type", defaultValue: "", optName:"label", inputName:"hitch_type",
                widget: "enum", customFormat: "", config:["isReadOnly"], customWidth:200,
            },
            shipping_weight: {
                title:"Shipping Weight (lbs)", defaultValue: "",
                widget: "string", customFormat: "integer", inputName:"shipping_weight", limit: 99000
            },
            gvwr: {
                title:"GVWR (lbs)", defaultValue: "",
                widget: "string", customFormat: "integer", inputName:"gvwr", limit: 99999
            },
        },
        "registration_title": {
            _: {label: "Title"},
            title_status: {
                title:"Title Status", defaultValue: "", widget: "enum", customFormat: "",
                config:["isReadOnly"], optName:"label",inputName:"title_status",
            },
            title_number: {
                title:"Title No.", defaultValue: "",
                widget: "string", customFormat: "bigint", limit: 30, inputName:"title_number",
            },
            title_state: {
                title:"Title State", defaultValue: "", optName:"label", inputName:"title_state",
                widget: "enum", customFormat: "", config:["isReadOnly"], customWidth:150,
            },
            mso: {
                title:"MSO", defaultValue: "",
                widget: "string", customFormat: "", inputName:"mso",
            },
        },
        "locations": {
            _: {label: "Location"},
            location: {
                title:"Customer or Company", defaultValue: "",
                widget: "select", customFormat: "radio", path: true, inputName:"location",
                radioName:"location_related", titlesObj: {"1":"Company","2":"Customer"},
                inputsObj:{
                    company: {
                        title:"Company", defaultValue: "", optName: "name",
                        widget: "select", customFormat: "entity", inputName:"company", 
                    },
                    customer: {
                        title:"Customer", defaultValue: "", optName: "_name",
                        widget: "select", customFormat: "entity", inputName:"customer", 
                    },
                },
            },
            physical_as_of: {
                title:"Physical As Of Date", defaultValue: "",
                widget: "date", customFormat: "", inputName:"physical_as_of"
            },
            county: {
                autogen: true, title:"County", defaultValue: "",
                widget: "", customFormat: "",
            },
            address: {
                autogen: true, title:"Address", defaultValue: "",
                widget: "", customFormat: "",
            },
        },
        "gps": {
            _: {label: "GPS"},
            serial: {
                title:"Serial", defaultValue: "",
                widget: "string", customFormat: "", inputName:"serial",
            },
            manufacturer: {
                title:"Manufacturer", defaultValue: "",
                widget: "string", customFormat: "entity", inputName:"manufacturer",
            },
        },
        "investors": {
            _: {label: "Investor"},
            current_investor: {
                title:"Current Investor", defaultValue: "",
                widget: "select", config: ["isReadOnly"], customFormat: "entity",
                optName:"_name", inputName:"current_investor",
            },
            previous_investor: {
                title:"Previous Investor", defaultValue: "",
                widget: "select", config: ["isReadOnly"], customFormat: "entity",
                optName:"_name", inputName:"previous_investor",
            },
        },
    }



    /****** HTML ******/
    return (
    <div className="flex flex-align-start Q_xs_md_flex-col" >
        <div className="flex-col flex-align-start flex-1 pt-0 pa-4 w-100">
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} updateNewData={updateNewData} 
                        label={inputsMapObj["price"]._.label}
                        inputsMapObj={inputsMapObj["price"]} editMode={editMode} 
                        values={values["price"]}   inputName={"price"}
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["price"]._.label}
                        inputsMapObj={inputsMapObj["price"]} editMode={editMode} 
                        values={values["price"]}   
                    />
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["characteristics"]._.label}
                        inputsMapObj={inputsMapObj["characteristics"]} editMode={editMode} 
                        values={values["characteristics"]}  
                        inputName={"characteristics"} 
                        optsObj={{
                            axles:axlesObjArray,hitch_type:localJson.hitch_type,
                            color: DEFAULT_COLOR_OBJARRAY
                        }} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["characteristics"]._.label}
                        inputsMapObj={inputsMapObj["characteristics"]} editMode={editMode} 
                        values={values["characteristics"]}  
                        optsObj={{
                            axles:axlesObjArray,hitch_type:localJson.hitch_type,
                            color: DEFAULT_COLOR_OBJARRAY
                        }} 
                    />
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100  opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["registration_title"]._.label}
                        inputsMapObj={inputsMapObj["registration_title"]} editMode={editMode} 
                        values={values["registration_title"]} 
                        inputName={"registration_title"} 
                        optsObj={{
                            title_status:optMapObj.title_statuses,
                            title_state: title_statesArray,
                        }}
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["registration_title"]._.label}
                        inputsMapObj={inputsMapObj["registration_title"]} editMode={editMode} 
                        values={values["registration_title"]} 
                        optsObj={{
                            title_status:optMapObj.title_statuses,
                            title_state: title_statesArray,
                        }}
                    />
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["locations"]._.label}
                        inputsMapObj={inputsMapObj["locations"]} editMode={editMode} 
                        values={values["locations"]}   inputName={"locations"}
                        flex={"col"}
                          optsObj={{company:optMapObj.orgsList ,customer:parsed_customersArray}} 
                        needsFullObjectAtAPI={false} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["locations"]._.label}
                        inputsMapObj={inputsMapObj["locations"]} editMode={editMode} 
                        values={values["locations"]}   
                        flex={"col"}
                        optsObj={{company:optMapObj.orgsList ,customer:parsed_customersArray}} 
                    />
                    {false && !editMode &&
                        <BottomSectionOutputModule uid={unit.uid} 
                            label={inputsMapObj["locations"]._.label}
                            inputsMapObj={inputsMapObj["locations"]} editMode={false} 
                            values={values["locations"]}   
                            optsObj={{company:optMapObj.orgsList,customer:parsed_customersArray}} 
                        />
                    }
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["gps"]._.label}
                        inputsMapObj={inputsMapObj["gps"]} editMode={editMode} 
                        values={values["gps"]}   inputName={"gps"}
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid}
                        label={inputsMapObj["gps"]._.label}
                        inputsMapObj={inputsMapObj["gps"]} editMode={editMode} 
                        values={values["gps"]}  
                    />
                </div>
            </div>
            <div className="w-100">
                <hr className="mb-3 w-100 opaci-20" />
                <div className={`flex-col  w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                    <BottomSectionInputModule uid={unit.uid} 
                        label={inputsMapObj["investors"]._.label}
                        inputsMapObj={inputsMapObj["investors"]} editMode={editMode} 
                        values={values["investors"]}   inputName={"investors"}
                        optsObj={{
                            current_investor:parsed_investorsArray,
                            previous_investor:parsed_investorsArray
                        }} 
                        updateNewData={updateNewData} 
                    />
                    <BottomSectionOutputModule uid={unit.uid} 
                        label={inputsMapObj["investors"]._.label}
                        inputsMapObj={inputsMapObj["investors"]} editMode={editMode} 
                        values={values["investors"]}   
                        optsObj={{
                            current_investor:parsed_investorsArray,
                            previous_investor:parsed_investorsArray
                        }} 
                    />
                </div>
            </div>
            <hr className="w-100"/>
        </div >
    </div> 
    )
}