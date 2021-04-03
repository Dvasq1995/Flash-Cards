import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { deleteDeck } from '../utils/api/index';

function DeckList({ id, name, description, cards, updateDecks }) {
  const history = useHistory();

  const handleDelete = async () => {
    const deckToDelete = window.confirm(
      'Delete this deck? \n \n You will not be able to recover it.',
    );
    if (deckToDelete) {
      await deleteDeck(id);
      updateDecks(-1);
      history.push('/');
    }
  };

  return (
    <section className="card" style={{ marginTop: '10px' }}>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h3 className="card-title">{name}</h3>
          {cards.length} cards
        </div>
        <p className="card-text">{description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Link
              to={`decks/${id}`}
              className="btn btn-secondary"
              style={{ marginRight: '10px' }}
            >
              View
            </Link>
            <Link to={`decks/${id}/study`} className="btn btn-primary">
              Study
            </Link>
          </div>
          <div>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeckList;
