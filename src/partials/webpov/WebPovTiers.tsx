import Link from "next/link"
import Image from "next/image"

export function WebPovTiers ({}) {
  return (<>
  
  <h1 className='mt-8 tx-altfont-6'>Subscriptions & Donations</h1>
      <hr className='w-25 mb-8' />
      <div className='  flex-row gap-2'>
        <div className=' '>
          <Link target="_blank"
            className='pa-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-w-10  px-5 bord-r-50'
            style={{ boxShadow: "0 4px 3px #00000022" }}
            href='https://www.patreon.com/webpov/membership'
          >
            {/* <Image src="/town2.png" alt="bank" width={136} height={114} className='mt-8 Q_sm_x' /> */}
            <Image src="/pat.png" alt="bank" width={48} height={48} className='mt-4' />
            <h2 className='tx-lgx tx-shadow-5 translate-y-25' style={{ color: "orangered" }}><i className='tx-md tx-altfont-4 tx-bold-2'>Patreon</i></h2>
          </Link>
        </div>
        <div >
          <Link target="_blank"
            className='pa-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-w-10  px-4 bord-r-50'
            style={{ boxShadow: "0 4px 3px #00000022" }}
            href='https://bytecity.gumroad.com/l/webpovbasic'
          >
            {/* <Image src="/main2.png" alt="bank" width={114} height={114} className='mt-8 Q_sm_x' /> */}
            <Image src="/gumroad.png" alt="bank" width={48} height={48} className='mt-4' />
            <h2 className='tx-lgx tx-shadow-5 translate-y-25' style={{ color: "violet" }}><i className='tx-md tx-altfont-4  tx-bold-2'>Gumroad</i></h2>
            {/* <h2 className='tx-lgx tx-shadow-5 translate-y-25' style={{ color: "orangered" }}><i className='tx-md tx-altfont-4 tx-green tx-bold-2'>Play:</i> City</h2> */}
          </Link>
        </div>
      </div>
      </>)
}

export default WebPovTiers