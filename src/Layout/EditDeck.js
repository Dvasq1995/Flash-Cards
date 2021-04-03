import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api/index';

function EditDeck() {
  const initialState = {
    name: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const history = useHistory();
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      setDeck(() => loadedDeck);
      setFormData({
        id: deckId,
        name: loadedDeck.name,
        description: loadedDeck.description,
      });
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedDeck = await updateDeck(formData);
    history.push(`/decks/${updatedDeck.id}`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item text-primary">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item text-primary">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Deck
          </li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput">
            <h5>Name</h5>
          </label>
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Deck Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="descriptionInput">
            <h5>Description</h5>
          </label>
          <textarea
            name="description"
            rows="3"
            className="form-control"
            placeholder="Brief description of the deck"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <Link to={`/decks/${deckId}`} className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditDeck;
