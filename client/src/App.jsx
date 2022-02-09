import Store from './components/Store'
import Landing from './components/Landing'
import { PackPlayerProvider } from './context/PackPlayersContext';
import { BalancesProvider } from './context/BalancesContext';
import { BrowserRouter, Routes, Route } from "react-router-dom";


const App = () => {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/Store' element={
          <PackPlayerProvider>
          <BalancesProvider>
            <Store/>
          </BalancesProvider>
          </PackPlayerProvider>
        }/>
        <Route exact path='/' element={<Landing/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;