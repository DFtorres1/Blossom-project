interface Option {
  label: string;
  value: string;
}

interface FilterItemProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

const FilterItem = ({
  title,
  options,
  selectedValue,
  onSelect,
}: FilterItemProps) => {
  return (
    <div>
      <h3 className="text-sm font-medium mb-3">{title}</h3>
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={`rounded-lg py-4 font-semibold border 
              ${
                selectedValue === option.value
                  ? "bg-primary-100 text-primaryBlue"
                  : ""
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterItem;
