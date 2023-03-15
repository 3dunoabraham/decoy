export const lerp = (start, end, amt) =>{
	return (1-amt)*start+amt*end
}
export const getRandomInt = (max=6) =>{
	return Math.floor(Math.random() * max); 
}
export const getFixedLengthRandomInt = (len) =>{
	return Math.random().toString().slice(2,len+2);
}

export const _parseDecimals = (x:number) => {
    x = parseFloat(`${x}`)
    if (x == 0) return 0
  
    const thresholds = [    [0.000001, 8],
      [0.00001, 7],
      [0.001, 6],
      [0.01, 5],
      [0.1, 4],
      [1, 3],
      [50, 2],
      [100, 1]
    ]
  
    for (const [threshold, decimals] of thresholds) {
      if (x < threshold) {
        return Number(x.toFixed(decimals));
      }
    }
  
    return Number.isInteger(x) ? x : parseInt(`${x}`)
  };