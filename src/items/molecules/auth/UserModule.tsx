import { useState, useContext, useEffect } from "react";
import Link from 'next/link'


import { AppContext } from "@/scripts/contexts/AppContext"
import { useLocalStorage } from "usehooks-ts";
import { FiLogOut } from "react-icons/fi";
import { BsFillShieldLockFill } from "react-icons/bs";
// ReactFunctionPageComponent
export const UserModule = ({/* amIDev, s__amIDev,  */ isVisible})=> {
    const [amIDev,s__amIDev] = useState<any>(null)
    useEffect(()=>{
        s__amIDev(LS_amIDev)
        setUser(["user","admin"][LS_amIDev])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const app = useContext(AppContext)
    const [LS_amIDev, s__LS_amIDev] = useLocalStorage('amIDev', 0)
    const toggleUser = ()=> {
        let newUser = app.user.name == "ADMIN" ? "user" : "admin"
        let newLocalStorageValue = newUser == "admin" ? 1 : 0
        s__LS_amIDev(newLocalStorageValue)
        s__amIDev(newLocalStorageValue)
        app.setUser(newUser)
    }
    
    const setUser = (userName)=> {
        let newLocalStorageValue = userName == "admin" ? 1 : 0
        s__LS_amIDev(newLocalStorageValue)
        s__amIDev(newLocalStorageValue)
        app.setUser(userName)
    }
    if (!isVisible) return <></>
    if (!app.user) return <></>
    if (amIDev == null) return <></>
    return (<>
        <div className='Q_lg_x  py-1 flex-1'>
            {app.user.name}
        </div>
        <div className=' ims-bg-primary ord-r-8   opaci-chov--50  tx-lgx pt-2 px-2' onClick={()=>{toggleUser()}}>
            {app.user.name == "ADMIN" && <BsFillShieldLockFill  />}
            {app.user.name != "ADMIN" && <FiLogOut  />}
        </div>
        {/* {false && <div className="flex-col flex-align-start w-min-100px ims-bg-faded pa-1 ord-r-8">
            {Object.keys(app.user.grants.unit).map((aGrant,index)=>{
                return (
                    <div  key={index} className="flex flex-justify-between w-100">
                        <div className="pa-1">{aGrant}</div>
                        <div className="pa-1">{app.user.grants.unit[aGrant] ? "1" : "0"}</div>
                    </div>
                )
            })}
        </div>} */}
    </>)
}