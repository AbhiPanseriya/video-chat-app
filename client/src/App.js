import React from "react";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const App = () => {

	return (
		<div className="h-screen w-screen">
			<div className="sticky-top w-full flex justify-center p-5">
				<h1 className="text-2xl">Video Chat</h1>
			</div>
			<div className="flex flex-col justify-center items-center">
				<VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
			</div>
		</div>
	);
};

export default App;
