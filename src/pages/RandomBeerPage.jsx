import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import beersJSON from "./../assets/beers.json";
import axios from "axios";


function RandomBeersPage() {
  // Mock initial state, to be replaced by data from the Beers API. Store the beer info retrieved from the Beers API in this state variable.
  const [randomBeer, setRandomBeer] = useState(null);

  // React Router hook for navigation. We use it for the back button. You can leave this as it is.
  const navigate = useNavigate();
  const params = useParams()
  
  // TASKS:
  // 1. Set up an effect hook to make a request for a random beer from the Beers API.
  // 2. Use axios to make a HTTP request.
  // 3. Use the response data from the Beers API to update the state variable.
  useEffect(() => {
    getRandomData();
  }, []);
  const getRandomData = async () => {
    try {
    const response = await axios.get(`https://ih-beers-api2.herokuapp.com/beers/`);
     console.log(response)
     const randomBeer = response.data[Math.floor(Math.random()*response.data.length)]
     console.log(randomBeer)
     const response2= await axios.get(`https://ih-beers-api2.herokuapp.com/beers/${randomBeer._id}`);
     setRandomBeer(response2.data)
   } catch (error) {
     console.log(error)
   }
  } 
  if (randomBeer === null) {
    return <h3>...buscando data</h3>
  }

  // The logic and the structure for the page showing the random beer. You can leave this as it is.
  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      <h2>Random Beer</h2>

      {randomBeer && (
        <>
          <img
            src={randomBeer.image_url}
            alt="beer"
            height="300px"
            width="auto"
          />
          <h3>{randomBeer.name}</h3>
          <p>{randomBeer.tagline}</p>
          <p>Attenuation level: {randomBeer.attenuation_level}</p>
          <p>Description: {randomBeer.description}</p>
          <p>Created by: {randomBeer.contributed_by}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
        </>
      )}
    </div>
  );
}

export default RandomBeersPage;
