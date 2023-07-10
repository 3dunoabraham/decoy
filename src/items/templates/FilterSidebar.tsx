import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useMemo } from "react";
import { BsChevronUp, BsCircle } from "react-icons/bs";

import { DEFAULT_UNIT_FOREIGNS, fetchUnitForeigns } from "@/scripts/helpers/fetchHelper";
import { SidebarFilterSection } from "@/src/items/templates/SidebarFilterSection";
import SidebarHeader from "@/src/items/templates/SidebarHeader";
import { AppContext } from "@/scripts/contexts/AppContext";
import { InventoryContext } from "@/scripts/contexts/InventoryContext";
import { useRouter } from "next/router";
import { FAKE_UNIT_FOREIGNS } from "@/scripts/constants";
import LoginBtn from "../molecules/auth/LoginBtn";
import AppClientDesc from "../molecules/auth/AppClientDesc";
import Link from "next/link";
import { FaQuestion } from "react-icons/fa";

export default function Component({ online=true }) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { query } = useRouter()
    const inv = useContext(InventoryContext)
    const app = useContext(AppContext)
    const INVENTORY_FILTERS_OBJ = {
        sales_status:{
            filter: {title: "Sales Status",optField: "label", optName:"sales_status", fieldName:"label"},
            optsArray: [],
        },
        dealer:{
            filter: {title: "Dealer",optField: "name", optName:"dealer", fieldName:"name"},
            optsArray: [],
        }
    }
    const q_foreigns:any = useQuery({queryKey: ['statusesData'], queryFn: async () =>
        app.online ? await fetchUnitForeigns() : FAKE_UNIT_FOREIGNS
    ,})
    const q__foreigns = useMemo(()=> (
        q_foreigns.error || !q_foreigns.data || q_foreigns.isLoading) ? DEFAULT_UNIT_FOREIGNS : q_foreigns.data
    ,[q_foreigns])



    const filtersObj = useMemo(() => {
        const lookupTable = {
            sales_status: {
                optsArray: q__foreigns.sales_statuses,
                arrayPropertyKeyName: 'sales_statuses',
                filterByProperty: 'sales_status',
                keyFieldName: "id",
            },
            dealer: {
                optsArray: q__foreigns.dealers,
                arrayPropertyKeyName: 'dealers',
                filterByProperty: 'dealer',
                keyFieldName: "name",
            },
        };
      
        const filtersObj = { ...INVENTORY_FILTERS_OBJ };
      
        Object.keys(lookupTable).forEach((key) => {
          const { optsArray, arrayPropertyKeyName, filterByProperty, keyFieldName } = lookupTable[key];
          filtersObj[key].optsArray = q__foreigns[arrayPropertyKeyName];
          if (inv.unitsArray.length > 0) {
            filtersObj[key].optsArray = optsArray.map((anItem, index) => {
              const theCount = inv.unitsArray.filter((theUnit, i) => theUnit[filterByProperty] === anItem[keyFieldName]);
              return { ...anItem, ...{ _COUNT: theCount.length } };
            });
          }
        });
      
        return filtersObj;
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [q__foreigns, inv.unitsArray]);


    useEffect(()=>{
        let freshFilters = {}
        let sales_status = app.query.stts
        if (sales_status && q__foreigns.sales_statuses) {
            let theLabel = q__foreigns.sales_statuses.filter((anItem,index)=>{
                return anItem.id == sales_status
            })
            if (theLabel.length > 0)
            {
                freshFilters["sales_status"] = {
                    on: true, id: sales_status, label: theLabel[0].label, title: "Sales Status"
                }
            }
        }
        app.s__filters(freshFilters)
    },[q__foreigns])

    const handleFilterClick = (data)=> {
        let newFiltersObj = {...app.filters,...{
            [data.optName]: { on: true, id: data.id, label: data.label, title: data.title}
        }}
        if (data.optName in app.filters && app.filters[data.optName].id == data.id)
        {
            delete newFiltersObj[data.optName]
        }
        app.s__filters(newFiltersObj)
    }

    return (<>
    <div className="flex-center py-4 clickble  px-4 bg-w-hov-10  invisible Q_lg_x">
        <div className=" pr-3 invisible  Q_lg_x"><BsCircle /></div>
        <div className="px-1 tx-center tx-lg opaci-hov--50"></div>
        <div className="flex-1 pl-3 Q_lg_x w-min-200px"></div>
        <div className=" tx-center   tx-mdl Q_lg_x" ><BsChevronUp /></div>
    </div>
    <div className="pos-fix top-0  flex-col Q_lg_x">
        <SidebarHeader />
        <div className='flex-1 w-100'>
            
            {<>
                <div className='w-100 bord-r-t-5 box-shadow-2 ' style={{background:"orangered"}}>
                    <LoginBtn><AppClientDesc /></LoginBtn>
                </div>
                <hr className="w-90 opaci-50  my-3" style={{borderColor: "white"}} />
            </>}
            <div className=''>
                
                <Link href="https://twitter.com/webpov" target="_blank"
                    className="flex-center box-shadow-2 py-2 clickble  px-2 ims-bg-primary bord-r-b-5"
                >
                    <div className=" pr-3  Q_xl_x"></div>
                    <div className="px-1 tx-center tx-lg opaci-hov--50"><FaQuestion /></div>
                    <div className="flex-1 pl-1 Q_xl_x w-min-220px">Support</div>
                </Link>
            </div>
        </div>
    </div>
    </>)
}