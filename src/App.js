import './App.css';
import Layout from './components/shared/Layout';
import { Routes, Route } from "react-router-dom";
import AllCars from './pages/AllCars';
import AddCars from './pages/AddCars';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path='/' element={<AllCars />}>Home</Route>
          <Route path="/add-car" element={<AddCars />}></Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
