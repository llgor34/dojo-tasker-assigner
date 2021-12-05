import { useCollection } from '../../hooks/useCollection';

const userFilters = [
  {
    label: 'All',
    value: 'all',
    id: 'G5B7OrrOXFd7LG3QdnTu',
  },
  {
    label: 'Mine',
    value: 'mine',
    id: 'TCOUetjX7uIFA1BsZWEC',
  },
  {
    label: 'Completed',
    value: 'completed',
    id: 'EIwRWVbisWGTvpSxFJxS',
  },
];

const ProjectFilter = ({ currentFilter, changeFilter }) => {
  const { documents: databaseFilterList } = useCollection('categories');

  const handleClick = (newFilter) => {
    changeFilter(newFilter);
  };

  return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {databaseFilterList &&
          [...userFilters, ...databaseFilterList].map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleClick(filter.value)}
              className={currentFilter === filter.value ? 'active' : ''}
            >
              {filter.label}
            </button>
          ))}
      </nav>
    </div>
  );
};

export default ProjectFilter;
