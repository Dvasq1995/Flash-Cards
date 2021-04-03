import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { deleteCard } from '../utils/api/index';

function Card({ id, front, back, updateCards }) {
  const { url } = useRouteMatch();

  const handleDeleteCard = async () => {
    const cardToDelete = window.confirm(
      'Delete this card? \n \n You will not be able to recover it.',
    );
    if (cardToDelete) {
      await deleteCard(id);
      updateCards(-1);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p className="card-text" style={{ flex: '1', marginRight: '15px' }}>
              {front}
            </p>
            <p className="card-text" style={{ flex: '1' }}>
              {back}
            </p>
          </div>
          <div
            className="d-flex justify-content-end"
            style={{ marginTop: '20px' }}
          >
            <Link
              to={`${url}/cards/${id}/edit`}
              className="btn btn-secondary"
              style={{ marginRight: '10px' }}
            >
              Edit
            </Link>
            <button className="btn btn-danger" onClick={handleDeleteCard}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
