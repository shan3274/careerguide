import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Typewriter from "typewriter-effect";
import { ColorRing } from "react-loader-spinner";

function App() {
  const [prompt, setprompt] = useState("");
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("hello 123");

  // feilds state
  const [name, setName] = useState("");
  const [skills, setSkills] = useState("");
  const [intrest, setIntrest] = useState("");

  const handleSubmit = (e) => {
    setprompt(
      `hi my name is ${name} my skills are ${skills} my intrest is ${intrest}  suggest me the good career and give me syllabus for one career you want and also suggest related youtube channel for studies`
    );
    setLoading(true);
    axios
      // for local ser https://http://localhost:5555/chat
      .post("https://careerguidebackend.vercel.app/chat", { prompt })
      .then((res) => {
        setResponse(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    setData(response?.content.split(/[:\n]+/));
  }, [response]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-10 ">
      <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-br from-blue-500 via-purple-500 to-pink-600 py-4">
        Career guide
      </h1>
      <div className="text-[20px] text-gray-500">
        <Typewriter
          options={{
            strings: [
              "Best career app for your",
              "Just describe your skills and intrest",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className="w-full h-[200px] flex items-center gap-10  justify-center flex-col">
        <div className="w-full flex items-center justify-center gap-10">
          <input
            placeholder="your name"
            className="w-[20%] h-[40px] border pl-3 border-black rounded-lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="w-full flex items-center justify-center gap-10">
          <input
            placeholder="Your skills max 5 skills"
            className="w-[40%] h-[40px] border pl-3 border-black rounded-lg"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
          <input
            placeholder="Your intrest max 5 intrest"
            className="w-[40%] h-[40px] border pl-3 border-black rounded-lg"
            value={intrest}
            onChange={(e) => setIntrest(e.target.value)}
          />
        </div>
      </div>
      <button
        className="w-[150px] h-[40px] bg-green-500 rounded-lg text-white transition-[1s] hover:scale-[1.05]"
        onClick={handleSubmit}
      >
        Search
      </button>
      <h1 className="text-[35px] font-[600] text-green-600">Your Response</h1>
      <p className="text-[20px] font-[600] text-green-600 w-[80%] mb-10">
        {loading ? (
          <div className="absolute top-0 left-0  w-full h-screen bg-[rgba(0,0,0,0.3)] flex items-center justify-center">
            <ColorRing />
          </div>
        ) : (
          <div className="">
            {response != null &&
              data &&
              Object.keys(data)?.map((keyName, i) => (
                <div className="text-black text-[17px] mt-10">
                  {" "}
                  {data[keyName]}
                </div>
              ))}
            {/* {data} */}
          </div>
        )}
      </p>
    </div>
  );
}

export default App;
