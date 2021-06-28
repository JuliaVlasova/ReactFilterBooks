import React from 'react';
import PropTypes from 'prop-types';

function FilterBooksPrices(props) {
    const pricesFiltered = props.pricesForFilter.map((price) => {
      return (
        <div className="filterPrices" key={price}>  
            <form>
              <input type="checkbox" id={price} name={price} value={price} onChange={() => props.inputChange(price)}/>
              <label htmlFor={price}>{price}</label>
            </form>
        </div>
      );
  });
  return pricesFiltered;
}

FilterBooksPrices.propTypes = {
  inputChange: PropTypes.func.isRequired
}

export default FilterBooksPrices;
