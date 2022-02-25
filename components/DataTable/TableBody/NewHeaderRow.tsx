import * as React from 'react'

interface colSortObj {
  col: boolean,
  dir: number
}

interface AnyObject {
  [key: string]: any
}

interface headerConfig {
  row: Array<string>,
  colSortState: { col: boolean, dir: number }[]
  sortColumn: Function
}

function HeaderRow(
  config: headerConfig
) {
  const [colSortArray, setColSortArray] = React.useState<colSortObj[]>([]);

  // TODO: this isn't doing anything. Remember the config is not state based but rather a prop. Only state triggers useEffect's except for the default useEffect.
  // React.useEffect(() => {
  //   setColSortArray(config.colSortState)
  // }, [config.colSortState])
  const ascChar = " ˄"
  const descChar = " ˅"  

  const sortTable = (event: any) => {
    const columnKey = event.target.innerText.slice(0, -2)    //slice off the "˄" and "˅" characters
    const columnID = parseInt(event.target.id)
    config.sortColumn(columnKey, columnID)
  }
  /*
  const renderHeader = () => {
    if (config.row != null && config.colSortState.length > 0 ) {
      let content: JSX.Element[] = [];

      let colID = 0
      //const columns = Object.keys(config.row);
      config.row.forEach((key) => {
        let colText = key
        let elProps: AnyObject = {className: "cellStyle", key: `cell-${key}`, id: `${colID}`}
        if (config.colSortState[colID].col) {
          elProps["onClick"] = sortTable
        }
        colText += config.colSortState[colID].dir > 0 ? ascChar : descChar
        let spanEL = React.createElement("span", elProps, colText)
        content.push(
          spanEL
        )
        colID += 1
      })
      return content;
    }
  }
  */
  return (
    <div id="header-row" className="headerRow rowStyle">
      {
      config.row && 
      config.row.map((colName, colIndex)=>{
            return(
                <span
                className={'cellStyle'}
                id={`col-id-${colIndex}`}
                key={`col-key-${colIndex}`}
                onClick={sortTable}
              >
                {colName += config.colSortState[colIndex].dir > 0 ? ascChar : descChar}
              </span>
            )
      })  
      }
    </div>
  )
}

export default HeaderRow;
