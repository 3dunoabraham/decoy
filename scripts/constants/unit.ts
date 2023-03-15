
export interface IUnitModelStyle {
    id: number;
    label: string;
    description: string;
    model_style_abbreviation: string;
}

export type IUnitBaseOpts = {
    model_styles?: any;
    types?: any;
    conditions?: any;
    manufacturers?: any;
    dealers?: any;
    distributors?: any;
    owners?: any;
    imagesArray?: any;
    inventory_statuses?: any;
    sales_statuses?: any;
}

export type IUnit = {
    uid: string;
    type: string;
    sales_status: string; 
    sales_date: string; 
    vin: string;
    year: string;
    workorder: string;
    model_style: string;
    brand: string;
    dealer: string; 
    distributor: string;
    manufacturer: string;
    owner: string;
    size: any;
    condition: string;
    inventory_status: string; 
    docs: string;
    images: string;
    price: any;
    registration_title: any;
    characteristics: any;
    locations: any;
    location_related: any;
    location: any;
    physical_as_of: any;
    gps: any; 
    investors: any;
    previous_investor: string;
    current_investor: string;
}

export const DEFAULT_UNIT = {
    "uid":"0000-0000","type":"","sales_status":"1","sales_date":"",
    "vin":"","year":"","workorder":"","model_style":"",
    "brand":"", "dealer":"","distributor":"", "manufacturer":"","owner":"", 
    "size":{width:{feet:"",inches:""},height:{feet:"",inches:""},length:{feet:"",inches:""}}, 
    "condition":"1", "inventory_status":"1","docs": "[]","images": "[]",
    "price": {retail_price:"", min_retail_price:"", agreement_price:"", min_agreement_price:""},
    "characteristics": {color:"", axles:"1", hitch_type:"1", shipping_weight:"", gvwr:""},
    "registration_title": {mso: "", title_number: "", title_state: "", title_status: "1"},
    "gps": {manufacturer:"1",serial:""},
    "locations": { location:"", physical_as_of: "" },
    "location_related":"", "location":"", "physical_as_of":"", 
    "investors": {current_investor:"",previous_investor:""},
    "previous_investor":"", "current_investor":"",
}

export const EMPTY_UNIT_RES = {
    uid:"0000-0000",type:"1",sales_status:"1",sales_date:"",
    year:"",vin:"",workorder: null,model_style:"",
    brand:"None", dealer:"None",distributor:"None", manufacturer:"None",owner:"None", 
    size: null, condition:"0", inventory_status:"0",docs: "[]",images: "[]",
    price: null,characteristics: null,registration_title: null,gps: null,
    location:"None", location_related:null, physical_as_of:"", // locations
    previous_investor:"None", current_investor:"None",// investors
}

export const DEFAULT_MODEL_STYLE_OBJARRAY = [
    {id:"0", label:"Car", desc:"",created_at:""},
    {id:"1", label:"Car Hauler", desc:"",created_at:""},
    {id:"2", label:"Trailer", desc:"",created_at:""},
    {id:"2", label:"Cargo", desc:"",created_at:""},
]
// export const DEFAULT_HITCH_TYPE_OBJARRAY = [
//     {label:"5th Wheel",id:"1"},
//     {label:"Gooseneck",id:"2"},
//     {label:"Pintle",id:"3"},
//     {label:"Bumper",id:"4"},
// ]

// export const DEFAULT_COLOR_OBJARRAY = qweqwe
export const DEFAULT_COLOR_OBJARRAY = [
    {label:"Black",id:"1"},
    {label:"Yellow",id:"2"},
    {label:"Orange",id:"3"},
    {label:"Grey",id:"4"},
    {label:"Red",id:"5"},
]

export const DEFAULT_UNIT_OPTS = {
    model_styles: DEFAULT_MODEL_STYLE_OBJARRAY, 
    inventory_statuses: [], sales_statuses: [], title_statuses: [], conditions: [], 
    orgsList: [], manufacturers: [], dealers: [], distributors: [], owners: [],
}
export const DEFAULT_DOC_CATEGORIES = ["Registration", "Title", "MSO", "Insurance"]

// export const FAKE_UNIT = {
//     "uid":"8889-8818",
//     "vin":"123ABCV63261356",
//     "year":"",
//     "brand":"Stor-Mor",
//     "dealer":"Barbies Trailers",
//     "distributor":"Stor-Mor",
//     "manufacturer":"Big Tex",
//     "owner":"Silverline",
//     "model_style":"Cargo",
//     "size":{width:{feet:1,inches:2},height:{feet:3,inches:4},length:{feet:5,inches:6}},
//     "condition":"1", 
//     "inventory_status":"1",
//     "sales_status":"1", 
//     "sales_date":"", 

//     "docs": [],
//     "images": [
//         "https://i.imgur.com/4yCs9Ed.png", "https://i.imgur.com/0s5StWl.png",
//         "https://i.imgur.com/kZ0VSZk.png", "https://i.imgur.com/NVJUGYl.png",
//         "https://i.imgur.com/8e2GPpS.png",
//         "https://i.imgur.com/WX2Gjzt.png", "https://i.imgur.com/nryX2xi.png",
//         "https://i.imgur.com/uQiOKC0.png", 
//     ],

//     "location_related":"1", 
//     "locations": { location:null, physical_as_of: null },
//     "location":"now", 
//     "physical_as_of":"now", 
//     "registration_title": {
//         mso: "AAFG8eGHr3", title_number: "11552346851", title_state: "5", title_status: "1",
//     },
//     "price": {
//         retail_price:null, min_retail_price:"290.9", agreement_price:null, min_agreement_price:"20",
//     },
//     "characteristics": {color:null, axles:null, hitch_type:null, shipping_weight:null, gvwr:null},
//     "gps": {manufacturer:null,serial:null},
//     "investors": {current_investor:null,previous_investor:null},
//     "previous_investor":"", "current_investor":"",
// }