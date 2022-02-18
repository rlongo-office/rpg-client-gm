import * as React from 'react'
import creatures from '../data/collections/creatures.json'
import {iterateObjEntries,getObjValue,setObjValue,createObjID} from '../components/DataTable/TableBody/utils'
import { useAppContext } from '../context/AppProvider';
import {deepCopy} from '../components/DataTable/TableBody/utils'

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
    let {actors,setActors} = useAppContext()

    const [currentRecord, setCurrentRecord] = React.useState<object>([]);  //create Context Variable for this
    const [recordPaths, setRecordPaths] = React.useState<string[]>([])
    const [inputValues,setInputValues] = React.useState<object>({})

    const createActor = ()=>{
      let actor:any = deepCopy(source)
      Object.entries(inputValues).forEach(([key,value])=>{
        setObjValue(actor,key,value)
      })
      setInputValues({})
      setActors([...actors,createObjID(actors, actor)])
    }

    const storeInput = (event:any)=>{
      if (event.key === "Enter") {
        event.preventDefault();
        let inputUpdate:AnyObject = inputValues
        inputUpdate[event.target.id] = event.target.value
        setInputValues(inputUpdate)
        console.log(inputUpdate)
      }
      console.log(inputValues)
    }

    const renderInputForm =(record:object)=>{
        let content: JSX.Element[] = []
        let inputLabels:Array<string> = []
        iterateObjEntries("",record,inputLabels)
        inputLabels.forEach((path:string)=>{
            let labelText = path.toUpperCase()
            let labelProps:Object = {className:"InputLabel",key:`label-${path}`} //id:`${attr}-${idCount}`}
            let inputProps:Object = {id:`${path}`,
                                    key:`input-${path}`, 
                                    placeholder: getObjValue(record,path,"none"),
                                    onKeyPress:storeInput,
                                    type: 'text',
                                    autoFocus: true } //,id:`${attr}`}
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
        let inputLabels:Array<string> = []
        iterateObjEntries("",source,inputLabels)
        setRecordPaths(inputLabels)   //will need this array of paths for later use
        setCurrentRecord(source)
    },[source])

    return (
      <>
      <button onClick={createActor}>Create Actor</button>
      <div className="InputPage inputStriped">
         {renderInputForm(source)}
      </div>
      </>  
    );
}

export default TableInputForm;