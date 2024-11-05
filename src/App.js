import { BrowserRouter, Routes, Route } from "react-router-dom";
import Error from "./pages/Error";
import ListDetail from "./pages/ListDetail";
import Login from "./pages/Login";
import SharedLayout from "./pages/SharedLayout";
import ShoppingLists from "./pages/ShoppingLists";
import Archive from "./pages/Archive";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<ShoppingLists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/listdetail" element={<ListDetail />} />
          <Route path="/archive" element={<Archive />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
