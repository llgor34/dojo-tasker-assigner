import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useCollection } from '../../hooks/useCollection';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useFirestore } from '../../hooks/useFirestore';
import { timestamp } from '../../firebase/config';
import './Create.css';
import Select from 'react-select';

const Create = () => {
  // Assign field
  const { documents: usersDocuments } = useCollection('users');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (usersDocuments) {
      const options = usersDocuments.map((user) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [usersDocuments]);

  // Category field
  const [categories, setCategories] = useState([]);
  const { documents: categoriesDocuments } = useCollection('categories');

  useEffect(() => {
    if (categoriesDocuments) {
      const catsArray = [];
      categoriesDocuments.forEach((doc) => {
        const newCat = {
          label: doc.label,
          value: doc.value,
        };
        catsArray.push(newCat);
      });
      setCategories(catsArray);
    }
  }, [categoriesDocuments]);

  // form field values
  const [name, setName] = useState('');
  const [details, setDetails] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [formError, setFormError] = useState(null);
  const { user } = useAuthContext();

  const isEmpty = (x, errorMessage) => {
    let empty = false;
    if (x.trim().length === 0) {
      empty = true;
      setFormError(`${errorMessage}`);
    }

    return empty;
  };

  // handle submit
  const { addDocument, response } = useFirestore('projects');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null);

    if (
      isEmpty(name, 'Please enter a project name') ||
      isEmpty(details, 'Please enter a project details') ||
      isEmpty(dueDate, 'Please enter a project deadline')
    ) {
      return;
    }

    if (!category) {
      setFormError('Please select a project category');
      return;
    }

    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user');
      return;
    }

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      completed: false,
      createdBy: {
        displayName: user.displayName,
        photoURL: user.photoURL,
        id: user.uid,
      },
      assignedUsersList: assignedUsers.map((u) => {
        return {
          displayName: u.value.displayName,
          photoURL: u.value.photoURL,
          id: u.value.id,
        };
      }),
    };

    addDocument(project);
  };

  useEffect(() => {
    if (response.document) {
      navigate('/');
    }
  }, [response.document, navigate]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Project name:</span>
          <input
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            required
            type="text"
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>

        <label>
          <span>Set deadline:</span>
          <input
            required
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>

        <label>
          <span>Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>

        <label>
          <span>Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>

        {!response.isPending && <button className="btn">Add Project</button>}
        {response.isPending && <button className="btn">Loading...</button>}

        {formError && <p className="error">{formError}</p>}
        {response.error && <p className="error">{response.error}</p>}
      </form>
    </div>
  );
};

export default Create;
