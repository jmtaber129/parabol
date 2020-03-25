import styled from '@emotion/styled'
import React from 'react'
import {PALETTE} from '../styles/paletteV2'
import Icon from './Icon'
import PlainButton from './PlainButton/PlainButton'
import {MeetingSettingsThreshold} from 'types/constEnums'

interface Props {
  increase(): void
  decrease(): void
  value: number
}

const Wrapper = styled('div')({
  alignItems: 'center',
  display: 'flex',
  paddingLeft: 16
})

const Stepper = styled(PlainButton)<{isDisabled: boolean}>(({isDisabled}) => ({
  borderRadius: '100%',
  boxShadow: '0px 1px 1px 1px rgba(0,0,0,0.3)',
  height: 24,
  opacity: isDisabled ? 0.35 : undefined
}))

const Value = styled('span')({
  color: PALETTE.TEXT_MAIN_DARK,
  display: 'flex',
  width: 34,
  justifyContent: 'center'
})

const VoteStepper = (props: Props) => {
  const {increase, decrease, value} = props
  const canDecrease = value > 1
  const canIncrease = value < MeetingSettingsThreshold.RETROSPECTIVE_TOTAL_VOTES_MAX

  return (
    <Wrapper>
      <Stepper isDisabled={!canDecrease} onClick={decrease}>
        <Icon>remove</Icon>
      </Stepper>
      <Value>{value}</Value>
      <Stepper isDisabled={!canIncrease} onClick={increase}>
        <Icon>add</Icon>
      </Stepper>
    </Wrapper>
  )
}

export default VoteStepper
