import React, { useContext } from "react";

import { SocketContext } from "../Context";

const VideoPlayer = () => {
	const {
		name,
		callAccepted,
		myVideo,
		userVideo,
		callEnded,
		stream,
		call,
	} = useContext(SocketContext);

	return (
		<div className="flex flex-col items-center justify-center w-full bg-black sm:flex-row">
			{stream && (
				<div className="relative flex flex-col items-center">
					<video
						className="shadow-lg w-50 max-h-72 sm:max-h-full"
						style={{
							transform: "rotateY(180deg)",
							WebkitTransform: "rotateY(180deg)",
						}}
						playsInline
						muted
						ref={myVideo}
						autoPlay
					/>
					<p className="video-text">
						{name || "Name"}
					</p>
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="relative flex flex-col items-center">
					<video
						className="shadow-lg w-50 max-h-72 sm:max-h-full"
						style={{
							transform: "rotateY(180deg)",
							WebkitTransform: "rotateY(180deg)",
						}}
						playsInline
						ref={userVideo}
						autoPlay
					/>
					<p className="video-text">
						{call.name || "Name"}
					</p>
				</div>
			)}
		</div>
	);
};

export default VideoPlayer;
