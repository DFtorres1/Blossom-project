import { FC, ReactNode, useMemo, useState } from "react";
import useCharacterList from "./hooks/useCharacterList";
import SearchBar from "./components/Searchbar";
import CharacterListRendering from "./components/CharacterListRendering";

type LayoutProps = {
  children?: ReactNode;
};

/**
 * CharacterList component
 * 
 * Renders a character list view with a sidebar including:
 * - A search bar to filter characters
 * - Two sections: starred characters and normal characters
 * 
 * Accepts optional `children` to render details or additional views.
 */
const CharacterList: FC<LayoutProps> = ({ children }) => {
  // State for search and filter options
  const [filters, setFilters] = useState({
    character: "All",
    specie: "All",
    name: "",
    sort: "ASC",
  });

  // Fetch character list data based on filters
  const { data, loading, error } = useCharacterList(filters);

  // Memoized list of starred characters
  const starredCharacters = useMemo(() => {
    return data?.characters.filter((char: Character) => char.is_starred) || [];
  }, [data]);

  // Memoized list of normal (non-starred) characters
  const normalCharacters = useMemo(() => {
    return data?.characters.filter((char: Character) => !char.is_starred) || [];
  }, [data]);

  // Loading state UI
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-screen flex md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 h-screen overflow-hidden">
      {/* Sidebar section */}
      <div className="w-screen md:w-full md:col-span-1 bg-whiteSmoke text-primary overflow-y-auto">
        {/* Search bar */}
        <section className="sticky top-0 left-0 bg-whiteSmoke pb-8">
          <SearchBar onFilter={setFilters} currentFilters={filters} />
        </section>

        {/* Character lists */}
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
