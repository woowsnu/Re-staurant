import logo from './logo.svg';
import './App.css';
<<<<<<< HEAD

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
=======
import HomePage from './routes/HomePage';
import { ResContextProvider } from './store/res-context';

function App() {
  return (
    <div className='App'>
      <ResContextProvider>
        <HomePage />
      </ResContextProvider>
>>>>>>> b48e3904361b2f450f0a8d0191fec223963c7e33
    </div>
  );
}

export default App;
