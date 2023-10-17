import React from "react";
import { useState } from "react";

let help = false;
const ipcRenderer = (window as any).ipcRenderer;
const sendData = () => {
  ipcRenderer.send("startRecord", help);
};

const Home = () => {
  const [start, setStart] = useState(true);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-tl from-white to-purple-200 font-bold">
      <p className="text-4xl">Virtual TA</p>
      <p className="text-xl text-gray-500">Your personal learning companion</p>
      {start ? (
        <div className="pb-12">
          <button
            className="bg-blue mt-4 px-5 py-1.5 font-bold mb-10 border rounded-md text-white font-sm"
            onClick={() => {
              setStart(!start);
              sendData();
            }}
          >
            Start
          </button>
        </div>
      ) : (
        <div className="pb-12">
          <button
            className="bg-red mt-4 px-5 py-1.5 font-bold mb-10 border rounded-md text-white font-sm"
            onClick={() => setStart(!start)}
          >
            End
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
