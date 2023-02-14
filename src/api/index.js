import axios from "axios";

const url="https://covid19.mathdro.id/api"

export const fetchData = async(country)=>{

  let recovered=0;
  let changeAbleUrl = url;
  if(country && country!=="global"){
    changeAbleUrl = `${url}/countries/${country}`;
  }
  try{
    const {data:{confirmed,deaths,lastUpdate}} =await axios.get(changeAbleUrl);

    recovered = confirmed.value - deaths.value;
    const modifiedData = {
      
       confirmed,deaths,recovered,lastUpdate
    }
    return modifiedData;

  }catch(error){

  }  
}

// api for chart
export const fetchDailyData= async()=>{
try {
  const {data}= await axios.get(`${url}/daily`);

  const modifiedData = data.map((dailyData)=>({
    confirmed:dailyData.confirmed.total,
    deaths:dailyData.deaths.total,
    recovered:dailyData.confirmed.total-dailyData.deaths.total,
    date:dailyData.reportDate
  }));
  
  return modifiedData;

} catch (error) {
  // return  [];
  console.log("error");
}
  
}
// api for countryPicker

export const countryPicker= async()=>{
  try {
    const {data:{countries}}= await axios.get(`${url}/countries`);
    return countries.map((country)=>country.name);
  } catch (error) {
    console.log("error")
  }
  
}

