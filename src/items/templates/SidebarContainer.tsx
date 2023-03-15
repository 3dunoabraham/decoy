export default function Component({ sidebar, children }) {
    return (
    <div className="flex">
        <div className='flex-col ims-bg-primary tx-white'>{sidebar}</div>
        <div className="flex-1">{children}</div>
    </div>
    )
}
