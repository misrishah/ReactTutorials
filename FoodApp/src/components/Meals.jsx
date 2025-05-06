import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';

const requestConfig = {};

export default function Meals() {
    const {
        data: loadedMeals, 
        isLoading, error
    } = useHttp('http://localhost:3000/meals',requestConfig, []);

    console.log(loadedMeals);

    if (isLoading) {
        return <p className="centre"> Fetching meals...</p>
    }

    if (error) {
      return <Error title="Failed to fethc meals" message={error}/>
    }
    //if(!data) {
    // return <p> No meals found. </p>
    //}

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
