import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StockOverviewPage } from "./Pages/stockOverviewPage";
import { StockDetailPage } from "./Pages/stockDetailPage";
import { WatchListContextProvider } from "./context/watchListContext";
function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<StockOverviewPage />} />
            <Route path="/detail/:symbol" element={<StockDetailPage />} />
          </Routes>
        </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
