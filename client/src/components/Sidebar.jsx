import React, { useState, useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Phone, PhoneDisabled } from "@material-ui/icons";

import { SocketContext } from "../Context";

const Sidebar = ({ children }) => {
	const {
		me,
		callAccepted,
		name,
		setName,
		callEnded,
		leaveCall,
		callUser,
	} = useContext(SocketContext);
	const [idToCall, setIdToCall] = useState("");

	return (
		<div className="flex flex-col pt-10 w-3/5">
			<form
				className="flex justify-center space-x-8"
				noValidate
				autoComplete="off"
			>
				<div className="flex flex-col space-y-4 w-1/2">
					<input
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className="py-3 w-full bg-gray-50 rounded-lg pl-2 focus:outline-none hover:bg-gray-100 hover:shadow focus:shadow"
					/>
					<CopyToClipboard text={me}>
						<button
							type="button"
							className="bg-gray-100 hover:bg-gray-200 focus:outline-none hover:shadow rounded-lg py-3 w-full"
						>
							<span className="leading-7">Copy Your ID</span>
						</button>
					</CopyToClipboard>
				</div>
				<div className="flex flex-col space-y-4 w-1/2">
					<input
						type="text"
						placeholder="Enter ID to call"
						value={idToCall}
						onChange={(e) => setIdToCall(e.target.value)}
						className="py-3 w-full bg-gray-50 rounded-lg pl-2 focus:outline-none hover:shadow focus:shadow"
					/>
					{callAccepted && !callEnded ? (
						<button
							type="button"
							onClick={leaveCall}
							className="bg-red-500 hover:bg-red-600 focus:outline-none rounded-lg py-3 w-full text-white text-xl flex items-center justify-center"
						>
							<PhoneDisabled />
							<span className="pl-2">Hang Up</span>
						</button>
					) : (
						<button
							type="button"
							onClick={() => callUser(idToCall)}
							className="bg-green-500 hover:bg-green-600 focus:outline-none rounded-lg py-3 w-full text-white text-xl flex items-center justify-center"
						>
							<Phone />
							<span className="pl-2">Call</span>
						</button>
					)}
				</div>
			</form>
			{children}
		</div>
	);

	// return (
	//   <Container className={classes.container}>
	//     <Paper elevation={10} className={classes.paper}>
	//       <form className={classes.root} noValidate autoComplete="off">
	//         <Grid container className={classes.gridContainer}>
	//           <Grid item xs={12} md={6} className={classes.padding}>
	//             <Typography gutterBottom variant="h6">Account Info</Typography>
	//             <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
	//             <CopyToClipboard text={me} className={classes.margin}>
	//               <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
	//                 Copy Your ID
	//               </Button>
	//             </CopyToClipboard>
	//           </Grid>
	//           <Grid item xs={12} md={6} className={classes.padding}>
	//             <Typography gutterBottom variant="h6">Make a call</Typography>
	//             <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
	//             {callAccepted && !callEnded ? (
	//               <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall} className={classes.margin}>
	//                 Hang Up
	//               </Button>
	//             ) : (
	//               <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)} className={classes.margin}>
	//                 Call
	//               </Button>
	//             )}
	//           </Grid>
	//         </Grid>
	//       </form>
	//       {children}
	//     </Paper>
	//   </Container>
	// );
};

export default Sidebar;
