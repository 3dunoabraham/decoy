import React from 'react'

export const DownloadButton = ({ data, filename }) => {
  const handleClick = () => {
    const jsonData = JSON.stringify(data)
    // const jsonData = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}_${Date.now()}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (<>
    {JSON.stringify(data).length > 2 &&
      <button onClick={handleClick}
        className="noborder bg-b-20 tx-white tx-lg px-3 py-2 bord-r-5 mt-8 opaci-chov--50"
      >
        <div className='opaci-25 tx-lx'><b>Download</b></div>
        <div className=''>Local Account Data</div>
        <div className='tx-italic tx-ls-2 tx-link'>{filename}.json</div>
      </button>
    }
  </>)
}