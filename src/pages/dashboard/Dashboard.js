import { useState } from 'react';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Dashboard.css';
import ProjectList from '../../components/projectList/ProjectList';
import ProjectFilter from './ProjectFilter';

const Dashboard = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const { documents, error } = useCollection('projects');
  const { user } = useAuthContext();

  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };

  // filter the documents
  const projects = documents
    ? documents.filter((document) => {
        const isDocumentCompleted = document.completed === true;
        switch (currentFilter) {
          case 'all':
            return !isDocumentCompleted;
          case 'mine':
            let assignedToMe = false;
            document.assignedUsersList.forEach((u) => {
              if (user.uid === u.id) {
                assignedToMe = true;
              }
            });
            return assignedToMe && !isDocumentCompleted;
          case 'completed':
            return isDocumentCompleted;
          default:
            return document.category === currentFilter && !isDocumentCompleted;
        }
      })
    : null;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && <p className="error">{error}</p>}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {projects && <ProjectList projects={projects} />}
    </div>
  );
};

export default Dashboard;
