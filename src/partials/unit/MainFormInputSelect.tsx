import { InputSelect } from '@/src/items/atoms/inputs/InputSelect'
export interface MainFormInputSelectProps {
    inputName?: string; value?: string; optName?: any; optMap?: any;     
    display?: string; defaultDisplay?: string; label?: string; sublabel?: string;
    /* CONFIG */ editMode?: boolean;  boolConfig?: any;
    /* UPDATE */ updateNewData?: any;
}
// ReactFunctionComponent
export const MainFormInputSelect = ({
    inputName, value, optName = "label", optMap, 
    display, defaultDisplay,  label, sublabel, 
    boolConfig = [],  editMode,
    updateNewData,
}: MainFormInputSelectProps)=>{
    return (<>
        <div className="w-50 tx-bold-5 tx-smd ims-tx-lightdark pr-4">
            {label || "Label"}
            {!!sublabel &&
                <div className="tx-bold-3 tx-sm pt-1">{sublabel}</div>
            }
        </div>
        <div className="w-50 ">

            {!editMode  ?
                <div className={`tx-md ims-tx-faded pl-5 pr-4 `}>
                    {!!defaultDisplay ? defaultDisplay : display}
                    {/* {!!defaultDisplay && <div>{!!defaultDisplay ? defaultDisplay : display}</div>} */}
                    {/*                     
                    {optMap.size == 0
                        ? <div>"{value}"</div>
                        : <div>{!!defaultDisplay ? defaultDisplay : display}</div>
                    } */}
                </div>
                :
                <div className="flex ">
                    <InputSelect
                        refId={value} inputName={ inputName}
                        display={(display == "None" && !!defaultDisplay) ? defaultDisplay : display}
                        optName={optName} optMap={optMap} 
                        boolConfig={boolConfig}
                        updateNewData={updateNewData}                                    
                    />
                </div>
            }
        </div>
    </>)
}