import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React,{useState,useEffect} from 'react'
import Navbar from "./Components/Navbar";
import ListProductos from "./Components/ListProductos";
import Home from "./Pages/Home";
import ListaCarrito from "./Components/ListaCarrito";


function App() {

  const [productos, setProductos] = useState([])
  const [listUpdated, setListUpdated] = useState(false)
  const [productoCarr, setProductoCarr] =useState ([])
  const [total, setTotal] = useState(0);
  const [cantidad,setCantidad] = useState(1)

  useEffect(() => {
    const getProds = () => {
      fetch('http://localhost:3000/api')
      .then(res => res.json())
      .then(res => setProductos(res))
    }
    getProds()
    
    setListUpdated(false)
  }, [listUpdated])

  return (
      <Router>
        <Navbar/>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ListProductos productos={productos} productoCarr={productoCarr} setProductoCarr={setProductoCarr} />} />
          <Route path="/carrito" element={<ListaCarrito productoCarr={productoCarr} setProductoCarr={setProductoCarr} total={total} setTotal={setTotal} listUpdated={listUpdated} setListUpdated={setListUpdated}/>} />

        </Routes>


      </Router>

  );
}

export default App;
