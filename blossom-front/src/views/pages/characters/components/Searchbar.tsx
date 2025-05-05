import { HiOutlineAdjustments } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import FilterDialog from "./FilterDialog";
import { useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";

// Props type for SearchBar component
type SearchBarProps = {
  //eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFilter: (filters: any) => void;
  currentFilters: FilterValues;
};

// SearchBar component: provides search, sort, and filter UI
const SearchBar = ({ onFilter, currentFilters }: SearchBarProps) => {
  const [isFilterDialogOpen, setIsFilterDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(currentFilters.name);

  // Toggle filter dialog visibility
  const handleChangeFilterDialog = () => {
    setIsFilterDialogOpen((prev) => !prev);
  };

  // Apply search input value to filters
  const handleSearch = () => {
    onFilter({ ...currentFilters, name: searchValue });
  };

  // Toggle sort direction between ASC and DESC
  const handleSortToggle = () => {
    const newSort = currentFilters.sort === "ASC" ? "DESC" : "ASC";
    onFilter({ ...currentFilters, sort: newSort });
  };

  // Trigger search when pressing Enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <search className="pt-11 relative">
      <span className="px-6 pb-2 text-primary font-normal text-2xl">
        Rick and Morty list
      </span>

      {/* Search input and actions container */}
      <div className="mx-5 mt-4 py-2 px-3 h-[52px] flex flex-[1_0_0] betwe items-center gap-2 rounded-lg bg-coolGray-100 text-secondary">
        <IoSearch className="w-5 h-5 cursor-pointer" onClick={handleSearch} />
        <input
          className="bg-transparent text-sm font-medium w-full"
          placeholder="Search or filter results"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <HiArrowsUpDown
          className="w-5 h-5 cursor-pointer"
          onClick={handleSortToggle}
        />
        <HiOutlineAdjustments
          className={`w-5 h-5 cursor-pointer ${
            isFilterDialogOpen ? "bg-primary-100 text-primaryBlue" : ""
          }`}
          onClick={handleChangeFilterDialog}
        />

        {/* Filter dialog component */}
        <FilterDialog
          isOpen={isFilterDialogOpen}
          onClose={handleChangeFilterDialog}
          onApplyFilters={onFilter}
          currentFilters={currentFilters}
        />
      </div>
    </search>
  );
};

export default SearchBar;
