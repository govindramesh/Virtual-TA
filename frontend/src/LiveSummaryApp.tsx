import React, { useEffect, useState } from "react";

const LiveSummaryApp = () => {
  const [summary, setSummary] = useState("");
  function getSussary() {
    fetch("/fuck.txt")
      .then((r) => r.text())
      .then((text) => {
        console.log(text);
        setSummary(text);
      });
  }

  useEffect(() => {
    setInterval(getSussary, 5000);
  }, []);
  return (
    <div className="ml-2 mt-1">
      <h1 className="font-bold font-lg">Live Summary</h1>
      <p>{summary}</p>
    </div>
  );
};

export default LiveSummaryApp;
