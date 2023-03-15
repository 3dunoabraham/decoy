import { isDevEnvironment } from "@/scripts/helpers/devHelper";
// ReactFunctionComponent
export const EmptyInventory =() =>{
    return (
    <div className='w-100 flex-center flex-col'>
        <div className='tx-xl opaci-10 tx-ls-5 pt-100 pb-8 tx-center '>
            No Units Found
        </div>
        {isDevEnvironment &&
            <a href="https://localhost:3000/unit/7391-7954?offline"
                className="py-1 underline opaci-chov--25 opaci-50"
            >
                View &quot;Test Unit&quot;
            </a>
        }
        {isDevEnvironment &&
            <a href="https://ims.jinaron.com/api/v1/units/" target="_blank" rel="noreferrer" 
                className="py-4 tx-lg pt-1 ims-tx-link opaci-chov--50"
            >
                Check API Status
            </a>
        }
    </div>
    )
}