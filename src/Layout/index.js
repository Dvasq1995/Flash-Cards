import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './Header';
import NotFound from './NotFound';
import CreateDeck from './CreateDeck';
import Home from './Home';

import Deck from './Deck';
import Study from './Study';
import EditDeck from './EditDeck';

import CardTemplate from './CardTemplate';

function Layout() {
  const url = '/decks/';
  const [numDecks, setNumDecks] = useState(0);

  const updateDecks = (value) => {
    setNumDecks(() => numDecks + value);
  };

  return (
    <>
      <Header />
      <main className="container">
        <Switch>
          <Route exact={true} path="/">
            <Home numDecks={numDecks} updateDecks={updateDecks} />
          </Route>
          <Route path={`${url}:deckId/study`}>
            <Study />
          </Route>
          <Route path={`${url}new`}>
            <CreateDeck />
          </Route>
          <Route path={`${url}:deckId/edit`}>
            <EditDeck />
          </Route>
          <Route exact={true} path={`${url}:deckId`}>
            <Deck updateDecks={updateDecks} />
          </Route>
          <Route path={`${url}:deckId/cards/:cardId/edit`}>
            <CardTemplate setting="edit" />
          </Route>
          <Route path={`${url}:deckId/cards/new`}>
            <CardTemplate setting='add' />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default Layout;
