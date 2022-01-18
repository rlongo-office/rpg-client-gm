import * as React from 'react'

interface InputProps {
    pageNums: number
}


function PageNavBar(
    {
        pageNums
    }:InputProps
) {
    const [curPages, setCurPages] = React.useState(0);

    const generatePageNav = (num:number) => {
        let content = [];
        console.log("generating Page Nav with " + num)
        for (let i=0;i<num; i++) {
          content.push(<span className="pageBox" key={i}>{i}</span>);
          console.log("Page" + i)
        }
        return content;
      };


    return (
        <div className="PageNavBar">  
            {generatePageNav(pageNums)}
        </div> 
    );
}

export default PageNavBar;