import React from 'react'
import './Item.css'
import { handwarmerList } from '../../assets/assets'
import { useParams } from 'react-router-dom'

const Item = ({ currentUser, users, setUsers, setCurrentUser }) => {

  const { id } = useParams();
  const item = handwarmerList.find(i => i.id === Number(id));


  if (!item) {
    return <div></div>;
  }

const addPlaced = () => {
  if (!currentUser) {
    alert("Please log in first");
    return;
  }

  setUsers(prev => {
    const updatedUsers = [...prev];

    // loop through all users
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].id === currentUser.id) {

        let found = false;

        // loop through placed items
        for (let j = 0; j < updatedUsers[i].hand_warmers_placed.length; j++) {
          if (updatedUsers[i].hand_warmers_placed[j].itemId === item.id) {
            updatedUsers[i].hand_warmers_placed[j].quantity_placed =
              updatedUsers[i].hand_warmers_placed[j].quantity_placed + 1;
            found = true;
          }
        }

        // if item wasn't found, add it
        if (!found) {
          updatedUsers[i].hand_warmers_placed.push({
            itemId: item.id,
            name: item.hand_warmer_name,
            quantity_placed: 1
          });
        }
      }
    }

    return updatedUsers;
  });
};

const removePlaced = () => {
  if (!currentUser) {
    alert("Please log in first");
    return;
  }

  setUsers(prev => {
    const updatedUsers = [...prev];

    // loop through all users
    for (let i = 0; i < updatedUsers.length; i++) {
      if (updatedUsers[i].id === currentUser.id) {

        // loop through placed items
        for (let j = 0; j < updatedUsers[i].hand_warmers_placed.length; j++) {
          if (updatedUsers[i].hand_warmers_placed[j].itemId === item.id) {

            // if quantity is 1, remove item
            if (updatedUsers[i].hand_warmers_placed[j].quantity_placed === 1) {
              updatedUsers[i].hand_warmers_placed.splice(j, 1);
            } else {
              // otherwise decrease quantity
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
    <div className='item-display'>
      <div className='left-pane'>
        <img className='left-arrow' src="" alt="" />
        <img className='display-image' src={item.hand_warmer_image} alt={item.hand_warmer_name} />
        <img className='right-arrow' src="" alt="" />
      </div>
      <div className='vertical-bar'></div>
      <div className='right-pane'>
        <div className="name">Name: {item.hand_warmer_name}</div>
        <div className="description">Description: {item.hand_warmer_desc}</div>
        <div className="price">Price: $40</div>
        <div className="quantity">Quantity Available: {item.hand_warmer_quantity}</div>
        <div className="toggle-amount">
          <div className="add" onClick={addPlaced}>+</div>
          <div className="add">{/* show quantity here later */}</div>
          <div className="add" onClick={removePlaced}>-</div>
        </div>
      </div>

    </div>
  )
}

export default Item
