import './App.css';
import HomePage from './routes/HomePage';
import { ResContextProvider } from './store/res-context';

function App() {
  return (
    <div className='App'>
      <ResContextProvider>
        <HomePage />
      </ResContextProvider>
    </div>
  );
}

export default App;
