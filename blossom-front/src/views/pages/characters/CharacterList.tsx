import { FC, ReactNode, useMemo, useState } from "react";
import useCharacterList from "./hooks/useCharacterList";
import SearchBar from "./components/Searchbar";
import CharacterListRendering from "./components/CharacterListRendering";

type LayoutProps = {
  children?: ReactNode;
};

const CharacterList: FC<LayoutProps> = ({ children }) => {
  const [filters, setFilters] = useState({
    character: "All",
    specie: "All",
    name: "",
    sort: "ASC",
  });

  const { data, loading, error } = useCharacterList(filters);

  const starredCharacters = useMemo(() => {
    return data?.characters.filter((char: Character) => char.is_starred) || [];
  }, [data]);

  const normalCharacters = useMemo(() => {
    return data?.characters.filter((char: Character) => !char.is_starred) || [];
  }, [data]);

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-screen flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-screen overflow-hidden">
      <div className="w-screen md:w-full md:col-span-1 bg-whiteSmoke text-primary overflow-y-auto">
        <section className="sticky top-0 left-0 bg-whiteSmoke pb-8">
          <SearchBar onFilter={setFilters} currentFilters={filters} />
        </section>
        <div>
          {!error && data ? (
            <section>
              <CharacterListRendering
                title="Starred characters"
                characters={starredCharacters}
              />
              <CharacterListRendering
                title="Characters"
                characters={normalCharacters}
              />
            </section>
          ) : (
            <div>There were a trouble while gathering the information</div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default CharacterList;
