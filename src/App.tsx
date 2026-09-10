import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import ListaCategorias from "./components/categoria/listacategoria/ListaCategoria";
import Home from "./pages/home/Home";
import ListaProdutos from "./components/produto/listaprodutos/ListaProdutos";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import FormProduto from "./components/produto/formproduto/FormProduto";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import DeletarProduto from "./components/produto/deletarproduto/DeletarProduto";
import Cadastro from "./pages/cadastro/Cadastro";
import Login from "./pages/login/Login";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="bg-stone-50 text-stone-800 flex flex-col min-h-screen">
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro" element={<Cadastro />} />

            <Route path="/categorias" element={<ListaCategorias />} />
            <Route path="/cadastrarcategoria" element={<FormCategoria />} />
            <Route path="/editarcategoria/:id" element={<FormCategoria />} />
            <Route
              path="/deletarcategoria/:id"
              element={<DeletarCategoria />}
            />

            <Route path="/produtos" element={<ListaProdutos />} />
            <Route path="/cadastrarproduto" element={<FormProduto />} />
            <Route path="/editarproduto/:id" element={<FormProduto />} />
            <Route
              path="/deletarproduto/:id"
              element={<DeletarProduto />}
            />
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;