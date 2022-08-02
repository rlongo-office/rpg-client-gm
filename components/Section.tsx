import * as React from 'react'
import { StatSection } from '../types/rpg-types'
import { getObjValue } from '../components/DataTable/TableBody/utils'
//This is a no-no so we need a type of Creature. So refactor this with a Creature type
interface AnyObject {
  [key: string]: any
}

type props = {
  section: StatSection
  record: AnyObject
}

function Section({ section, record }: props) {
  console.log('DataSection called')
  React.useEffect(() => {
  }, [])
  return (
    <div id={section.name}>
      {section.fields.map((row: any, rowIndex: number) => (
        <a key={rowIndex}>{`${row.label}: ${getObjValue(record, row.path, 0)}`}</a>
      ))}
    </div>
  )
}

export default Section
