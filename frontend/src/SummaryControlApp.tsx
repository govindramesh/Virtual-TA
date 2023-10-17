import { useLayoutEffect } from "react";

function App() {
  let help = false;
  const ipcRenderer = (window as any).ipcRenderer;
  useLayoutEffect(() => {
    // document.body.style.backgroundColor = "red";
  });
  const sendData = () => {
    ipcRenderer.send("sendSummary", help);
  };

  return (
    <div className="p-6 text-white h-full" onClick={sendData}>
      Summary
    </div>
  );
}

export default App;
