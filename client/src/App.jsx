import Main from './components/Main'
import { PackPlayerProvider } from './context/PackPlayersContext';
import { BalancesProvider } from './context/BalancesContext';


function App() {
  
  return (
    <PackPlayerProvider>
      <BalancesProvider>
        <Main />
      </BalancesProvider>
    </PackPlayerProvider>
  );
}

export default App;