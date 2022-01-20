import * as React from 'react'

interface InputProps {
    pageNums: number
    setCurrentPage: Function
}

interface NavProps {
    numPages: number
    tableSpan: number
    setCurrentPage: Function
  }

function PageNavBar(
    {
        numPages,
        tableSpan,
        setCurrentPage
    }:NavProps
) {
    const [current, setCurrent] = React.useState(0);

    function pageHandler(event: any){      //Seems overly complicated for taking the event object
        const { name, value } = event
       if (!(isNaN(event.target.innerText))){
            console.log("page number picked")
            setCurrentPage(Number(event.target.innerText))
            setCurrent(Number(event.target.innerText))
        } else{
          console.log("page symbol picked")  
          switch(event.target.id){
              case "start": setCurrentPage(0); break;
              case "down": setCurrent(current == 0 ? 0 : current -1);
                           setCurrentPage(current); 
                           break;
              case "up": setCurrent(current == numPages ? numPages : current + 1);
                         setCurrentPage(current); 
                         break;
              case "end": setCurrentPage(numPages); break      
          }   
        }
    }

    const generatePageNav = () => {
        let content = [];
        let start = "˂˂"
        let down = "˂"
        let up = "˃"
        let end ="˃˃"
        let ellipsis = "…"
        const num = numPages
        const cur = current
        const span = tableSpan
        console.log(`"numPages: " ${num} "cur: " ${cur} "span: "${span}`)
        content.push(<button id="start" onClick={pageHandler} className="pageBox" key={"start"}>{start}</button>);
        content.push(<button id="down" onClick={pageHandler} className="pageBox" key={"down"}>{down}</button>);
        if (num <= span || cur <= Math.round(span/2)){
            let upperBound = num <= span ? num : span
            for (let i=0;i<upperBound; i++) {
                content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
            }
        } else {
            let lowerBound = cur - (Math.round(span/2)-1)
            let upperBound = cur + Math.round(span/2)
            for (let i=lowerBound;i<upperBound; i++) {
                content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
            }
        }
        if (num > span && cur < (num-span)){
            content.push(<button className="pageBox" key={"ellipsis"}>{ellipsis}</button>);
        }
        content.push(<button id="up" onClick={pageHandler} className="pageBox" key={"up"}>{up}</button>);
        content.push(<button id="end" onClick={pageHandler} className="pageBox" key={"end"}>{end}</button>);
        return content;
      };


    return (
        <div className="PageNavBar">  
            {generatePageNav()}
        </div> 
    );
}

export default PageNavBar;