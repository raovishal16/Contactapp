import './App.css';
import { Route, Routes } from "react-router-dom";
import Header from './Components/Header';
import AddContact from './Components/AddContact ';
import ViewContact from './Components/ViewContact';

function App() {



  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AddContact />} />
        <Route path='/contact' element={<ViewContact />} />
      </Routes>
    </>
  );
}

export default App;
