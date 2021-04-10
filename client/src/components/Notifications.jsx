import React, { useContext } from "react";

import { SocketContext } from "../Context";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	return (
		<>
			{call.isReceivingCall && !callAccepted && (
				<div className="rounded-lg mt-8 bg-gray-50">
					<div className="flex items-center space-x-4">
						<p className="text-lg text-center flex-grow max-w-[50%]">
							{call.name} is calling:
						</p>
						<button
							onClick={answerCall}
							className="flex-grow bg-gray-100 hover:bg-gray-200 focus:outline-none hover:shadow text-xl py-3 rounded-lg"
						>
							Answer
						</button>
					</div>
				</div>
			)}
		</>
	);

	// return (
	//   <>
	//     {call.isReceivingCall && !callAccepted && (
	//       <div style={{ display: 'flex', justifyContent: 'space-around' }}>
	//         <h1>{call.name} is calling:</h1>
	//         <Button variant="contained" color="primary" onClick={answerCall}>
	//           Answer
	//         </Button>
	//       </div>
	//     )}
	//   </>
	// );
};

export default Notifications;
