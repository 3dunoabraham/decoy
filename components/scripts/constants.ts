export const DEFAULT_TIMEFRAME_ARRAY = ["3m","15m","4h","1d","1w"]  
export const DEFAULT_TOKENS_ARRAY = ["btc","eth","link","ftm"/*,"matic"*/,"aave"/*,"rndr","rune",*/]
export const DEFAULT_TOKENS_ARRAY_UPPER = DEFAULT_TOKENS_ARRAY.map((x,i)=>(x.toUpperCase()))
    
export const DEFAULT_PLAN_COLUMNS_ARRAY = {
    "token": [
        "","","","","","","",
    ],
    "timeframe": [
        "","","","","","","",
    ],
    "state": [
        "","","","","","","",
    ],
    "min": [
        "","","","","","","",
    ],
    "max": [
        "","","","","","","",
    ],
    "minMedian": [
        "","","","","","","",
    ],
    "maxMedian": [
        "","","","","","","",
    ],
    "minMaxAvg": [
        "","","","","","","",
    ],
    // "domain": [
    //     "asd","qwe","zxc","","","","",
    // ],
    // "hosting": [
    //     "","","","","","","",
    // ],
    // "ssl": [
    //     "","","","","","","",
    // ],
    // "ownership": [
    //     "","","","","","","",
    // ],
    // "languages": [
    //     "","","","","","","",
    // ],
    // "seo": [
    //     "","","","","","","",
    // ],
    // "pages": [
    //     "","","","","","","",
    // ],
    // "searchbar": [
    //     "","","","","","","",
    // ],
    // "socialmedia": [
    //     "","","","","","","",
    // ],
    // "products": [
    //     "","","","","","","",
    // ],
    // "posts": [
    //     "","","","","","","",
    // ],
    // "website": [
    //     "","","","","","","",
    // ],
    // "app": [
    //     "","","","","","","",
    // ],
}
export const DEFAULT_PLAN_KEYS_ARRAY = Object.keys(DEFAULT_PLAN_COLUMNS_ARRAY)
