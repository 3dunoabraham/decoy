import Link from 'next/link';
import { BsBox, BsCurrencyDollar } from 'react-icons/bs';


export default function Component({ children, companyName, unitsArray, subtitle="", color, txColor, title="", totalValue=0, url,action }) {
  return (
    <div className="flex-center flex-justify-start  tx-white box-shadow-9 bord-r-5">
      <div className=" pt-4 w-min-400px bord-r-8 px-3">
        <div className="tx-mdl tx-bold-5 mb-3 px-6">{companyName}</div>
        <div className="flex-center flex-justify-start px-6">
          <div className=" pa-2 bord-r-10 px-3 pt-3 opaci-75" style={{color: txColor, background: color}}>
            <div className=" tx-lg" style={{color: txColor, }}>
              <BsBox />
            </div>
          </div>
          <div className="pl-4 py-1">
            <div className="ims-tx-faded py-1">{subtitle}</div>
            <div className="tx-lx tx-bold-6">
              {unitsArray.length || "-"}
            </div>
          </div>
        </div>
        {children}
        {!!totalValue && 
          <div className="flex-center flex-justify-start px-6">
            <div className="ims-bg-primary pa-2 bord-r-10 px-3 pt-3 opaci-75">
              <div className="tx-white tx-lg scale-150">
                <BsCurrencyDollar />
              </div>
            </div>
            <div className="pl-4 py-2">
              <div className="ims-tx-faded py-1">Inventory Value</div>
              <div className="tx-lx tx-bold-6">${totalValue}</div>
            </div>
          </div>
        }
        <hr className="mt-3" />
        <Link href={url} className="px-6 opaci-chov--50 block">
          <div className="ims-tx-primary tx-bold-5 py-4 tx-end">{action}</div>
        </Link>
      </div>
    </div>
  );
}