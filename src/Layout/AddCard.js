import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { createCard, readDeck } from '../utils/api/index';

function AddCard() {
  const initialState = {
    front: '',
    back: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, formData);
    setFormData(initialState);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      setDeck(() => loadedDeck);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId]);

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
            Add Card
          </li>
        </ol>
      </nav>
      <h1>{deck.name}: Add Cards</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="front">
            <h5>Front</h5>
          </label>
          <textarea
            className="form-control"
            name="front"
            rows="3"
            placeholder="Front side of card"
            value={formData.front}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="back">
            <h5>Back</h5>
          </label>
          <textarea
            className="form-control"
            name="back"
            rows="3"
            placeholder="Back side of card"
            value={formData.back}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <Link to={`/decks/${deckId}`} className="btn btn-secondary">
            Done
          </Link>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCard;
