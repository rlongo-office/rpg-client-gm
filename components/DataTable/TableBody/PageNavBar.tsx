import * as React from 'react'

interface InputProps {
    pageNums: number
    setCurrentPage: Function
}


function PageNavBar(
    {
        pageNums,
        setCurrentPage
    }:InputProps
) {
    const [curPages, setCurPages] = React.useState(0);

    function pageHandler(event: any){      //Seems overly complicated for taking the event object
        const { name, value } = event
        console.log(event)
       if (!(isNaN(event.target.innerText))){
            console.log("page number picked")
            setCurrentPage(Number(event.target.innerText))
        } else{
          console.log("page symbol picked")  
          switch(event.target.id){
              case "start": setCurrentPage(0); break;
              case "down": setCurrentPage(0); break;
              case "up": setCurrentPage(5); break;
              case "end": setCurrentPage(5); break      
          }   
        }
    }


    const generatePageNav = (num:number) => {
        let content = [];
        let start = "˂˂"
        let down = "˂"
        let up = "˃"
        let end ="˃˃"
        content.push(<button id="start" onClick={pageHandler} className="pageBox" key={"start"}>{start}</button>);
        content.push(<button id="down" onClick={pageHandler} className="pageBox" key={"down"}>{down}</button>);
        for (let i=0;i<num; i++) {
          content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
        }
        content.push(<button id="up" onClick={pageHandler} className="pageBox" key={"up"}>{up}</button>);
        content.push(<button id="end" onClick={pageHandler} className="pageBox" key={"end"}>{end}</button>);
        return content;
      };


    return (
        <div className="PageNavBar">  
            {generatePageNav(pageNums)}
        </div> 
    );
}

export default PageNavBar;