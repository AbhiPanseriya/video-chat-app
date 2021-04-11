import React from "react";

import VideoPlayer from "./components/VideoPlayer";
import Sidebar from "./components/Sidebar";
import Notifications from "./components/Notifications";

const App = () => {

	return (
		<div className="w-screen mb-5">
			<div className="flex justify-center w-full p-5 sticky-top">
				<h1 className="text-2xl">Video Chat</h1>
			</div>
			<div className="flex flex-col items-center justify-center">
				<VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
			</div>
		</div>
	);
};

export default App;
