import React, { useState } from 'react'
import { handwarmerList } from '../../assets/assets'
import './Products.css'
import { Link } from 'react-router-dom'
import NavBar from '../../components/NavBar/NavBar'

const Products = () => {
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedPattern, setSelectedPattern] = useState([]);
  const [quantityOrdered, setQuantityOrdered] = useState([
    handwarmerList.reduce((acc, item) => {
      acc[item.id] = 0;
      return acc;
    }, {})
  ])

  const handleColourChange = (colour) => {
    setSelectedColours(prev => prev.includes(colour) ? prev.filter(c => c !== colour) : [...prev, colour]
    );
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterials(prev => prev.includes(material) ? prev.filter(c => c !== material) : [...prev, material])
  }

  const handlePatternChange = (pattern) => {
    setSelectedPattern(prev => prev.includes(pattern) ? prev.filter(c => c !== pattern) : [...prev, pattern])
  }

  const filterHandWarmers = handwarmerList.filter(item => {
    const itemColours = item.hand_warmer_materials.map(m => m.colour.toLowerCase());
    const itemPattern = item.hand_warmer_style.toLowerCase();
    const itemMaterials = item.hand_warmer_materials.flatMap(m => m.distribution.map(d => d.material.toLowerCase()));

    const matchesColour =
      selectedColours.length === 0 ||
      selectedColours.some(col => itemColours.includes(col));

    const matchesMaterial =
      selectedMaterials.length === 0 ||
      selectedMaterials.some(mat => itemMaterials.includes(mat));

    const matchesPattern =
      selectedPattern.length === 0 ||
      selectedPattern.some(mat => itemPattern.includes(mat));

    return matchesColour && matchesMaterial && matchesPattern;
  });


  return (

    <>

      <div className='products-elements'>


        <div className="filter">
          <h3>Colour</h3>
          <ul className='colour-options'>
            <li><input type="checkbox" onChange={() => handleColourChange("red")} />Red</li>
            <li><input type="checkbox" onChange={() => handleColourChange("denim fleck")} />Denim fleck</li>

            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("dusted rose")}
              />
              Dusted Rose
            </li>

            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("light green")}
              />
              Light Green
            </li>
            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("brown")}
              />
              Brown
            </li>
            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("dark green")}
              />
              Dark Green
            </li>
            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("cinnamon")}
              />
              Cinnamon
            </li>
            <li>
              <input
                type="checkbox"
                onChange={() => handleColourChange("pink")}
              />
              Pink
            </li>
          </ul>
          <h3>Style</h3>
          <ul className='style-options'>
            <li>
              <input
                type="checkbox"
                onChange={() => handlePatternChange("striped")}
              />
              Striped
            </li>
            <li>
              <input
                type="checkbox"
                onChange={() => handlePatternChange("solid")}
              />
              Solid
            </li>
          </ul>
          <h3>Material</h3>
          <ul className='material-options'>

            <li><input type="checkbox" onChange={() => handleMaterialChange("cotton")} /> Cotton</li>
            <li><input type="checkbox" onChange={() => handleMaterialChange("wool")} /> Wool</li>
            <li><input type="checkbox" onChange={() => handleMaterialChange("acrylic")} /> Acrylic</li>
            <li><input type="checkbox" onChange={() => handleMaterialChange("merino wool")} /> Superwash Merino</li>
            <li><input type="checkbox" onChange={() => handleMaterialChange("polyester")} /> Polyester</li>
            <li><input type="checkbox" onChange={() => handleMaterialChange("tweed")} /> Tweed</li>
          </ul>
        </div>

        <div className='products' id='products'>

          <h1>Explore a variety of hand warmers</h1>

          <div className='hand-warmers-list'>
            {filterHandWarmers.map((item, index) => {
              console.log('PRODUCT MAP → index:', index, 'id:', item.id, 'name:', item.hand_warmer_name);
              return (
                <div  key={index} className='hand-warmer-item'>
                  <img className="hand-warmer-image" src={item.hand_warmer_image} alt="" />
                  <Link to={`/item/${item.id}`} className="hand-warmer-name">{item.hand_warmer_name}</Link>
                  <div className="adjust-amount">
                    <div className='add'>+</div>
                    <div className='quantity-ordered'></div>
                    <div className='remove'>-</div>
                  </div>
                </div>
              )
            })}
          </div>

        </div>

      </div>

    </>
  )
}

export default Products
