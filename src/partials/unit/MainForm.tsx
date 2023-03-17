import { useContext, useMemo } from 'react'


// import { dlog, dd, isDevEnvironment } from '@/scripts/helpers/devHelper';
import { AppContext } from '@/scripts/contexts/AppContext'
import { useArrayMapPlus } from '@/scripts/helpers/useHooksHelper'
import { IUnit, IUnitBaseOpts } from '@/scripts/constants/unit'
import { MainFormInputSelect } from '@/src/partials/unit/MainFormInputSelect'
import { OInputNImages } from '@/src/items/molecules/carousel/OInputNImages'
import { OInputNMeasure } from '@/src/items/atoms/inputs/OInputNMeasure'
import CSS from '@/styles/modules/UnitMainForm.module.css'
import localJson from '@/localJson.json'

export interface UnitMainFormProps {
    updateNewData?: any;
    unit?: IUnit;
    isAddPage?: boolean;
    optMapObj?: IUnitBaseOpts,
    editMode?: boolean;
    refetch?: () => void;
}
// ReactFunctionComponent
export const UnitMainForm = ({
    updateNewData,
    unit,
    optMapObj,
    isAddPage,
    editMode,
    refetch=()=>{},
}: UnitMainFormProps)=>{
    const app = useContext(AppContext);

    /****** DATA ******/
    const DEFAULT_INPUT_KEYMAP_OBJECT = {
        "size": {
            width: {
                title:"Width", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
            length: {
                title:"Length", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
            height: {
                title:"Height", value: "11", floatField: "9", 
                format_title:"ft/in", format_titles:["feet","inches"],
            },
        },
    }
    const [model_styles, model_styles_do, model_styles_obj] = (
        useArrayMapPlus(optMapObj.model_styles,"id", unit.model_style,"label")
    );
    // const [sales_statuses, sales_statuses_do, sales_statuses_obj] = (
    //     useArrayMapPlus(optMapObj.sales_statuses,"id", unit.sales_status,"id")
    // );
    const [conditions, conditions_do, conditions_obj] = (
        useArrayMapPlus(localJson.condition,"id", unit.condition,"id")
        // useArrayMapPlus(optMapObj.conditions,"id", unit.condition,"id")
    );
    const [inventory_statuses, inventory_statuses_do, inventory_statuses_obj] = (
        useArrayMapPlus(optMapObj.inventory_statuses,"id", unit.inventory_status,"id")
    );
    const [distributors, distributors_do, distributors_obj] = (
        useArrayMapPlus(optMapObj.distributors,"id", unit.distributor,"name")
    );
    const [manufacturers, manufacturers_do, manufacturers_obj] = (
        useArrayMapPlus(optMapObj.manufacturers,"id", unit.manufacturer,"name")
    );
    const [dealers, dealers_do, dealers_obj] = (
        useArrayMapPlus(optMapObj.dealers,"id", unit.dealer,"name")
    );
    const [owners, owners_do, owners_obj] = (
        useArrayMapPlus(optMapObj.owners,"id", unit.owner,"name")
    );
    const unit_brand = useMemo(() =>
        !optMapObj ? -1 : optMapObj.manufacturers.filter(object => {return object.name == unit.brand; })[0]
    , [optMapObj,unit]);



    /****** UPDATE ******/
    const updateGallery = (newDataObj)=>{
    }
    const updateField = (newDataObj)=>{
        updateNewData(newDataObj)
    }
    const updateEntityField = (newDataObj)=>{
        updateNewData(newDataObj)
    }



    /****** HTML ******/
    return (
    <div className="flex flex-align-start  Q_xs_md_flex-col"> 
        <div className={`flex-col flex-align-start  pt-0 pa-4 flex-1 ${CSS["unit-mainform_inputs"]} `}>
            <div className={`    flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                {<MainFormInputSelect  label="Retailer" sublabel="Name visible on unit"
                    defaultDisplay={unit.brand == "None" ? unit.manufacturer : unit.brand}
                    display={unit.brand == "None" ? "" : unit.brand}
                    optMap={manufacturers} optName={"name"} value={unit_brand ? unit_brand.id : 0}
                    editMode={editMode}   updateNewData={updateEntityField}   inputName="brand"
                    boolConfig={["isReadOnly", "isErasable"]}
                />}
            </div>
            <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Style"   inputName="model_style"
                    display={unit.model_style}
                    value={model_styles_obj ? model_styles_obj.id : 0 }
                    optMap={model_styles} 
                    editMode={editMode}  boolConfig={["addMode","isErasable"]}
                    updateNewData={updateField}
                /> 
            </div>
            <div className={`     flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <OInputNMeasure  label={"Size"}   inputName="size"
                    value={unit.size}
                    inputkeyobj={DEFAULT_INPUT_KEYMAP_OBJECT.size} editMode={editMode}
                    updateNewData={updateField} 
                />
            </div>
            
            <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Condition"   inputName="condition"
                    display={conditions_obj ? conditions_obj.label : ""}
                    value={unit.condition}
                    optMap={conditions}  
                    editMode={editMode}  boolConfig={["isReadOnly", ]}
                    updateNewData={updateField}
                /> 
            </div>
            <div className={`flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`}>
                <MainFormInputSelect  label="Inventory Status"   inputName="inventory_status"
                    display={inventory_statuses_obj ? inventory_statuses_obj.label : ""}
                    value={unit.condition}
                    optMap={inventory_statuses} 
                    editMode={editMode}  boolConfig={["isReadOnly", ]}
                    updateNewData={updateField}
                /> 
            </div>
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Dealer" 
                    display={unit.dealer} value={dealers_obj ? dealers_obj.id : 0}
                    optMap={dealers} optName={"name"}
                    editMode={editMode}    inputName="dealer"
                    boolConfig={["isReadOnly",  "isErasable"]}
                    updateNewData={updateEntityField} 
                />}
            </div>
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Distributor"
                    sublabel="The company providing unit to Dealer"
                    display={unit.distributor} value={distributors_obj ? distributors_obj.id : 0 }
                    optMap={distributors} optName={"name"}
                    editMode={editMode} inputName="distributor"
                    boolConfig={["isReadOnly", "isErasable"]}
                    updateNewData={updateEntityField}   
                />}
            </div>
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Manufacturer"
                    sublabel="Known sometimes as “Retailer”. Who Built the unit?"
                    display={unit.manufacturer}
                    value={manufacturers_obj ? manufacturers_obj.id : 0 }
                    optMap={manufacturers} optName={"name"}
                    editMode={editMode}     inputName="manufacturer"
                    boolConfig={["isReadOnly", "isErasable"]}
                    updateNewData={updateEntityField} 
                />}
            </div>
            <div className={` flex w-100   ${editMode ? 'pb-4 pr-6' : 'pb-8'}`} >
                {<MainFormInputSelect  label="Unit Manager"  
                    display={unit.owner} value={owners_obj ? owners_obj.id : unit.owner } 
                    optMap={owners} optName={"name"}
                    editMode={editMode}    inputName="owner" 
                    updateNewData={updateEntityField} 
                    boolConfig={["isReadOnly","addMode", "isErasable"]}
                />}
            </div>
        </div>

        <div className={`flex-col  flex-align-center ${CSS["unit-mainform_gallery"]} `}>
            {isAddPage &&  <><div className="ims-bg-faded h-400px ord-r-8 w-400px"></div></>}
            {!isAddPage && 
                <div className="flex-col flex-align-center pb-4   ">
                    <OInputNImages uid={unit.uid} filelistString={unit.images} 
                        
                        updateNewData={updateGallery} refetch={refetch} 
                    />
                </div>
            }
        </div>
    </div>
    )
}