import { useNavigate, useParams } from "react-router-dom";
import useCharacterDetail from "./hooks/useCharacterDetail";
import { useMemo } from "react";
import ColumnText from "./components/ColumnText";
import { FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa6";
import useStarCharacter from "./hooks/useStarCharacter";
import { CHARACTERS_QUERY } from "./hooks/useCharacterList";
import useDeleteCharacter from "./hooks/useDeleteCharacter";

const CharacterDetail = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { data, loading, error } = useCharacterDetail(+(id ?? 0));

  const character = data?.character;
  const [starCharacter] = useStarCharacter();
  const [deleteCharacter] = useDeleteCharacter();

  const characterDescription = useMemo(() => {
    if (!character) return [];

    return [
      { title: "Specie", description: character.species },
      { title: "Status", description: character.status },
      { title: "Origin", description: character.origin.name },
    ];
  }, [character]);

  const handleNavToHome = () => {
    navigate("/character");
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

  const handleDeleteCharacter = () => {
    deleteCharacter({
      variables: { id: character.id },
      refetchQueries: [{ query: CHARACTERS_QUERY }],
    })
      .then(() => {
        navigate("/character");
      })
      .catch((err) => {
        console.error("Error deleting character: ", err);
      });
  };

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <section
      className={`${!id && "hidden"}
        fixed inset-0 z-50 bg-white overflow-y-auto 
        md:static md:block md:px-24 md:z-auto md:col-span-1 
        lg:col-span-2 xl:col-span-3 px-6 py-10
        `}
    >
      {id ? (
        <div>
          {!error && character ? (
            <div className="flex flex-col">
              <FaArrowLeft
                className="block md:hidden text-primaryBlue my-6 h-8 w-8 cursor-pointer"
                onClick={handleNavToHome}
              />
              <section className="pb-4 flex flex-col">
                <div className="relative w-20 h-20">
                  <img
                    src={character.image_path}
                    alt="Avatar"
                    className="w-full h-full object-cover rounded-full"
                  />
                  <div
                    className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow cursor-pointer"
                    onClick={handleStarCharacter}
                  >
                    {character.is_starred ? (
                      <FaHeart className="text-starred" />
                    ) : (
                      <FaRegHeart className="text-secondary" />
                    )}
                  </div>
                </div>
                <span className="text-2xl font-bold">{character.name}</span>
              </section>
              <section className="flex flex-col">
                {characterDescription?.map((desc, idx) => (
                  <div key={desc.title}>
                    {idx !== 0 && <hr />}
                    <div className="py-4">
                      <ColumnText
                        topText={desc.title}
                        bottomText={desc.description}
                      />
                    </div>
                  </div>
                ))}
              </section>
              <section>
                <button
                  className="bg-coolGray-100 rounded-lg py-2 font-semibold w-20"
                  onClick={handleDeleteCharacter}
                >
                  Delete
                </button>
              </section>
            </div>
          ) : (
            <div>There was a trouble while gathering the information</div>
          )}
        </div>
      ) : (
        <h5 className="text-5xl">Select a character</h5>
      )}
    </section>
  );
};

export default CharacterDetail;
