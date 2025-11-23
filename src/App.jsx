import { useState, useEffect, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) characters += "0123456789";
    if (charAllowed) characters += "!@#$%^&*()_+[]{}<>?/";

    for (let i = 0; i < length; i++) {
      pass += characters[Math.floor(Math.random() * characters.length)];
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-10 bg-gray-900 text-white">
      <h1 className="text-center text-2xl font-bold mb-4">Password Generator</h1>

      {/* Password Display */}
      <div className="flex rounded-lg overflow-hidden mb-4 bg-white text-black">
        <input
          type="text"
          value={password}
          ref={passwordRef}
          readOnly
          className="outline-none w-full py-2 px-3 text-lg"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 font-medium"
        >
          Copy
        </button>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(e.target.value)}
            className="cursor-pointer"
          />
          <label className="text-lg font-medium">Length: {length}</label>
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          Include Numbers
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          Include Special Characters
        </label>
      </div>
    </div>
  );
}

export default App;
