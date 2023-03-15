"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { BsBoxArrowInRight, BsDoorClosed, BsBoxArrowInDown, BsBoxArrowRight } from "react-icons/bs";

export default function Component({ children }) {
    const { data: session } = useSession();
    if (session) {
        return (
            <div className="flex Q_xs_md_flex-col">
                <div className="flex-1">
                    {children}
                </div>
                <button className="pa-1 pt-2 tx-lgx tx-white  opaci-chov--50" onClick={() => signOut()}>
                    <BsBoxArrowRight />
                </button>
            </div>
        );
    }
    return (
    <button className="w-100 tx-mdl nowrap  bg-w-10 pa-2 tx-white bord-r-8 opaci-chov--50"
        onClick={() => signIn()}
    >
        <div className="Q_lg_x">Sign in</div>
        <div className="Q_xs_lg"><BsBoxArrowInRight /></div>
    </button>
    );
}
