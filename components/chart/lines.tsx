export const ChartTradeHistory = ({ tradeHistory, minPrice, maxPrice, minTime, maxTime }) => {
    const priceRange = maxPrice - minPrice;
    const priceToY = (price) => (((maxPrice - price) / priceRange) * 100) > 99 ? 99 :
        ((maxPrice - price) / priceRange) * 100;
  
    const timeToX = (time) => {
        if (time < minTime) return 0
      const timeRange = maxTime - minTime;
      const timeElapsed = time - minTime;
      return ( timeElapsed / timeRange * 100 )
    };
  
    return (
      <div
       className=""
        style={{
          position: 'relative',
          height: '100%',
          width: '97%',
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        {tradeHistory.map((trade) => (
          <div
            key={trade.id}
            style={{
              position: 'absolute',
              top: `${priceToY(trade.price)}%`,
              left: `${timeToX(trade.time)}%`,
              width: '4px',
              height: '4px',
              backgroundColor: timeToX(trade.time) == 0 ?
                (trade.isBuyer ? "#ffff0055" : "#0000FF55")
            : trade.isBuyer ? "#ffff00" : "#0000FF",
            }}
          />
        ))}
      </div>
    );
  };
export const ChartMiddleLine = ({klinesArray}:{klinesArray:any[]})=>{
    return (
    <div>
        {klinesArray.map && klinesArray.map((aKline:any,index:any) => {
            return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "2px",
                    height: "2px",
                    left: `${-2+(index/500*100)}%`,
                    background: `rgba(${index/2},99,99,0.3)`,
                    top:`
                    ${50}%
                    `,
                }}
                >
            </div>
            )
        })}
    </div>
    )
}
export const ChartLowerLastLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        let aKline = klinesArray[499]
        if (aKline[3] > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className=" block pos-abs "
                style={{
                    width: "10px",
                    height: aKline[3] < klinesStats.min ? "4px" : "2px",
                    left: `${-2+(Math.floor(index/45)*9) }%`,
                    background: `#33000077`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[3] < klinesStats.min ? 0 : ((
                            (parseFloat(aKline[3])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                        `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}

export const ChartLowerLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        if (aKline[3] > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className=" block pos-abs "
                style={{
                    width: "2px",
                    height: aKline[3] < klinesStats.min ? "4px" : "2px",
                    left: `${-2+(index/500*100) }%`,
                    background: aKline[3] < klinesStats.min ? `#ffaa00` : `#B54A4A66`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[3] < klinesStats.min ? 0 : ((
                            (parseFloat(aKline[3])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                        `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartHigherLastLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        let aKline = klinesArray[499]
        if (aKline[2] < klinesStats.min) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "10px",
                    height: aKline[2] > klinesStats.max ? "3px" : "2px",
                    left: `${-2+(Math.floor(index/45)*9) }%`,
                    background:`#00880077`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[2] > klinesStats.max ? 99 : ((
                            (parseFloat(aKline[2])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartLiveLastLine = ({
    klinesArray,klinesStats,
    tokenConfig, livePrice,
}:{tokenConfig:any,klinesArray:any[],klinesStats:any,livePrice:any})=>{
    return (
    <div>
        {klinesArray.map((_aKline:any,index:any) => {
        let aKline = klinesArray[499]
        if (livePrice < klinesStats.min || livePrice > klinesStats.max) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "5px",
                    // width: "20px",
                    height: livePrice > klinesStats.max ? "3px" : "2px",
                    // left: `${-2+(6+(Math.floor(index/100)*22)) }%`,
                    left: `${38+(3+(Math.floor(index/26)*3)) }%`,
                    background:`#ffffff`,
                    bottom:`
                    ${parseInt(`
                        ${livePrice > klinesStats.max ? 99 : ((
                            (parseFloat(livePrice)-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}
export const ChartHigherLine = ({
    klinesArray,klinesStats,
    tokenConfig
}:{tokenConfig:any,klinesArray:any[],klinesStats:any})=>{
    return (
    <div>
        {klinesArray.map((aKline:any,index:any) => {
        if (aKline[2] < klinesStats.min) return <div key={index}></div>
        return (
            <div key={index}
                className="  block pos-abs"
                style={{
                    width: "2px",
                    height: aKline[2] > klinesStats.max ? "3px" : "2px",
                    left: `${-2+(index/500*100)}%`,
                    background:aKline[2] > klinesStats.max ? `#7DB54A66` : `#7DB54A66`,
                    bottom:`
                    ${parseInt(`
                        ${aKline[2] > klinesStats.max ? 99 : ((
                            (parseFloat(aKline[2])-(klinesStats.min))
                            /
                            (klinesStats.max-(klinesStats.min))
                        )*100)}
                        `)}%
                    `,
                }}
            >
            </div>
            )
        })}
    </div>
    )
}

export const ChartTopBottomLine = ({klinesArray}:{klinesArray:any[]})=>{
    return (
    <div>
    {klinesArray.map((aKline:any,index:any) => {
        return (
        <div key={index}
            className="  block pos-abs"
            style={{
                    width: "2px",
                    height: "2px",
                    left: `${-2+(index/500*100)}%`,
                    background: `rgba(${index/2},99,99,0.3)`,
                    top:`
                    ${Math.sin(index) > 0 ? 25 : 75}%
                    `,
                }}
            >
        </div>
        )
    })}
    </div>
    )
}