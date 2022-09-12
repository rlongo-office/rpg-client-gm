import * as React from 'react'

interface InputProps {
  setParentFilter: Function
}

function SearchInput({ setParentFilter }: InputProps) {
  const [filter, setFilter] = React.useState('')

  function handleInput(event: any) {
    const { name, value } = event.target
    setFilter(value)
  }

  React.useEffect(() => {
    setParentFilter(filter)
  }, [filter, setParentFilter])

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
  )
}

export default SearchInput
