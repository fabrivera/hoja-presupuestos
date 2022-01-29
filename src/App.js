import { useState } from 'react';
import LateralBar from './components/LateralBar'
import Page from './components/Page'
import { PageContextProvider } from './context/pageContext';
import './App.css';

function App() {

  const [pageId, setPageId] = useState()

  const [ toPrint, setToPrint ] = useState(false)

  return (
    <PageContextProvider>
      <div className="App">
        <LateralBar input={pageId} print={setToPrint}/>
        <div className="content">
          <Page returnPage={setPageId} print={toPrint}/>
        </div>
      </div>
    </PageContextProvider>
  );
}

export default App;
