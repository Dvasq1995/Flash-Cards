import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { createCard, updateCard, readDeck, readCard } from '../utils/api/index';

function CardTemplate({ setting }) {
  const initialState = {
    front: '',
    back: '',
  };

  const [formData, setFormData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({});
  const history = useHistory();
  const { deckId, cardId } = useParams();

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (setting === 'edit') {
      await updateCard(formData);
      history.push(`/decks/${deckId}`);
    } else {
      await createCard(deckId, formData);
      setFormData(initialState);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      if (setting === 'edit') {
        const loadedCard = await readCard(cardId);
        setCard(() => loadedCard);
        setFormData({
          id: cardId,
          front: loadedCard.front,
          back: loadedCard.back,
          deckId: Number(deckId),
        });
      }
      setDeck(() => loadedDeck);
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

  if (setting === 'add') {
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
  } else {
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
              Edit Card {card.id}
            </li>
          </ol>
        </nav>
        <h1>Edit Card</h1>
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
          </div>
          <div className="form-group">
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
}

export default CardTemplate;
