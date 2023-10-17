import React, { useEffect, useState } from "react";

const ChatBotApp = () => {
  const [response, setReponse] = useState("");
  const [question, setQuestion] = useState("");
  const [query, setQuery] = useState("");
  function getAnswer() {}

  return (
    <div className="ml-2 mr-2 mt-1 flex flex-col">
      <h1 className="font-bold font-lg">Live Q & A</h1>
      <textarea
        id="about"
        name="about"
        rows={3}
        className="block w-full rounded-md border-0 py-1.5 px-2 text-xs text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={"Ask question"}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
      />
      <div className="block">
        <button
          className="text-xs p-1.5 bg-blue text-white border rounded-lg mt-2 float-right block"
          onClick={() => {
            setQuery("");
            setQuestion(query);
          }}
        >
          Submit Question
        </button>
      </div>

      {question && (
        <div className="block text-sm font-bold mt-2">Q: {question}</div>
      )}
      {response && <div className="block text-sm mt-2">A: {response}</div>}
    </div>
  );
};

export default ChatBotApp;
