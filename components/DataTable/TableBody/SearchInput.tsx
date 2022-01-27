import * as React from 'react'

interface InputProps {
    setParentFilter: Function
}

function SearchInput(
    {
        setParentFilter
    }:InputProps
) {

    const [filter, setFilter] = React.useState("");

    function handleInput(event: any){      //Seems overly complicated for taking the event object
        const { name, value } = event.target
        //setParentFilter(filter)
        setFilter(value)
    }

    React.useEffect(() => {
        setParentFilter(filter)
      },[filter]);

    return (
      <div>
          <input 
            type="text" 
            name="filter"
            className="tableInput"
            //value=""
            onInput={handleInput}
            ></input>
      </div>  
    );
}

export default SearchInput;