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
		<div className="flex w-full justify-center bg-black">
			{stream && (
				<div className="flex flex-col items-center relative">
					<video
						className="shadow-lg"
						style={{
							transform: "rotateY(180deg)",
							WebkitTransform: "rotateY(180deg)",
						}}
						playsInline
						muted
						ref={myVideo}
						autoPlay
					/>
					<p className="text-lg bg-gray-800 px-2 py-1 text-center capitalize absolute bottom-0 left-0 text-white rounded-tr-md">
						{name || "Name"}
					</p>
				</div>
			)}
			{callAccepted && !callEnded && (
				<div className="flex flex-col items-center relative">
					<video
						className="shadow-lg"
						style={{
							transform: "rotateY(180deg)",
							WebkitTransform: "rotateY(180deg)",
						}}
						playsInline
						ref={userVideo}
						autoPlay
					/>
					<p className="text-lg bg-gray-800 px-2 py-1 text-center capitalize absolute bottom-0 left-0 text-white rounded-tr-md">
						{call.name || "Name"}
					</p>
				</div>
			)}
		</div>
	);

	// return (
	//   <Grid container className={classes.gridContainer}>
	//     {stream && (
	//       <Paper className={classes.paper}>
	//         <Grid item xs={12} md={6}>
	//           <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
	//           <video playsInline muted ref={myVideo} autoPlay className={classes.video} />
	//         </Grid>
	//       </Paper>
	//     )}
	//     {callAccepted && !callEnded && (
	//       <Paper className={classes.paper}>
	//         <Grid item xs={12} md={6}>
	//           <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
	//           <video playsInline ref={userVideo} autoPlay className={classes.video} />
	//         </Grid>
	//       </Paper>
	//     )}
	//   </Grid>
	// );
};

export default VideoPlayer;
