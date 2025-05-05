import CharacterItemRendering from "./CharacterItemRendering";

const CharacterListRendering = ({
  title,
  characters,
}: {
  title: string;
  characters: Character[];
}) => {
  return (
    <>
      <h4 className="px-9 py-4 pr-6">
        <span className="text-xs font-semibold uppercase">
          {title} ({characters.length})
        </span>
      </h4>
      {characters.map((character) => (
        <CharacterItemRendering key={character.id} character={character} />
      ))}
    </>
  );
};

export default CharacterListRendering;
