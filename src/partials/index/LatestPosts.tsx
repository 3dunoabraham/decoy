import Link from "next/link"

export function LatestPosts ({}) {
  return (
    <div className="flex gap-4">
      <div className="bg-w-10  mt-150 bord-r-5" style={{width:"8px"}}></div>
      <div className="flex-1">
        <h3 className="tx-lx">Changelogs</h3>
        <div className="tx-sm ">Last updated: Saturday, July 8, 2023</div>
        <hr />
        <ul>
          <li className="py-3 ">
            <div className="pos-abs left-0  ml-1 Q_xs_px-0 pl-5 mt-1">
              <div className=" pl-6 pt-6 bord-r-100p bg-w-90" ></div>
            </div>
            <b className="pt-2 block underline opaci-chov--50"> New WebPOV Website</b>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
          </li>
          <li className="py-3 ">
            <div className="pos-abs left-0  ml-1 Q_xs_px-0 pl-5 mt-1">
              <div className="bg-w-50 pl-6 pt-6 bord-r-100p"></div>
            </div>
            <b className="pt-2 block underline opaci-chov--50"> Byte Town Released!</b>
            <p className="opaci-75">Lorem ipsum dolor, sit amet consectetur adipisicing  elit. Provident adipisicing illum </p>
          </li>
          <li className="py-3 ">
            <div className="pos-abs left-0  ml-1 Q_xs_px-0 pl-5 mt-1">
              <div className="bg-w-20 pl-6 pt-6 bord-r-100p"></div>
            </div>
            <b className="pt-2 block underline opaci-chov--50"> TOS & Privacy Updates</b>
            <p className="opaci-50">Lorem ipsum dolor, sit amet consectetur  illum </p>
          </li>
        </ul>
      </div>
      {/* <div>
        <Link href="https://webpov.vercel.app/news" className="opaci-chov--50 underline">
          View All
        </Link>
      </div> */}
    </div>
  )
}

export default LatestPosts