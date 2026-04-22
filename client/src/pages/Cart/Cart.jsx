import React from 'react'
import { handwarmerList } from '../../assets/assets'
import './Cart.css'

const Cart = ({ currentUser, users, setUsers }) => {

  // If no one is logged in
  if (!currentUser) {
    return (
      <div className="cart">
        <h2>Please log in to view your cart.</h2>
      </div>
    );
  }

  const placed = currentUser.hand_warmers_placed;

  // Beginner-style addPlaced
  const addPlaced = (itemId) => {
    setUsers(prev => {
      const updatedUsers = [...prev];

      for (let i = 0; i < updatedUsers.length; i++) {
        if (updatedUsers[i].id === currentUser.id) {

          let found = false;

          for (let j = 0; j < updatedUsers[i].hand_warmers_placed.length; j++) {
            if (updatedUsers[i].hand_warmers_placed[j].itemId === itemId) {
              updatedUsers[i].hand_warmers_placed[j].quantity_placed =
                updatedUsers[i].hand_warmers_placed[j].quantity_placed + 1;
              found = true;
            }
          }

          if (!found) {
            updatedUsers[i].hand_warmers_placed.push({
              itemId: itemId,
              name: "",
              quantity_placed: 1
            });
          }
        }
      }

      return updatedUsers;
    });
  };

  // Beginner-style removePlaced
  const removePlaced = (itemId) => {
    setUsers(prev => {
      const updatedUsers = [...prev];

      for (let i = 0; i < updatedUsers.length; i++) {
        if (updatedUsers[i].id === currentUser.id) {

          for (let j = 0; j < updatedUsers[i].hand_warmers_placed.length; j++) {
            if (updatedUsers[i].hand_warmers_placed[j].itemId === itemId) {

              if (updatedUsers[i].hand_warmers_placed[j].quantity_placed === 1) {
                updatedUsers[i].hand_warmers_placed.splice(j, 1);
              } else {
                updatedUsers[i].hand_warmers_placed[j].quantity_placed =
                  updatedUsers[i].hand_warmers_placed[j].quantity_placed - 1;
              }
            }
          }
        }
      }

      return updatedUsers;
    });
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>

      {placed.length === 0 ? (
        <h3>Your cart is empty.</h3>
      ) : (
        placed.map((p) => {
          let fullItem = null;
          for (let i = 0; i < handwarmerList.length; i++) {
            if (handwarmerList[i].id === p.itemId) {
              fullItem = handwarmerList[i];
            }
          }

          if (!fullItem) return null;

          return (
            <div key={p.itemId} className="cart-item">
              <img
                src={fullItem.hand_warmer_image}
                alt={fullItem.hand_warmer_name}
              />

              <div className="cart-info">
                <h2>{fullItem.hand_warmer_name}</h2>
                <p>Price: $40</p>

                <div className="quantity-controls">
                  <button onClick={() => addPlaced(p.itemId)}>+</button>
                  <span>{p.quantity_placed}</span>
                  <button onClick={() => removePlaced(p.itemId)}>-</button>
                </div>

                <p>Total: ${40 * p.quantity_placed}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Cart;
