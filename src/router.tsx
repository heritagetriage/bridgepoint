import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Leadership from "./pages/Leadership";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import InitiativeDetail from "./pages/InitiativeDetail";
import Initiatives from "./pages/Initiatives";
import NotFound from "./pages/NotFound";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/leadership" element={<Leadership />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/initiatives" element={<Initiatives />} />
      <Route path="/initiative/:id" element={<InitiativeDetail />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;