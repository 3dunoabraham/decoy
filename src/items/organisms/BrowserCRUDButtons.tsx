import { AppContext } from '@/scripts/contexts/AppContext';
import { fetchDelete, fetchPost, fetchPut } from '@/scripts/helpers/fetchHelper';
import { forwardRef, useContext, useImperativeHandle, useState,  } from 'react'

const Component = forwardRef(({form, s__form, newItemHandler}:any, ref)=>{
    const app = useContext(AppContext)
    
    const [newList, s__newList] = useState([])
    const updateItem = async (e)=>{
        
        // await updateData(form.id, form.label)
        // s__form(DEFAULT_ITEM)
        // q__queriedArray.refetch()
    }
    const clearClientCrud = async ()=>{
        
        // await updateData(form.id, form.label)
        // s__form(DEFAULT_ITEM)
        // q__queriedArray.refetch()
    }
    const handleChange = async (e, key)=>{
        s__form({...form,...{[key]: e.currentTarget.value}})
    }
    const deleteItem = async ()=>{

    }
    // const getNewItemList = ()=>{
    //     return newList
    // }
    
    useImperativeHandle(ref, ()=>({
        newList,
        clearNewItems: ()=>{s__newList([])},
    }));
    const addItem = async ()=>{
        let newItem = {id:-1,label:form.label}
        newList.push(newItem)
        // let theNewList = [...newList]
        // s__newList([...newList])
        newItemHandler(newItem)
    }


    return (<>
        
        <div className='box-shadow-2 ord-r-8'>
            <div className="ims-bg-primary tx-center bg-b-50 px-2 py-1 tx-sm  flex-align-self-start  opaci-chov--50 px-1 ord-r-t-8 tx-white flex-center"
                onClick={()=>{addItem()}}
            >
                Add
            </div>
            <form onSubmit={addItem}>
                {/* <input placeholder='ID' className='ims-button-faded w-80px' value={form.id} onChange={(e)=>handleChange(e,"id")}  /> */}
                <input placeholder='Label' className='noborder  pa-2 w-100px ' value={form.label} onChange={(e)=>handleChange(e,"label")}  />
            </form> 
        </div>
        
        {/* <div>
            <div className="ims-bg-primary tx-center mb-1 bg-b-50 px-2 py-1 tx-sm  flex-align-self-start opaci-50 paci-hov--50 px-1 ord-r-8 tx-white flex-center "
                onClick={()=>{deleteItem()}}
            >
                Delete
            </div>
            
            <form onSubmit={updateItem}>
                <input placeholder='Label' className='ims-button-faded w-80px ' value={form.id} onChange={(e)=>handleChange(e,"label")}  />
            </form> 
        </div> */}

    </>);
});
Component.displayName = 'BrowserCRUDButtons'

export default Component