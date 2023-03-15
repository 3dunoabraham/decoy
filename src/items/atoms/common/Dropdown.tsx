import { forwardRef, ReactNode, useContext, useImperativeHandle, useRef, useState,  } from 'react'
import { useOnClickOutside } from 'usehooks-ts';


const Component = forwardRef(( {buttonTitle, children}:{
    buttonTitle: string
    children?: JSX.Element|JSX.Element[];
}, ref )=>{
    const [isOpen, s__isOpen] = useState(false)
    const $itemDom:any = useRef(null)
    useOnClickOutside($itemDom, ()=>{
        s__isOpen(false)
    })

    return (
    <div className='pos-rel' ref={$itemDom}>
        <button className="ims-button-primary" onClick={()=>{ s__isOpen(true) }}>
            {buttonTitle}
        </button>
        {isOpen && 
            <div  className="flex pos-abs bg-light pa-2 z-800 right-0 bottom-0 translate-y-100 bord-r-8 box-shadow-2">
                {children}
            </div>
        }
    </div>
    )

});
Component.displayName = 'Dropdown'

export default Component