import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [targetText, setTargetText] = useState("Type this text");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const getCharClass = (char, index) => {
    if (!input[index]) return "";
    return char === input[index] ? "text-green-500" : "text-red-500";
  };

  return (
    <main className="bg-sky-950 min-h-screen flex items-center justify-center">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl text-white">Type Test</h1>

        <div className="mt-8">
          <p className="text-white">Start typing to begin the test</p>
        </div>

        <div className="mt-4">
          <div className="text-2xl text-white">
            {targetText.split("").map((char, index) => (
              <span key={index} className={getCharClass(char, index)}>
                {char}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            className="mt-4 p-2 border border-gray-300 rounded"
          />
        </div>
      </div>
    </main>
  );
};
