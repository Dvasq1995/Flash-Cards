import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { readDeck, deleteDeck } from '../utils/api/index';
import Card from './Card';

function Deck({ updateDecks }) {
  const { deckId } = useParams();
  const history = useHistory();

  const [deck, setDeck] = useState({});
  const [numCards, setNumCards] = useState(0);

  const updateCards = (value) => {
    setNumCards(() => numCards + value);
  };

  const handleDeleteDeck = async () => {
    const deckToDelete = window.confirm(
      'Delete this deck? \n \n You will not be able to recover it.',
    );
    if (deckToDelete) {
      await deleteDeck(deck.id);
      updateDecks(-1);
      history.push('/');
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const loadDeck = async () => {
      const deck = await readDeck(deckId, abortController.signal);
      setDeck(() => deck);
    };
    loadDeck();
    return () => {
      abortController.abort();
    };
  }, [numCards, deckId]);

  if (deck.id) {
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item text-primary">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {deck.name}
            </li>
          </ol>
        </nav>
        <h3>{deck.name}</h3>
        <p>{deck.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Link
              to={`/decks/${deck.id}/edit`}
              className="btn btn-secondary"
              style={{ marginRight: '10px' }}
            >
              Edit
            </Link>
            <Link
              to={`/decks/${deck.id}/study`}
              className="btn btn-primary"
              style={{ marginRight: '10px' }}
            >
              Study
            </Link>
            <Link
              to={`/decks/${deck.id}/cards/new`}
              className="btn btn-primary"
            >
              Add Cards
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleDeleteDeck}>
              Delete
            </button>
          </div>
        </div>
        <h2 style={{ marginTop: '20px' }}>Cards</h2>
        <div>
          {deck.cards.map(({ id, front, back }) => (
            <Card
              key={id}
              id={id}
              front={front}
              back={back}
              updateCards={updateCards}
            />
          ))}
        </div>
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
}

export default Deck;
