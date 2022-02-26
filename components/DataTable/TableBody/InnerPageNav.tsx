import * as React from 'react'

interface InnerNavProps {
  lowerBound: number
  upperBound: number
  num: number
  span: number
  cur: number
  pageHandler: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * This component represents the view layer of the page navigation action bar.
 * There's a lot of upper and lower bound computations in here along with some
 * utility functions that might need to be abstracted out to utils/page-nav-utils.ts
 * but for now this is fine.
 *
 * @param lowerBound
 * @param upperBound
 * @param num
 * @param span
 * @param cur
 * @param pageHandler
 * @constructor
 */
function InnerPageNav(
  {
    lowerBound,
    upperBound,
    num,
    span,
    cur,
    pageHandler
  }: InnerNavProps
) {
  // Utility functions (prior to render):
  const ellipsis = "…"
  const getLower = () => cur <= (num - span) ? cur - (Math.round(span / 2) - 1) : num - span
  const getUpper = () => cur <= (num - span) ? cur + Math.round(span / 2) : num

  /**
   * This is really just a wrapper (syntatical sugar) for initializing an array and filling it.
   *
   * @param size of array to initialize
   * @param fillVal defaults to undefined
   */
  const initArray = (size: number, fillVal: number | string | undefined = undefined) => {
    return new Array(size)
      .fill(fillVal)
  }

  /**
   * This function takes a start and end number and returns a range of numbers based on that.
   * Ex: start => 5 end => 12 would yield [5, 6, 7, 8, 9, 10, 11, 12]
   *
   * @param start of range
   * @param end of range
   */
  const range = (start: number, end: number): Array<number> => {
    return initArray(end - start + 1)
      .map((_, idx) => start + idx)
  }

  return (
    <>
      {
        // IF
        (num <= span || cur <= Math.round(span / 2)) ? (
          initArray(num <= span ? num : span)
            .map((val, idx) => (
              <button onClick={pageHandler} className="pageBox" key={`main-${idx}`}>
                {idx + 1}
              </button>
            ))
        ) : (
          // ELSE
          //range(getLower(), getUpper())
          range(lowerBound, upperBound)
            .map((val, idx) => (
              <button onClick={pageHandler} className="pageBox" key={`secondary-${idx}`}>
                {idx + 1}
              </button>
            ))
        )
      }
      {
        // IF
        (num > span && upperBound < num) &&
        <button className="pageBox" key={"ellipsis"}>{ellipsis}</button>
      }
    </>
  )
}

export default InnerPageNav;
