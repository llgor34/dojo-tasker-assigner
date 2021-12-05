import { Link } from 'react-router-dom';
import Avatar from '../avatar/Avatar';
import './ProjectList.css';

const ProjectList = (props) => {
  const { projects } = props;

  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet</p>}
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.id}`}
          className={`${project.completed ? 'completed' : ''}`}
        >
          <h4>{project.name}</h4>
          <p>Due by {project.dueDate.toDate().toDateString()}</p>
          <div className="assigned-to">
            <ul>
              {project.assignedUsersList.map((user) => (
                <li key={user.photoURL}>
                  <Avatar src={user.photoURL} />
                </li>
              ))}
            </ul>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProjectList;
