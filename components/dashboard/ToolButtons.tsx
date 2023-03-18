export default function Component({cryptoToken, baseToken, timeframe, exportConfig, clickImportConfig }) {
    function getKlineArray(timeframe: any, cryptoToken: any) {
        throw new Error("Function not implemented.")
    }

    return (
        <div>
            <div className="flex-center ma- flex-center ">
                <a  className="px-2 tx-sm py-1 bg-w-50 ma-1  opaci-chov--50 bord-r-8 tx-gray" target={"_blank"}
                    href={`https://www.tradingview.com/chart/?symbol=BINANCE%3A
                        ${cryptoToken.toUpperCase()}${baseToken.toUpperCase()}
                    `}
                >
                    <div className="nowrap">Tradigview</div>
                    <div className="nowrap">{cryptoToken.toUpperCase()}{baseToken.toUpperCase()} @{timeframe}</div>
                </a>
                <div onClick={()=>{getKlineArray(timeframe,cryptoToken)}}
                    className="px-2 py-1 bg-b-20 ma-1 opaci-50 opaci-chov-50 bord-r-8 "
                >
                    Refresh
                </div>
                <div onClick={()=>{exportConfig()}}
                    className="px-2 py-1 bg-b-20 ma-1 opaci-50 opaci-chov-50 bord-r-8 "
                >
                    export
                </div>
                <div onClick={()=>{clickImportConfig()}}
                    className="px-2 py-1 bg-b-20 ma-1 opaci-50 opaci-chov-50 bord-r-8 "
                >
                    import
                </div>
            </div>
        </div>
    )
}