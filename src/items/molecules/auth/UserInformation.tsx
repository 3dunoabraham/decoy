export default function Page({ data }) {
    return (
    <div className="flex gap-2 bord-r-100p">
        {/* eslint-disable @next/next/no-img-element */}
        <div><img className="bord-r-10" width="40" src={data.image} alt="" /></div>
            {/* <div className="">{data.name}</div> */}
            {/* <div className="opaci-50 tx-sm">{data.referral || "-"}</div> */}
        {/* <div className="flex-col flex-align-start Q_xl_x">
        </div> */}
    </div>
    )
}
