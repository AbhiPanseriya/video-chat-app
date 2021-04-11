import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Phone, PhoneDisabled } from "@material-ui/icons";

import { SocketContext } from "../Context";

const Sidebar = ({ children }) => {
	const {
		me,
		callAccepted,
		name,
		changeName,
		callEnded,
		leaveCall,
		callUser,
	} = useContext(SocketContext);
	const [idToCall, setIdToCall] = useState("");

	const [callReceiving, setCallReceiving] = useState(true);

	return (
		<>
			<form
				className="flex flex-col items-center justify-center w-full px-4 pt-10 space-y-4 sm:px-0 sm:w-4/5 lg:3/5"
				noValidate
				autoComplete="off"
			>
				<div className="flex flex-col w-4/5 space-y-4 lg:w-1/2">
					<input
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => changeName(e.target.value)}
						onDoubleClick={(e) => e.target.select()}
						className="w-full py-3 pl-2 text-center rounded-lg bg-gray-50 focus:outline-none hover:bg-gray-100 hover:shadow focus:shadow"
					/>
				</div>
				{(!callAccepted || callEnded) && (
					<div className="flex flex-col w-4/5 space-y-4 lg:w-1/2">
						<CopyToClipboard text={me}>
							<button
								type="button"
								className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none hover:shadow"
							>
								<span className="leading-7">
									Copy Your ID and Send to your loved once
								</span>
							</button>
						</CopyToClipboard>
					</div>
				)}
				{callReceiving && (
					<div className="flex flex-col w-4/5 space-y-4 lg:w-1/2">
						<button
							type="button"
							className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none hover:shadow"
							onClick={() => setCallReceiving(false)}
						>
							<span className="leading-7">
								Already got an Id Click here to make a call
							</span>
						</button>
					</div>
				)}
				{!callReceiving && (
					<div className="flex flex-col w-4/5 space-y-4 lg:w-1/2">
						<input
							type="text"
							placeholder="Enter ID to call"
							value={idToCall}
							onChange={(e) => setIdToCall(e.target.value)}
							onClick={(e) => e.target.select()}
							className="w-full py-3 pl-2 rounded-lg bg-gray-50 focus:outline-none hover:shadow focus:shadow"
						/>
					</div>
				)}
				<div className="flex flex-col w-4/5 space-y-4 lg:w-1/2">
					{callAccepted && !callEnded ? (
						<button
							type="button"
							onClick={leaveCall}
							className="flex items-center justify-center w-full py-3 text-xl text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none"
						>
							<PhoneDisabled />
							<span className="pl-2">Hang Up</span>
						</button>
					) : (
						<button
							type="button"
							onClick={() => callUser(idToCall)}
							className="flex items-center justify-center w-full py-3 text-xl text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none"
						>
							<Phone />
							<span className="pl-2">Call</span>
						</button>
					)}
				</div>
			</form>
			{children}
		</>
	);
};

export default Sidebar;
