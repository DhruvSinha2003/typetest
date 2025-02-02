import { Check, Clock, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  // const [targetText, setTargetText] = useState(
  //   "Type this text to test your typing speed and accuracy."
  // );

  const targetText = "Type this text to test your typing speed and accuracy.";

  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (input.length === 1) {
      setStartTime(Date.now());
    }
  }, [input]);

  useEffect(() => {
    if (startTime && input.length > 0) {
      const timeElapsed = (Date.now() - startTime) / 1000 / 60; // in minutes
      const wordsTyped = input.length / 5; // assume average word is 5 characters
      const currentWpm = Math.round(wordsTyped / timeElapsed);
      setWpm(currentWpm);

      let correct = 0;
      for (let i = 0; i < input.length; i++) {
        if (input[i] === targetText[i]) correct++;
      }
      setAccuracy(Math.round((correct / input.length) * 100));

      if (input.length === targetText.length) {
        setIsComplete(true);
      }
    }
  }, [input, startTime, targetText]);

  const handleChange = (e) => {
    if (!isComplete) {
      setInput(e.target.value);
    }
  };

  const resetTest = () => {
    setInput("");
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setIsComplete(false);
  };

  const getCharClass = (char, index) => {
    if (!input[index]) return "text-gray-400";
    return char === input[index] ? "text-green-500" : "text-red-500";
  };

  return (
    <main className="bg-gray-900 min-h-screen flex items-center justify-center p-4">
      <div className="container max-w-2xl mx-auto">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8">
          <h1 className="text-4xl font-bold text-white mb-6">Typing Test</h1>

          <div className="flex justify-center space-x-8 mb-8">
            <div className="text-center">
              <div className="flex items-center text-gray-300 mb-2">
                <Clock className="w-4 h-4 mr-2" />
                <span>WPM</span>
              </div>
              <div className="text-2xl font-bold text-white">{wpm}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center text-gray-300 mb-2">
                <Check className="w-4 h-4 mr-2" />
                <span>Accuracy</span>
              </div>
              <div className="text-2xl font-bold text-white">{accuracy}%</div>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-6 mb-6">
            <div className="text-xl leading-relaxed">
              {targetText.split("").map((char, index) => (
                <span key={index} className={getCharClass(char, index)}>
                  {char}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              value={input}
              onChange={handleChange}
              className="w-full p-4 bg-gray-700 text-white rounded-lg border-2 border-gray-600 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Start typing..."
              disabled={isComplete}
            />

            <button
              onClick={resetTest}
              className="flex items-center justify-center w-full p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset Test
            </button>
          </div>

          {isComplete && (
            <div className="mt-6 p-4 bg-green-600 text-white rounded-lg text-center">
              Test complete! Click Reset to try again.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
