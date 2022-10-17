import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { CountryType } from './types';
import Loading from './components/Loading';
import Country from './components/Country';


const App = () => {
  const [countries, setCountries] = useState<CountryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getCountries = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<CountryType[]>(
        "https://restcountries.eu/rest/v2/all"
      );
      setCountries(data);
    } catch {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return (
    <div>
      <Loading loading={loading}>
        {countries.map((country) => {
          return <Country key={country.name} country={country} />;
        })}
      </Loading>
    </div>
  );
}

export default App