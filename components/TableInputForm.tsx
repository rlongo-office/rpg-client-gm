import * as React from 'react'
import creatures from '../data/collections/creatures.json'
import {iterateObjEntries,getObjValue} from '../components/DataTable/TableBody/utils'

interface AnyObject {
    [key: string]: any
  }

interface props {
    source: object
}

function TableInputForm(
  {
    source
  }:props    

) {

    const [currentRecord, setCurrentRecord] = React.useState<object>([]);
    const [recordPaths, setRecordPaths] = React.useState<string[]>([])

    const renderInputForm =(record:object)=>{
        let content: JSX.Element[] = []
        let inputLabels:Array<string> = []
        iterateObjEntries("",record,inputLabels)
        let idCount = 0
        inputLabels.forEach((attr:string)=>{
            let labelText = attr.toUpperCase()
            let labelProps:Object = {className:"InputLabel",key:`label-${attr}-${idCount}`} //id:`${attr}-${idCount}`}
            let inputProps:Object = {key:`input-${attr}-${idCount}`, placeholder: getObjValue(record,attr,"none"), type: 'text', autoFocus: true } //,id:`${attr}`}
            //console.log(attr)
            let labelEL = React.createElement("span",labelProps,labelText)
            content.push(labelEL)
            //let inputEL = React.createElement("input",inputProps,getObjValue(inputObj,attr,"none"))
            let inputEl = React.createElement('input',inputProps); 
            content.push(inputEl)
            //console.log(attr + getObjValue(inputObj,attr,"none"))
        })
        return content;
    }
    
    React.useEffect(()=>{
        window.scrollTo(0, 0)
    },[source])

    return (
      <div className="InputPage inputStriped">
         {renderInputForm(source)}
      </div>  
    );
}

export default TableInputForm;