const axios = require('axios');

const url = 'https://covid19-update-api.herokuapp.com/api/v1/world';

const getData = async url => {
  try {
    const response = await axios.get(url);
    data = response.data;
    //console.log(data);
    return data;
  } catch (error){
    console.log(error);
  }
};

getData(url).then( results => analyzeResults(results));

const resultArray= [];

const analyzeResults = results => {
  //results.countries.map((result)=>console.log(result.name + " | deaths:" + result.deaths + " | cases: " + result.cases + " : " + (result.deaths/result.cases)*100));
  results.countries.map((result)=>
    resultArray.push(
      {
        name: result.name,
        deaths: result.deaths,
        cases: result.cases,
        deathRatio: (result.deaths/result.cases)*100
      }
    )
  );
  //console.log(resultArray);
  resultArray.sort((a,b)=>(b.deathRatio > a.deathRatio) ? 1: ((a.deathRatio > b.deathRatio) ? -1 : 0));
  console.log(resultArray);
};

