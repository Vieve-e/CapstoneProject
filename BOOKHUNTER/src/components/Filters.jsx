
import PropTypes from "prop-types";

const Filter = ({ onFilterChange, filters }) => {
  const handleAuthorChange = (e) => {
    onFilterChange({ author: e.target.value });
  };

  const handleGenreChange = (e) => {
    onFilterChange({ genre: e.target.value });
  };


  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-[600px] mx-auto">
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px] text-white font-semibold"
        onChange={handleAuthorChange}
        value={filters.author}
      >
        <option value="">Authors</option>
        <option value="Feehan">Christine Feehan</option>
        <option value="Brown">Dan Brown</option>
        <option value="Julia">Julia Quinn</option>
        <option value="Roberts">Nora Roberts</option>
        <option value="Patterson">James Patterson</option>
        <option value="King">Stephen King</option>
      </select>
      <select
        className="select select-bordered rounded-xs w-auto min-w-[120px] font-semibold text-white"
        onChange={handleGenreChange}
        value={filters.genre}
      >
        <option value="">Genre</option>
        <option value="horror">Horror</option>
        <option value="romance">Romance</option>
        <option value="paranormal">Paranormal_romance</option>
        <option value="historical">Historical_fiction</option>
        <option value="sci-fi">Science_fiction</option>
        <option value="thriller">Thriller</option>
      </select>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
};

export default Filter;
