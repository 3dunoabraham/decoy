import Link from "next/link"
import Image from "next/image"

export function WebPovGames ({}) {
  return (<>
  
  <h1 className='tx-altfont-6'>WebPOV Games</h1>
      <hr className='w-50 mb-8' />
      <div className='  flex-row gap-2'>
        <div className=' '>
          <Link
            className='pa-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-w-10   bord-r-50'
            style={{ boxShadow: "0 4px 3px #00000022" }}
            href='https://bytc.vercel.app/w'
          >
            <Image src="/town2.png" alt="bank" width={136} height={114} className='mt-8 Q_sm_x' />
            <Image src="/town2.png" alt="bank" width={69} height={61} className='mt-8 Q_xs' />
            <h2 className='tx-lgx tx-shadow-5 translate-y-25' style={{ color: "orange" }}><i className='tx-md tx-altfont-4 tx-green tx-bold-2'>Play:</i> Town</h2>
          </Link>
        </div>
        <div >
          <Link
            className='pa-2 opaci-chov--75 block pb-8 flex-col bg-glass-4 bg-w-10  px-4 bord-r-50'
            style={{ boxShadow: "0 4px 3px #00000022" }}
            href='https://bytc.vercel.app'
          >
            <Image src="/main2.png" alt="bank" width={114} height={114} className='mt-8 Q_sm_x' />
            <Image src="/main2.png" alt="bank" width={61} height={61} className='mt-8 Q_xs' />
            <h2 className='tx-lgx tx-shadow-5 translate-y-25' style={{ color: "orangered" }}><i className='tx-md tx-altfont-4 tx-green tx-bold-2'>Play:</i> City</h2>
          </Link>
        </div>
      </div>
      </>)
}

export default WebPovGames