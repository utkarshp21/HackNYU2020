import React from "react";
import "./index.css";
import MainNav from "./MainNav";
import Video from '../video/index';
import Question from './Question';

const App = () => {
  return (
    <main className="App">
      <Video/>
      <div>
      <Question content="What is your favourite food?" />
      </div>
      {/* <MainNav/> */}
    </main>
  );
};

export default App;