type FilterValues = {
  character: string;
  specie: string;
  name: string;
  sort: string;
};

type RoutesType = {
  id: string;
  exact?: boolean;
  path?: string;
  layout?: React.FC;
  // Disabled due to necessary any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
  routes?: RoutesType[];
};
