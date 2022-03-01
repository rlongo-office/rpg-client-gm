import * as React from 'react'
import InnerPageNav from './InnerPageNav'

interface InputProps {
  pageNums: number
  setCurrentPage: Function
}

interface NavProps {
  numPages: number
  tableSpan: number
  setCurrentPage: Function
  page: number
  lowerBound: number
  upperBound: number
}

function NewPageNavBar({
  numPages,
  tableSpan,
  setCurrentPage,
  page,
  lowerBound,
  upperBound,
}: NavProps) {
  const [btnText, setBtnText] = React.useState<object>({ text: '1', id: '1' })
  const [current, setCurrent] = React.useState(0)
  const start = '˂˂'
  const down = '˂'
  const up = '˃'
  const end = '˃˃'
  const ellipsis = '…'
  const num = numPages
  const cur = current
  const span = tableSpan
  const seq = [1, 2, 3, 4, 5, 6, 7, 8]

  const pageHandler = (e: any) => {
    setBtnText({ text: e.target.innerText, id: e.target.id })
  }
  const pageMutator = (e: any) => {
    if (!isNaN(e.target.innerText)) {
      setCurrentPage(Number(e.target.innerText))
      setCurrent(Number(e.target.innerText))
    } else {
      switch (e.target.id) {
        case 'start':
          setCurrentPage(1)
          break
        case 'down':
          setCurrent(current == 1 ? 1 : current - 1)
          console.log('down arrow page:' + current)
          setCurrentPage(current)
          break
        case 'up':
          setCurrent(current === numPages ? numPages : current + 1)
          setCurrentPage(current)
          break
        case 'end':
          setCurrentPage(numPages)
          break
      }
    }
  }

  /**
   * @See InnerPageNav
   */

  React.useEffect(() => {
    setCurrentPage(1)
  }, [])

  React.useEffect(() => {
    console.log(current)
  }, [page, numPages])

  React.useEffect(() => {
    if (btnText) {
      setCurrentPage(btnText)
    }
  }, [btnText])

  return (
    <div className="PageNavBar">
      <button id="start" onClick={pageHandler} className="pageBox" key={'start'}>
        {start}
      </button>
      <button id="down" onClick={pageHandler} className="pageBox" key={'down'}>
        {down}
      </button>
      <InnerPageNav
        lowerBound={lowerBound}
        upperBound={upperBound}
        num={numPages}
        span={tableSpan}
        cur={page}
        pageHandler={pageHandler}
      />
      <button id="up" onClick={pageHandler} className="pageBox" key={'up'}>
        {up}
      </button>
      <button id="end" onClick={pageHandler} className="pageBox" key={'end'}>
        {end}
      </button>
    </div>
  )
}

export default NewPageNavBar

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
