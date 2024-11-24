import { useEffect, useState } from 'react';
import './style/App.css'
import { GoogleGenerativeAI } from '@google/generative-ai';

// first off put your own API key here!
const API_KEY = 'AIzaSyCJ6DGEnmzuFYf9uZMgHPS8l9d6jzx3GJI'; 


function App() {
  const [response, setResponse] = useState("");
  const [inputval, setInputVal] = useState("");

  const FetchGemniniResponse = async () => {
    setResponse("loading...");
    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash", 
        systemInstruction: "Troll the user" // ;)
      });
      const prompt = inputval; // user prompt
      const result = await model.generateContent(prompt); // awaits till a response is generated

      setResponse(result.response.text);
    } catch (error) {
      console.error('Fetch AI-Generation Error:', error);
      setResponse('Failed to load Gemini response -- Make sure you have inserted your API key in App.tsx!');
    }
  };

  function Submit() {
    console.log("USER PROMPT: ", inputval);
    FetchGemniniResponse();
  }

  function UpdateInput(event : React.ChangeEvent<HTMLInputElement>) {
    setInputVal(event.target.value);
    
  }
 

  return (
    <>
      <div className = "TitleBar">
        <h1>ReGemini</h1>
      </div>
      <div className = "Form">
          <input onChange={UpdateInput} value={inputval} placeholder = 'Message Gemini'></input>
          <button onClick = {Submit} type = "submit">Submit</button>
      </div>
      <div className = "GeminiOutput">{response ? response : 'Awaiting Response...'}</div>
    </>
  );
}

export default App;