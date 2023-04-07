import Link from "next/link";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { ImBook } from "react-icons/im";


export default function Component ({}) {
    return (
        <div className='flex right-0 gap-2  flex-justify-end  z-500'>
            <Link href="https://github.com/3dunoabraham" target="_blank" 
                className="bg-w-10 pa-3 opaci-chov--50">
                <div className="flex bg-white bord-r-100p tx-lg pa-1">
                    <BsGithub />
                </div>
            </Link>
            <Link href="https://twitter.com/alt_dunno" target="_blank" 
                className="bg-w-10 pa-3 opaci-chov--50">
                <div className="flex bg-white bord-r-100p tx-lg pa-1">
                    <BsTwitter />
                </div>
            </Link>
            <Link href="https://dev.to/3dunoabraham" target="_blank" 
                className="bg-w-10 pa-3 opaci-chov--50">
                <div className="flex bg-white bord-r-100p tx-lg pa-1">
                    <ImBook />
                </div>
            </Link>
        </div>
    )
}