import { AppContext } from '@/scripts/contexts/AppContext';
import Link from 'next/link'
import { useContext } from 'react';


export interface BreadCrumbsProps { pages: string[][]; current?: string; }
// ReactFunctionComponent
export const BreadCrumbs = ( { pages, current }: BreadCrumbsProps)=>{
    const app = useContext(AppContext)
    return (
    <div className="flex-center flex-justify-start pt-7 mt-1 tx-smd">
        <Link  href="/" className=" opaci-hov--50 py-2 pr-1">
            <div className="ims-tx-primary tx-bold-6 ">{app.institution.title}</div>
        </Link>
        {pages.map(([pageUrl,pageTitle], index)=>(
            <div className="   clickble" key={index}>
                <span> <b className="opaci-10 tx-mdl py-2">/</b> </span>
                
                <Link href={pageUrl} className=" opaci-hov--50 pa-2">
                    <span className="tx-bold-4 ims-tx-faded">{pageTitle}</span>
                </Link>
            </div>
        ))}
        {!!current && <>
            <b className="opaci-10 tx-mdl py-2">/</b>
            <div className="ims-tx-primary ims-bg-faded tx-bold-5 ml-2 pa-2 bord-r-8">
                {current}
            </div>
        </>}
    </div>
    )
}