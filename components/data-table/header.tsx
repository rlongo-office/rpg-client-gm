import * as React from 'react'

type HeaderProps = {
  row: Object
}

export default function Header({ row }: HeaderProps) {
  return Object.keys(row).map(k => (
    <span className="cellStyle" key={`row-${k}`}>
      {k}
    </span>
  ))
}
