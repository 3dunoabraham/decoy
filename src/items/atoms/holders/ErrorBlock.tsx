import Link from 'next/link'
import Image from 'next/image'


// ReactFunctionComponent
export const ErrorBlock = ({err=null})=>{
    return (
    <div className="flex-center py-100">
        <div className="flex-col">
            {!!err && <div className="pb-3">
                <small>An error has occurred: </small>
                <div>{(!err.message && "error no message")}</div>
                <b className="tx-lg">
                    {!!err.message &&
                        err.message == `Unexpected token '<', "<!doctype "... is not valid JSON`
                            ? "Failed to fetch unit"
                            : err.message
                    }
                </b>
            </div>}

            <Image src='/icons/svg/404-error.svg' alt='next' width='200' height='200'/>
            <h1 className="ims-tx-primary pt-8 ">Oops! This page could not be found.</h1>
            <Link  href="/" className="ims-tx-link tx-bold-9 tx-lgx bord-r-8 mt-3  box-shadow-1">
                <div className="py-3 px-6 opaci-hov-25"> Go Home </div>
            </Link>
        </div>
    </div>
    )
}