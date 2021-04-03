import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { createDeck } from '../utils/api/index';

function CreateDeck() {
  const history = useHistory();

  const initialState = {
    name: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck(formData);
    history.push(`/decks/${newDeck.id}`);
  };

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            placeholder="Deck Name"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            value={formData.description}
            placeholder="deck description"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Link
            to="/"
            className="btn btn-secondary"
            style={{ marginRight: '10px' }}
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreateDeck;
