import {Routes,BrowserRouter,Route} from "react-router-dom"
import Header from "./components/header/Header";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Header/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
