import { useState } from "react";
import FilterItem from "./FilterItem";
import { FaArrowLeft } from "react-icons/fa6";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: FilterValues;
}

const FilterDialog = ({
  isOpen,
  onClose,
  onApplyFilters,
  currentFilters,
}: FilterDialogProps) => {
  const [filters, setFilters] = useState(currentFilters);

  const handleSelect = (filterKey: string, value: string) => {
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  if (!isOpen) return null;
  return (
    <div
      className="
        z-40 bg-white p-6 flex flex-col shadow-lg
        fixed inset-0 h-screen overflow-y-auto
        md:absolute md:top-[100%] md:left-0 md:right-0 md:mt-2 md:rounded-lg md:mx-5 md:w-11/12
        md:max-h-[225%] md:overflow-y-auto
      "
    >
      <div className="space-y-6">
        <FaArrowLeft
          className="block md:hidden text-primaryBlue my-6 h-8 w-8 cursor-pointer"
          onClick={onClose}
        />
        <FilterItem
          title="Character"
          options={[
            { label: "All", value: "All" },
            { label: "Starred", value: "Starred" },
            { label: "Others", value: "Others" },
          ]}
          selectedValue={filters.character}
          onSelect={(value) => handleSelect("character", value)}
        />

        <FilterItem
          title="Specie"
          options={[
            { label: "All", value: "All" },
            { label: "Human", value: "Human" },
            { label: "Alien", value: "Alien" },
          ]}
          selectedValue={filters.specie}
          onSelect={(value) => handleSelect("specie", value)}
        />

        <button
          className="bg-coolGray-100 rounded-lg py-2 font-semibold w-full"
          onClick={handleApplyFilters}
        >
          Filter
        </button>
      </div>
    </div>
  );
};

export default FilterDialog;
