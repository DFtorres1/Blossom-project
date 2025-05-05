import { FaHeart, FaRegHeart } from "react-icons/fa6";
import ColumnText from "./ColumnText";
import { useLocation, useNavigate } from "react-router-dom";
import useStarCharacter from "../hooks/useStarCharacter";
import { CHARACTERS_QUERY } from "../hooks/useCharacterList";

const CharacterItemRendering = ({ character }: { character: Character }) => {
  const { pathname } = useLocation();
  const pathId = pathname.split("/").pop()
  const navigate = useNavigate();

  const [starCharacter] = useStarCharacter();

  const handleNavToChar = () => {
    navigate(`/character/${character.id}`);
  };

  const handleStarCharacter = () => {
    starCharacter({
      variables: { id: character.id, is_starred: !character.is_starred },
      update: (cache, { data }) => {
        const updatedCharacter = data.updateIsStarred;

        const characterId = cache.identify({
          __typename: "Character",
          id: updatedCharacter.id,
        });

        cache.modify({
          id: characterId,
          fields: {
            is_starred() {
              return updatedCharacter.is_starred;
            },
          },
        });
      },
      refetchQueries: [{ query: CHARACTERS_QUERY }],
    });
  };

  return (
    <div className="px-4 cursor-pointer" onClick={handleNavToChar}>
      <hr />
      <div
        className={`py-4 px-5 flex flex-row items-center justify-between gap-4 self-stretch ${
            pathId === String(character.id) && "bg-primary-100 rounded-lg"
        }`}
      >
        <div className="flex flex-row items-center gap-4">
          <img
            height={32}
            width={32}
            alt="Avatar"
            src={character.image_path}
            className="w-8 h-8 rounded-full"
          />
          <ColumnText topText={character.name} bottomText={character.species} />
        </div>
        <div
          className="w-8 h-8 rounded-full bg-whiteSmoke content-center justify-items-center cursor-pointer"
          onClick={handleStarCharacter}
        >
          {character.is_starred ? (
            <FaHeart height={32} width={32} className="text-starred" />
          ) : (
            <FaRegHeart height={32} width={32} className="text-secondary" />
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterItemRendering;
