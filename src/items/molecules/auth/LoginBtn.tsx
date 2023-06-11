"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { BsDoorClosed, BsBoxArrowInDown, BsBoxArrowRight } from "react-icons/bs";
import { AiOutlineLogin } from "react-icons/ai";

export default function Component({ children }) {
    const { data: session }:any = useSession();

    const connectWGoogle = async () => {
        await signIn("google")
        // console.log("session.token_id")
        // console.log(session.id_)
    }

    if (session) {
        return (
            <div className="flex Q_xs_md_flex-col gap-1 ">
                <div className="flex-1">
                    {children}
                </div>
                <button className="pa-1  tx-lgx tx-white  opaci-chov--50" onClick={() => signOut()}>
                    <BsBoxArrowRight />
                </button>
            </div>
        );
    }
    return (
    <button className="w-100 tx-mdl nowrap  bg-w-10 pa-2 tx-white ord-r-8 opaci-chov--50"
        
        onClick={() => connectWGoogle()  }
    >
        <div className="Q_xl_x">Connect w/Google</div>
        <div className="Q_xs_xl py-2"><AiOutlineLogin /></div>
    </button>
    );
}
