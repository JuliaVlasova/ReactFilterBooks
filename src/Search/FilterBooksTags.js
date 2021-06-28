import React from 'react';
import PropTypes from 'prop-types';

function FilterBooksTags(props, inputChange) {
    const tagsFiltered = props.tagsForFilter.map((tag) => {
      return (
        <div className="filterTags" key={tag}>
            <form>
                <input type="checkbox" id={tag} name={tag} value={tag} onChange={() => props.inputChange(tag)} />
                <label htmlFor={tag}>{tag}</label>
            </form>  
        </div>
      );
    });
    return tagsFiltered;
}

FilterBooksTags.propTypes = {
  inputChange: PropTypes.func.isRequired
}

export default FilterBooksTags;
