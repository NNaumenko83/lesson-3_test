import { CocktailsList } from "../components/CocktailsList";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { getTrendingCocktails } from "../api/cocktail-service";
import { useLocation } from "react-router-dom";
import log from "eslint-plugin-react/lib/util/log";

export const Home = () => {
  const [cocktails, setCocktails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    const fetchTrendingCoctails = async () => {
      setIsLoading(true);
      try {
        const response = await getTrendingCocktails();

        const drinks = response.map((drink) => drink.drinks[0]);

        setCocktails(drinks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTrendingCoctails();
  }, []);

  return (
    <>
      <Section>
        <h1 className="text-center font-black text-gray-700 text-4xl mb-10">
          Trending cocktails
        </h1>
        {isLoading ? (
          <Loader />
        ) : (
          <CocktailsList cocktails={cocktails} state={{ from: location }} />
        )}
      </Section>
    </>
  );
};
