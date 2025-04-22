function Contests(){
    return(
        <>
            <div className="flex justify-center align-middle m-5"><button type="button" className="pt-1.5 pr-6 pb-1.5 pl-6 rounded-xl text-lg bg-blue-600 text-white cursor-pointer"><a href="#" >Create Contest</a></button></div>
            <div className="flex justify-center align-middle mt-5 border-t-2 border-l-2 border-r-2 text-xl md:text-2xl font-bold">Current or Upcoming contests</div>
            <table className="w-full">
                <tr>
                    <th className="contestHeading">Name</th>
                    <th className="contestHeading">Creator</th>
                    <th className="contestHeading">Start</th>
                    <th className="contestHeading">Register</th>
                </tr>
                <tr>
                    <td className="contestDetails">Contest-69</td>
                    <td className="contestDetails"><a href="#" className="text-blue-800 font-bold">sobhit_raghav</a></td>
                    <td className="contestDetails">
                    <div>July/27/2025</div>
                    <div>20:05 (IST)</div>
                    </td>
                    <td className="contestDetails"><button type="button" className="pt-[2px] pr-[10px] pb-[2px] pl-[10px] text-[0.9rem] bg-red-600 text-white cursor-pointer underline font-bold"><a href="#" >Register</a></button></td>
                </tr>
            </table>
            <div className="flex justify-center align-middle mt-5 border-t-2 border-l-2 border-r-2 text-xl md:text-2xl font-bold">Past contests</div>
            <table className="w-full">
                <tr>
                    <th className="contestHeading">Name</th>
                    <th className="contestHeading">Creator</th>
                    <th className="contestHeading">Start</th>
                    <th className="contestHeading">Standings</th>
                </tr>
                <tr>
                    <td className="contestDetails">
                        <div>Contest-14</div>
                        <a href="#" className="contestDetails underline text-blue-800">Enter</a>
                    </td>
                    <td className="contestDetails"><a href="#" className="text-blue-800 font-bold">destroyer69</a></td>
                    <td className="contestDetails">
                        <div>Oct/02/2024</div>
                        <div>20:05 (IST)</div>
                    </td>
                    <td className="contestDetails cursor-pointer underline text-blue-800"><a href="#" >View Standings</a></td>
                </tr>
            </table>
        </>
    )
}
export default Contests;