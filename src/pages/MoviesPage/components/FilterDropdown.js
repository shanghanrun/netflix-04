import Dropdown from 'react-bootstrap/Dropdown';
import YearFilter from './YearFilter';
import ScoreFilter from './ScoreFilter';

const genres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama',
  'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
  'TV Movie', 'Thriller', 'War', 'Western'
];

function FilterDropdown({setYearStart,setYearEnd,setScoreStart,setScoreEnd }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="danger" id="dropdown-basic">
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
		<Dropdown.Item >
          <ScoreFilter setScoreStart={setScoreStart} setScoreEnd={setScoreEnd} />
        </Dropdown.Item>

        <Dropdown.Item >
          <YearFilter setYearStart={setYearStart} setYearEnd={setYearEnd} />
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default FilterDropdown;