import Link from 'next/link';
import { BsBarChart, BsBox, BsCurrencyDollar, BsFillGearFill, BsGearWide } from 'react-icons/bs';
import { TfiDropboxAlt } from 'react-icons/tfi';
import { GrConfigure } from 'react-icons/gr';


export default function Component({ companyName, unitsArray, totalValue }) {
  return (
    <div className="flex-center flex-justify-start px-3">
      <div className="box-shadow-2 pt-4 w-min-400px ord-r-8">


        <div className="tx-mdl tx-bold-5 mb-3 px-6">{companyName}</div>
        <div className="flex-center flex-justify-start px-6">
          <div className="ims-bg-primary pa-2 ord-r-10 px-3 pt-3 opaci-75">
            <div className="tx-white tx-lg">
              <TfiDropboxAlt />
            </div>
          </div>
          <div className="pl-4 py-2">
            <div className="ims-tx-faded py-1">Ongoing Tokens</div>
            <div className="tx-lx tx-bold-6">
              {unitsArray.length || "-"}
            </div>
          </div>
        </div>
        <div className="flex-center flex-justify-start px-6">
          <div className="ims-bg-primary pa-2 ord-r-10 px-3 pt-3 opaci-75">
            <div className="tx-white tx-lg scale-150">
              <BsCurrencyDollar />
            </div>
          </div>
          <div className="pl-4 py-2">
            <div className="ims-tx-faded py-1">Bitcoin Price</div>
            <div className="tx-lx tx-bold-6">${totalValue}</div>
          </div>
        </div>

        <hr className="mt-3" />
        <div className='flex'>
          <Link href="/chart/4h?token=btc" className="px-6 opaci-chov--50 block flex-center gap-1">
            <GrConfigure />
            <div className="ims-tx-primary tx-bold-5 py-4 tx-end">Token Settings</div>
          </Link>
          <div className='flex-1'></div>
          <Link href="/chart/4h?token=btc" className="px-6 opaci-chov--50 block flex-center gap-1">
            <BsBarChart />
            <div className="ims-tx-primary tx-bold-5 py-4 tx-end">Chart</div>
          </Link>
        </div>


      </div>
    </div>
  );
}