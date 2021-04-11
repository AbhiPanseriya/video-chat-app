import React, { createContext, useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io("https://video-chat-abhi.herokuapp.com");

const randomNames = [
	"Nugget",
	"Teacup",
	"Oldie",
	"Shortie",
	"Kiddo",
	"Smarty",
	"Boomer",
	"Scout",
	"Ace",
	"Goon",
	"Punk",
	"Rambo",
	"Gump",
	"Bond",
	"Giggles",
	"Speedy",
	"Squirt",
	"Smiley",
	"Rapunzel",
	"Teeny",
];

const ContextProvider = ({ children }) => {
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [stream, setStream] = useState();

	const userName =
		localStorage.getItem("userName") ||
		randomNames[Math.floor(Math.random() * (randomNames.length + 1))];
	localStorage.setItem("userName", userName);
  const changeName = (value) => {
    const userName = value || randomNames[Math.floor(Math.random() * (randomNames.length + 1))];

		setName(userName);
		localStorage.setItem("userName", userName);
	};

	const [name, setName] = useState(userName);

	const [call, setCall] = useState({});
	const [me, setMe] = useState("");

	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				setStream(currentStream);

				myVideo.current.srcObject = currentStream;
			});

		socket.on("me", (id) => setMe(id));

		socket.on("callUser", ({ from, name: callerName, signal }) => {
			setCall({ isReceivingCall: true, from, name: callerName, signal });
		});
	}, []);

	const answerCall = () => {
		setCallAccepted(true);

		const peer = new Peer({ initiator: false, trickle: false, stream });

		peer.on("signal", (data) => {
			socket.emit("answerCall", { signal: data, to: call.from });
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		peer.signal(call.signal);

		connectionRef.current = peer;
	};

	const callUser = (id) => {
		const peer = new Peer({ initiator: true, trickle: false, stream });

		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
				from: me,
				name,
			});
		});

		peer.on("stream", (currentStream) => {
			userVideo.current.srcObject = currentStream;
		});

		socket.on("callAccepted", (signal) => {
			setCallAccepted(true);

			peer.signal(signal);
		});

		connectionRef.current = peer;
	};

	const leaveCall = () => {
		setCallEnded(true);

		connectionRef.current.destroy();

		window.location.reload();
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				changeName,
				callEnded,
				me,
				callUser,
				leaveCall,
				answerCall,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
