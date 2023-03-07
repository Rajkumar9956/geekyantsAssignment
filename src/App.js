import React,{Suspense} from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Loading from "./Loading"
const Home = React.lazy(()=>import("./components/Home"))

function App() {
  return (
    <div className="App">
     <Suspense fallback={<Loading/>}>
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={<><Home /></>} />
        </Routes>
      </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
