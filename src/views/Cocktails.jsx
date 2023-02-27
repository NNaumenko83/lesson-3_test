import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { searchByName } from "../api/cocktail-service";
import log from "eslint-plugin-react/lib/util/log";

export const Cocktails = ({ state }) => {
  const [isLoadind, setIsLoading] = useState(false);
  const [query, setQuery] = useState();
  const [cocktails, setCocktails] = useState(null);

  const onSubmit = (query) => {
    setQuery(query);
  };

  useEffect(() => {
    const fetchCoctail = async () => {
      setIsLoading(true);
      try {
        const cocktailsData = await searchByName(query);
        setCocktails(cocktailsData.drinks);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoctail();
  }, [query]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>
        <SearchForm onSubmitForm={onSubmit} />
        {isLoadind && <Loader />}
        {cocktails && <CocktailsList cocktails={cocktails} />}
      </Section>
    </>
  );
};
