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

    function handleChange(event: any){      //Seems overly complicated for taking the event object
        const { name, value } = event.target
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
            //value=""
            onChange={handleChange}
            ></input>
      </div>  
    );
}

export default SearchInput;