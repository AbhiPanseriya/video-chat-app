import React, { useContext } from "react";
import swal from 'sweetalert'
import { SocketContext } from "../Context";

const Notifications = () => {
	const { answerCall, call, callAccepted } = useContext(SocketContext);

	if(call.isReceivingCall && !callAccepted)
		swal({
			title: `${call.name} is calling`,
			buttons: ["Decline", "Accept"]
		})
		.then((value) => {
			if(value) answerCall();
		});


	return (
		<>
		</>
	);

};

export default Notifications;
