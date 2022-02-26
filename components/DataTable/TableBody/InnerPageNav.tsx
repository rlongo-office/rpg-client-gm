import * as React from 'react'

interface InnerNavProps {
    lowerBound: number
    upperBound: number
    num:number
    span:number
    cur:number
    pageHandler: React.MouseEventHandler
  }


function InnerPageNav(
    {
    lowerBound,
    upperBound,
    num,
    span,
    cur,
    pageHandler
    }:InnerNavProps
){
    const ellipsis = "…"
    let content = [];
    //console.log(`"numPages: " ${num} "cur: " ${cur} "span: "${span}`)

    if (num <= span || cur <= Math.round(span/2)){
        upperBound = num <= span ? num : span
        for (let i=1;i<=upperBound; i++) {
            content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
        }
    } else {
        lowerBound = cur <= (num-span) ? cur - (Math.round(span/2)-1) : num - span
        upperBound = cur <= (num-span) ? cur + Math.round(span/2) : num
        for (let i=lowerBound;i<=upperBound; i++) {
            content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
        }
    }
    if (num > span && upperBound < num){
        content.push(<button className="pageBox" key={"ellipsis"}>{ellipsis}</button>);
    }

    return (<div>
        </div>)

}

export default InnerPageNav;