import * as React from 'react'
import { styleObj } from '../../styles/styles'
import * as uiTypes from '../../types/blue-print'
import UIData from './ui-data'
import UILoopSection from './ui-loop-section'

function UISection(section: uiTypes.UISectionObj) {
  return (
    <div style={styleObj[`${section.style}`]}>
      {section?.label.length > 0 && <div>{section.label}</div>}
      {section?.child?.map((obj: any, rowIndex: number) =>
        obj.type === 'section' ? (
          <UISection {...obj} />
        ) : obj.type === 'section-loop-top' ? (
          <UILoopSection {...obj}></UILoopSection>
        ) : (
          <UIData {...obj}></UIData>
        )
      )}
    </div>
  )
}

export default UISection
