import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation } from "react-router-dom";
import { routes } from "../routes";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCocktailDetail } from "../api/cocktail-service";
import log from "eslint-plugin-react/lib/util/log";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();

  const [cocktail, setCocktail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const pageFrom = location.state?.from ?? "/";
  console.log(pageFrom);

  useEffect(() => {
    setIsLoading(true);
    const fetchCocktail = async (cocktailId) => {
      try {
        const cocktail = await getCocktailDetail(cocktailId);

        setCocktail(cocktail);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    fetchCocktail(cocktailId);
  }, []);

  return (
    <>
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        CocktailDetail
      </h1>
      <GoBackBtn path={pageFrom} />
      {isLoading && <Loader />}
      {cocktail && <CocktailInfo cocktail={cocktail} />}
    </>
  );
};
