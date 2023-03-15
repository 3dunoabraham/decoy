// ReactFunctionComponent
export const FooterLayout = ({emailTitle, email, copyright})=>{
	return (
    <footer className=" pt-8 pb-4 flex-center Q_xs_lg_flex-col ">
        <div className="pb-4 px-5  flex-center Q_xs_sm_flex-col">
          	<span className="ims-tx-faded">
				{emailTitle}
			</span>
          	<a href={`mailto:${email}`}>
				<span className="tx-deco ims-tx-primary tx-bold-5 tx-mdl pl-1 ">
					{email}
				</span>
			</a>
        </div>
        <div className="pb-4 px-5 opaci-75 tx-md ims-tx-faded">
			{copyright}
        </div>
    </footer>
	)
}