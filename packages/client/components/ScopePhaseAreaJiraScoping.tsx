import graphql from 'babel-plugin-relay/macro'
import React from 'react'
import {createFragmentContainer} from 'react-relay'
import {ScopePhaseAreaJiraScoping_meeting} from '../__generated__/ScopePhaseAreaJiraScoping_meeting.graphql'
import JiraScopingSearchBar from './JiraScopingSearchBar'
import JiraScopingSearchResultsRoot from './JiraScopingSearchResultsRoot'
interface Props {
  meeting: ScopePhaseAreaJiraScoping_meeting
}

const ScopePhaseAreaJiraScoping = (props: Props) => {
  const {meeting} = props
  const {teamId, jiraSearchQuery} = meeting
  const {queryString} = jiraSearchQuery
  return (
    <>
      <JiraScopingSearchBar meeting={meeting} />
      <JiraScopingSearchResultsRoot teamId={teamId} queryString={queryString} isJQL={false} meeting={meeting} />
    </>
  )
}

export default createFragmentContainer(ScopePhaseAreaJiraScoping, {
  meeting: graphql`
    fragment ScopePhaseAreaJiraScoping_meeting on PokerMeeting {
      ...JiraScopingSearchBar_meeting
      ...JiraScopingSearchResults_meeting
      teamId
      jiraSearchQuery {
        queryString
      }
    }
  `
})
