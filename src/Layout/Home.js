import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../utils/api/index';
import DeckList from './DeckList';

function Home({ numDecks, updateDecks }) {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();

    const loadDecks = async () => {
      const deck = await listDecks(abortController.signal);
      setDecks(() => deck);
    };
    loadDecks();
    return () => abortController.abort();
  }, [numDecks]);

  return (
    <section>
      <Link to="/decks/new" className="btn btn-primary btn-lg">
        Create Deck
      </Link>
      {decks.map(({ id, name, description, cards }) => (
        <DeckList
          updateDecks={updateDecks}
          key={id}
          id={id}
          name={name}
          description={description}
          cards={cards}
        />
      ))}
    </section>
  );
}

export default Home;
