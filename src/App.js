import logo from './logo.svg';
import './App.css';
import Cards from './component/Cards/cards';
import Charts from './component/Charts/charts';
import CountryPicker from './component/countryPicker/countryPicker';
import  {fetchData } from './api/index';
import { useEffect,useState } from 'react';
import coronaVirus from './Images/image.png'


function App() {
  
 const [state,setState] = useState({

  confirmed:{value:""},
  deaths:{value:""},
  recovered:{value:""},
  lastUpdate:"",
 });

 console.log(state);
 const [countryState,setCountryState]=useState("");
 

  const backEndData = async ()=>{

   let newFetchData = await fetchData();
   return newFetchData;

  }
  useEffect(() => {

    const responseData = async()=>{
    const response = await backEndData();
    setState(response);
  }
    responseData();
  }, []);

  const handleCountryChange= async(country)=>{
    let newFetchData = await fetchData(country);

    setState(newFetchData);
    setCountryState(country);
   }
   console.log(countryState);
  return (
    <div className="App">
      <img className="image" src={coronaVirus}  atl="covid-19"/>
      <Cards data={state}/>
      <CountryPicker handleCountryChange={handleCountryChange}/>
      <Charts countryData={state} countryState={countryState}/>
    </div>
  );
}

export default App;
