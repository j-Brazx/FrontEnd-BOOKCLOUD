import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./componentes/pages/Home/Home";
import Footer from "./componentes/Footer/footer";
import Header from "./componentes/Header";
import Cadastro from "./componentes/pages/cadastro/cadastro";
import Login from "./componentes/pages/login/login";
import Inicio from "./componentes/pages/Início/inicio";
import Clientes from "./componentes/pages/Clientes/clientes";
import Adicionar from "./componentes/pages/Add-Excluir/adicionar";
import Categorias from "./componentes/pages/Categorias/categorias";
import Perfil from "./componentes/pages/perfil/perfil";
import Sinopse from "./componentes/pages/Sinopse";
import Acervo from "./componentes/pages/acervo";
import Painel from "./componentes/pages/dashboard";
import Comunidade from "./componentes/pages/Comunidade/comunidade";

function Layout({ children }) {
  const location = useLocation();

  const noHeaderFooterRoutes = ["/login", "/criar", "/", "/cadastrar-livro"];

  const hideHeaderFooter = noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      {children}
    </>
  );
}

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/criar" element={<Cadastro />} />
            <Route path="/inicio" element={<Inicio />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/cadastrar-livro" element={<Adicionar />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/sinopse/:id" element={<Sinopse />} />
            <Route path="/acervo" element={<Acervo />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="/comunidade/:id" element={<Comunidade />} />
          </Routes>
        </Layout>
      </Router>
      <Footer />
    </>
  );
}

export default App;
