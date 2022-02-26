import * as React from 'react'
import InnerPageNav from './InnerPageNav';

interface InputProps {
  pageNums: number
  setCurrentPage: Function
}

interface NavProps {
  numPages: number
  tableSpan: number
  setCurrentPage: Function
  page: number
}

function NewPageNavBar(
  {
    numPages,
    tableSpan,
    setCurrentPage,
    page
  }: NavProps
) {
  const [current, setCurrent] = React.useState(0);
  const [lowerBound, setLowerBound] = React.useState<number>(1)
  const [upperBound, setUpperBound] = React.useState<number>(1)
  const start = "˂˂"
  const down = "˂"
  const up = "˃"
  const end = "˃˃"
  const ellipsis = "…"
  const num = numPages
  const cur = current
  const span = tableSpan
  const seq = [1, 2, 3, 4, 5, 6, 7, 8]

  const pageHandler = (event: any) => {

    if (!(isNaN(event.target.innerText))) {
      setCurrentPage(Number(event.target.innerText))
      setCurrent(Number(event.target.innerText))
    } else {
      switch (event.target.id) {
        case "start":
          setCurrentPage(1);
          break;
        case "down":
          setCurrent(current == 1 ? 1 : current - 1);
          console.log("down arrow page:" + current)
          setCurrentPage(current);
          break;
        case "up":
          setCurrent(current === numPages ? numPages : current + 1);
          setCurrentPage(current);
          break;
        case "end":
          setCurrentPage(numPages);
          break
      }
    }
  }

  const setBounds = () => {
    if (numPages <= tableSpan || current <= Math.round(tableSpan / 2)) {
      setLowerBound(1)
      setUpperBound(numPages <= tableSpan ? numPages : tableSpan)
    } else {
      setLowerBound(current <= (numPages - tableSpan) ? cur - (Math.round(tableSpan / 2) - 1) : numPages - tableSpan)
      setUpperBound(current <= (numPages - tableSpan) ? cur + Math.round(tableSpan / 2) : numPages)
    }
  }

  /**
   * @See InnerPageNav
   */
  // const generatePageNav = () => {
  //   let content = [];
  //   let upperBound
  //   let lowerBound
  //   //console.log(`"numPages: " ${num} "cur: " ${cur} "span: "${span}`)
  //   if (num <= span || cur <= Math.round(span / 2)) {
  //     upperBound = num <= span ? num : span
  //     for (let i = 1; i <= upperBound; i++) {
  //       content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
  //     }
  //   } else {
  //     lowerBound = cur <= (num - span) ? cur - (Math.round(span / 2) - 1) : num - span
  //     upperBound = cur <= (num - span) ? cur + Math.round(span / 2) : num
  //     for (let i = lowerBound; i <= upperBound; i++) {
  //       content.push(<button onClick={pageHandler} className="pageBox" key={i}>{i}</button>);
  //     }
  //   }
  //   if (num > span && upperBound < num) {
  //     content.push(<button className="pageBox" key={"ellipsis"}>{ellipsis}</button>);
  //   }
  //   return content;
  // };

  React.useEffect(() => {
    setCurrentPage(1)
    setBounds()
  }, [])

  React.useEffect(() => {
    console.log(current)
    setBounds()
  }, [current, numPages])

  return (
    <div className="PageNavBar">
      <button id="start" onClick={pageHandler} className="pageBox" key={"start"}>{start}</button>
      <button id="down" onClick={pageHandler} className="pageBox" key={"down"}>{down}</button>
      <InnerPageNav
        lowerBound={lowerBound}
        upperBound={upperBound}
        num={numPages}
        span={tableSpan}
        cur={current}
        pageHandler={pageHandler}
      />
      <button id="up" onClick={pageHandler} className="pageBox" key={"up"}>{up}</button>
      <button id="end" onClick={pageHandler} className="pageBox" key={"end"}>{end}</button>

    </div>
  );
}

export default NewPageNavBar;

/*
            {
                seq.map(num=>{
                    return (<button
                        onClick={pageHandler}
                        className="pageBox"
                        key={num}
                    >
                    {num}
                    </button> )
                })
            }
*/
