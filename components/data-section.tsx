import * as React from 'react'
//This is a no-no so we need a type of Creature. So refactor this with a Creature type
interface AnyObject {
  [key: string]: any
}

function DataSection({ record }: AnyObject) {
  React.useEffect(() => {
    console.log('useEffect called')
  }, [])
  return (
    <div>
      <h1>{JSON.stringify(record)}</h1>
    </div>
  )
}

export default DataSection
