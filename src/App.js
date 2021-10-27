import React, {useState} from 'react';
import './App.css';
import DisplayPage from './components/DisplayPage';
import ToggleSwitch from './ToggleSwitch'

function App() {
  const [cardView, setCardView] = useState(true)
  const viewCards = (val) => {
    console.log(val)
    setCardView(val)
  }
  
  return (
    <div className="App" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <h2 style={{paddingBottom: '20px', marginBottom: '10px'}}><u>Car Crash Dashboard</u></h2>
      <ToggleSwitch viewCards={viewCards}/>
      <DisplayPage cardView={cardView}/>
    </div>
  );
}

export default App;
