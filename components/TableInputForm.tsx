import * as React from 'react'
import creatures from '../data/collections/creatures.json'
import {iterateObjEntries,getObjValue} from '../components/DataTable/TableBody/utils'

interface AnyObject {
    [key: string]: any
  }

interface AnyObjArray extends Array<AnyObject>{}

interface props {
    index: number
    source: any
}

function TableInputForm(
  {
      index,
      source
  }:props    

) {

    
    const [currentRecord, setCurrentRecord] = React.useState<Object>([]);


    const renderInputForm =()=>{
        let content: JSX.Element[] = []
        const inputObj = currentRecord
        let inputLabels:Array<string> = []
        iterateObjEntries("",inputObj,inputLabels)
        //Get array of paths to all entries in Object
        //Iterate through each path
        let idCount = 0
        inputLabels.forEach((attr:string)=>{
            let labelProps:Object = {key:`label-${attr}-${idCount}`} //id:`${attr}-${idCount}`}
            let inputProps:Object = {key:`input-${attr}-${idCount}`, placeholder: getObjValue(inputObj,attr,"none"), type: 'text', autoFocus: true } //,id:`${attr}`}
            //console.log(attr)
            let labelEL = React.createElement("span",labelProps,attr)
            content.push(labelEL)
            //let inputEL = React.createElement("input",inputProps,getObjValue(inputObj,attr,"none"))
            let inputEl = React.createElement('input',inputProps); 
            content.push(inputEl)
            //console.log(attr + getObjValue(inputObj,attr,"none"))
        })
        return content;
    }
    
    React.useEffect(()=>{
        setCurrentRecord(source[index])
    },[])


    return (
      <div className="InputPage inputStriped">
         {renderInputForm()}
      </div>  
    );
}

export default TableInputForm;