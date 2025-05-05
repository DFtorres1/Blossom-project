type Origin = {
  name: string;
  url: string;
};

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image_path: string;
  is_starred: boolean;
  origin: Origin;
};
