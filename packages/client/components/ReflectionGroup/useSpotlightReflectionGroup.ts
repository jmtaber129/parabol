import useSpotlightResults from '~/hooks/useSpotlightResults'
import {useMemo} from 'react'
import {ReflectionGroup_reflectionGroup} from '~/__generated__/ReflectionGroup_reflectionGroup.graphql'
import {ReflectionGroup_meeting} from '~/__generated__/ReflectionGroup_meeting.graphql'
import useSpotlightVisibleReflections from './useSpotlightVisibleReflections'

const useSpotlightReflectionGroup = (
  meeting: ReflectionGroup_meeting,
  reflectionGroup: ReflectionGroup_reflectionGroup,
  isBehindSpotlight: boolean,
  reflectionIdsToHide?: string[] | null
) => {
  const {spotlightGroup, spotlightSearchQuery} = meeting
  const spotlightGroupId = spotlightGroup?.id
  const {reflections, id: reflectionGroupId} = reflectionGroup
  const isSpotlightSrcGroup = spotlightGroupId === reflectionGroupId
  const isSpotlightOpen = !!spotlightGroupId
  const spotlightResultGroups = useSpotlightResults(meeting)
  const visibleReflections = useSpotlightVisibleReflections(
    reflections,
    spotlightSearchQuery,
    reflectionIdsToHide
  )
  const isRemoteSpotlightSrc = useMemo(
    () => !!visibleReflections.find(({remoteDrag}) => remoteDrag?.isSpotlight),
    [visibleReflections]
  )
  const disableDrop = useMemo(() => {
    const isViewerDraggingResult = !!spotlightResultGroups?.find(({reflections}) =>
      reflections?.find(({isViewerDragging}) => isViewerDragging)
    )
    return isSpotlightOpen
      ? (isViewerDraggingResult && !isSpotlightSrcGroup) || isBehindSpotlight // prevent grouping results into results
      : isRemoteSpotlightSrc // prevent dropping onto animating remote source
  }, [spotlightResultGroups, isSpotlightSrcGroup, isBehindSpotlight, isRemoteSpotlightSrc])
  return {isRemoteSpotlightSrc, disableDrop, visibleReflections}
}

export default useSpotlightReflectionGroup
