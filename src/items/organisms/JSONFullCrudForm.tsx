import { forwardRef, useContext, useImperativeHandle, useState,  } from 'react'


import { AppContext } from '@/scripts/contexts/AppContext';
import { fetchDelete, fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper';

const Component = forwardRef(({masterKeyName, theUrl, q__queriedObj, queriedArray, backup = []}:any, ref)=>{
    const app = useContext(AppContext)    
    const DEFAULT_ITEM = {label:"",id:"", colName:"", colValue:""}
    const [form, s__form] = useState(DEFAULT_ITEM)
    const createItem = (e)=>{
        addNewItem(form.label)
        s__form(DEFAULT_ITEM)
        // q__queriedObj.refetch()
        e.preventDefault()
    }
    const updateItem = async (e)=>{
        await updateData(form.id, form.label)
        s__form(DEFAULT_ITEM)
        // q__queriedObj.refetch()
    }
    async function updateData(id,label,val="") {
        const response = await fetchPut(theUrl, {
            keyName:masterKeyName,
            id: parseInt(id),
            label: label,
            // colVal: val, 
        })
        if (response) {
            const updatedItem = await response.json();
            console.log(updatedItem);
        }
        // q__queriedObj.refetch()
    }
    const handleChange = (e,subProp)=>{
        s__form({...form,...{[subProp]:e.currentTarget.value}})
    }
    const deleteUnit = async ()=>{
        let id = form.id
        await deleteItem(id)
        // q__queriedObj.refetch()
    }
    async function addNewItem(label) {
        const response = fetchPost(theUrl, {keyName:masterKeyName,label: label,})
        if (!response) { return app.alert("error", "Error") }
        app.alert("success", "Item successfully added to JSON file")
    }
    async function deleteItem(id) {
        const response = await fetchDelete(theUrl, {keyName:masterKeyName,id: parseInt(id),})
        if (!response) { throw new Error('Failed to delete item'); }
    }    
    async function deleteAll() {
        const response = await fetchDelete(theUrl,{keyName:masterKeyName,})
    }
    async function importFromBackup() {
        if (backup == undefined) return app.alert("error", "Backup Undefined")
        for (let index = 0; index < backup.length; index++) {
            const item = backup[index];
            await addNewItem(item.label)
        }
    }      
    async function createCol(e) {
        let theSelectedItem = queriedArray.filter((x,index)=>{ return x.id == form.id })
        if (theSelectedItem.length == 0) { return }
        let selectedItem = !theSelectedItem[0].colVal ? "{}" : theSelectedItem[0].colVal
        let oldColVal = JSON.parse(selectedItem)
        await updateData(form.id, theSelectedItem[0].label, JSON.stringify( {...oldColVal,...{[form.colName]: form.colValue}} ))
        e.preventDefault()
    }    
    useImperativeHandle(ref, ()=>({
        form, s__form,
    }));
    


    return (<>
        <div className="flex-center gap-2 flex-1">
            <div className="flex-wrap gap-1">
                <button onClick={createItem} className="ims-button-primary clickble mx-2 mr-8">Add Item</button>
                <form onSubmit={createItem}>
                    <input placeholder='Item Label' className='ims-button-faded' value={form.label}
                        onChange={(e)=>handleChange(e,"label")}  
                    />
                </form> 
            </div>
            {!!queriedArray &&
                <div className="flex-wrap gap-1">
                    <form onSubmit={updateItem}>
                        <input placeholder='ID' className='ims-button-faded w-80px' value={form.id}
                            onChange={(e)=>handleChange(e,"id")} 
                        />
                    </form> 
                    <button onClick={updateItem} className="ims-button-primary clickble ">Update {form.id}</button>
                    <button onClick={()=>{deleteUnit()}} className="ims-button-primary clickble opaci-75  ">Delete {form.id}</button>
                </div>
            }
        </div>
        {/* <div className="flex-col gap-1  w-100">
            <button onClick={createCol} className="ims-button-primary opaci-75 nowrap clickble w-100 ">Update metadata</button>
            <div className="flex-center gap-1  ">
                <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Add col</button>
                <button onClick={createCol} className="ims-button-primary nowrap clickble  ">Update col</button>
            </div>        
            <form onSubmit={createCol} className="flex gap-1">
                <input placeholder='Column Name' className='ims-button-faded w-150px' value={form.colName}
                    onChange={(e)=>handleChange(e,"colName")} 
                />
                <input placeholder='Value' className='ims-button-faded w-100px' value={form.colValue}
                    onChange={(e)=>handleChange(e,"colValue")} 
                />
            </form> 
        </div>  */}
        <div className="flex-col gap-1 ">
            {!!queriedArray &&
                <button onClick={()=>{deleteAll()}} className="ims-button-primary clickble opaci-75  ">Clear All</button>
            }
            {backup.length > 0 &&
            <button onClick={()=>{importFromBackup()}} className="ims-button-primary  clickble   "
                style={{filter:"hue-rotate(180deg)"}}
            >
                Backup
            </button>
            }
        </div>
    </>);
});
Component.displayName = 'StandardCrud'
export default Component