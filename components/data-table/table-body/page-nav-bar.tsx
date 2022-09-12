import * as React from 'react'

interface NavProps {
  numPages: number
  tableSpan: number
  setCurrentPage: Function
  page: number
}

function PageNavBar({ numPages, tableSpan, setCurrentPage, page }: NavProps) {
  const [current, setCurrent] = React.useState(0)
  const start = '<<'
  const down = '<'
  const up = '>'
  const end = '>>'
  const ellipsis = '…'
  const num = numPages
  const cur = current
  const span = tableSpan

  function pageHandler(event: any) {
    if (!isNaN(event.target.innerText)) {
      setCurrentPage(Number(event.target.innerText))
      setCurrent(Number(event.target.innerText))
    } else {
      switch (event.target.id) {
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

  // TOD: just move this into either a new component or within the JSX (view) layer of this component
  const generatePageNav = () => {
    let content = []
    let upperBound
    let lowerBound

    content.push(
      <button id="start" onClick={pageHandler} className="pageBox" key={'start'}>
        {start}
      </button>
    )
    content.push(
      <button id="down" onClick={pageHandler} className="pageBox" key={'down'}>
        {down}
      </button>
    )
    if (num <= span || cur <= Math.round(span / 2)) {
      upperBound = num <= span ? num : span
      for (let i = 1; i <= upperBound; i++) {
        content.push(
          <button onClick={pageHandler} className="pageBox" key={i}>
            {i}
          </button>
        )
      }
    } else {
      lowerBound = cur <= num - span ? cur - (Math.round(span / 2) - 1) : num - span
      upperBound = cur <= num - span ? cur + Math.round(span / 2) : num
      for (let i = lowerBound; i <= upperBound; i++) {
        content.push(
          <button onClick={pageHandler} className="pageBox" key={i}>
            {i}
          </button>
        )
      }
    }
    if (num > span && upperBound < num) {
      content.push(
        <button className="pageBox" key={'ellipsis'}>
          {ellipsis}
        </button>
      )
    }
    content.push(
      <button id="up" onClick={pageHandler} className="pageBox" key={'up'}>
        {up}
      </button>
    )
    content.push(
      <button id="end" onClick={pageHandler} className="pageBox" key={'end'}>
        {end}
      </button>
    )
    return content
  }

  React.useEffect(() => {
    setCurrentPage(1)
  }, [setCurrentPage])

  return <div className="PageNavBar">{generatePageNav()}</div>
}

export default PageNavBar
