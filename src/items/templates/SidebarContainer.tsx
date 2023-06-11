export default function Component({ sidebar, children }) {
    return (
    <div className="flex">
        <div className="flex-1">{children}</div>
        <div className='flex-col  tx-white pos-abs right-0'>{sidebar}</div>
    </div>
    )
}
