"use client";


function LandingSession({uid, sessiondata, calls}:any) {
    return (
        <div className="flex-row Q_xs_flex-col my-4 gap-2 mt-8">
            {!uid && !!sessiondata && <div className='flex-col gap-2'>
                <div className='Q_xs pt-150'></div>
                <button style={{background:!sessiondata ? "#F7C127" : "orangered"}}
                    onClick={()=>{ calls.createPlayer() }}
                    className={`px-3 py-2 clickble nowrap   tx-lg opaci-chov--75 
                        ${!sessiondata ? "" : "tx-white"}
                    `}                                        
                >
                    + Create Simulated Player
                </button>
                <div className='Q_xs pt-150'></div>
                <button  style={{background:"orange"}} onClick={()=>{ calls.trigger_connectPlayer() }}
                    className={` ${!sessiondata ? "" : "tx-white"}
                        px-3 py-2 clickble nowrap   tx-lg opaci-chov--75 
                    `}
                >
                    ↑ Connect
                </button>
            </div>}
            
            {!sessiondata &&
                <div className='flex-col'>
                    <div className='Q_xs py-100'></div>
                    <div className='Q_sm_md pt-100 pb-8'></div>
                    <div className='flex-col tx-center tx-sm'>
                        Connect w/Google to create your new Account!
                    </div>
                    <button   className="px-3 py-2 clickble nowrap tx-lg tx-white opaci-chov--75"
                        style={{background:"orangered"}} onClick={()=>{ calls.signInGoogle() }}
                    >
                        Connect w/Google
                    </button>
                </div>
            }
            
            <div className='flex-1'></div>
        </div>
    )
}

export default LandingSession