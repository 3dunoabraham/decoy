import Link from "next/link"

export function LatestPosts ({}) {
  return (
    <div className="flex gap-4">
      <div className="bg-w-10 pl-1"></div>
      <div className="flex-1">
        <h3 className="tx-lx">Changelogs</h3>
        <div className="tx-sm ">Last updated: Saturday, July 8, 2023</div>
        <hr />
        <ul>
          <li className="py-4 opaci-chov--50">
            <div className="bg-w-50 pa-1 pos-abs left-0 pl-4 pt-4 bord-r-100p ml-7"></div>
            New WebPOV Website
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.  </p>
          </li>
          <li className="py-4 opaci-chov--50">
            <div className="bg-w-50 pa-1 pos-abs left-0 pl-4 pt-4 bord-r-100p ml-7"></div>
            Byte Town Released!
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing  elit. Provident adipisicing illum </p>
          </li>
          <li className="py-4 opaci-chov--50">
            <div className="bg-w-50 pa-1 pos-abs left-0 pl-4 pt-4 bord-r-100p ml-7"></div>
            TOS & Privacy Updates
            <p>Lorem ipsum dolor, sit amet consectetur  illum </p>
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