import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Sidebar from "./components/Cart";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Error from "./components/Error";
import Header from "./components/Header";

function App() {
  
  return (
      <div id="app">
        
        <Header />
        
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
        
        <Sidebar />
        <Footer />

      </div>
  )
}

export default App
