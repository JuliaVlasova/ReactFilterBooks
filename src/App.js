import React, {useState} from 'react';
import FilterBooksTags from './Search/FilterBooksTags';
import FilterBooksPrices from './Search/FilterBooksPrices';
import ShowBooks from './Search/ShowBooks';
import Collapsible from 'react-collapsible';

function App() {
  const pricesForFilter = ['< $10','$10 – $20','> $20'];
  const tagsForFilter = ['javascript','fundamentals','advanced','css','accessibility','svg','architecture'];
  const authorNames = [
    {
      id: "a1", 
      name: "K. Simpson"
    },
    {
      id: "a2", 
      name: "H. Pickering"
    },
    {
      id: "a3", 
      name: "S. Drasner"
    },
    {
      id: "a4", 
      name: "L. Verou"
    },
    {
      id: "a5", 
      name: "M. Haverbeke"
    },
    {
      id: "a6", 
      name: "M. Geers"
    }
  ];
  
  const tagsInitialState = tagsForFilter.map((tag) => {
    return {
    name: tag, 
    selected: false
    };
  });

  const pricesInitialState = pricesForFilter.map((price) => {
    return {
    name: price, 
    selected: false
    };
  });

  const [activeTags, setActiveTags] = useState(tagsInitialState);
  const [activePrices, setActivePrices] = useState(pricesInitialState);

  function filterChangeTags(tag) {
    let newState = JSON.parse(JSON.stringify(activeTags));
    for(let tagObject in newState) {
      if(newState[tagObject].name === tag) {
        newState[tagObject].selected = !newState[tagObject].selected;
      }
    } 
    setActiveTags(newState);
	}

  function filterChangePrices(price) {
    let newState = JSON.parse(JSON.stringify(activePrices));
    
    for(let tagObject in newState) {
      if(newState[tagObject].name === price) {
        newState[tagObject].selected = !newState[tagObject].selected;
      }
    } 
    setActivePrices(newState); 
  }

  return (
    <div>
      <div className="wrapper">
        <h1 className="heading">Filter Books Project</h1>
      </div>
      
      <div className="filter">
        <div className="wrapper wrapper_filter">
          <div className="filter__section filter__section_tags">
            <Collapsible trigger="Tags" easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}>
              <FilterBooksTags tagsForFilter={tagsForFilter} inputChange={filterChangeTags} />
            </Collapsible>
          </div>
          <div className="filter__section">
            <Collapsible trigger="Price"  easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'} triggerTagName="div">
              <FilterBooksPrices pricesForFilter={pricesForFilter} inputChange={filterChangePrices} />
            </Collapsible>
          </div>
        </div>
      </div>
      <div className="wrapper">
        <div className="books-wrapper">
          <ShowBooks tags={activeTags} prices={activePrices} author={authorNames} />
        </div>
      </div>
    </div>
      
  );
}

export default App;
