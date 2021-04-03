import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { updateCard, readDeck, readCard } from '../utils/api/index';

function EditCard() {
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
    await updateCard(formData);
    history.push(`/decks/${deckId}`);
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const loadedDeck = await readDeck(deckId, abortController.signal);
      const loadedCard = await readCard(cardId);
      setDeck(() => loadedDeck);
      setCard(() => loadedCard);
      setFormData({
        id: cardId,
        front: loadedCard.front,
        back: loadedCard.back,
        deckId: Number(deckId),
      });
    };
    loadDeck();
    return () => abortController.abort();
  }, [deckId, cardId]);

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

export default EditCard;
