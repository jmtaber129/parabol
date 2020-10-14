import {GraphQLID, GraphQLInt, GraphQLNonNull} from 'graphql'
import {SubscriptionChannel} from 'parabol-client/types/constEnums'
import getRethink from '../../database/rethinkDriver'
import {getUserId, isTeamMember} from '../../utils/authorization'
import publish from '../../utils/publish'
import standardError from '../../utils/standardError'
import TemplateScaleInput from '../types/TemplateScaleInput'
import UpdatePokerTemplateScaleValuePayload from '../types/UpdatePokerTemplateScaleValuePayload'
import {
  validateColorValue,
  validateScaleLabel,
  validateScaleValue
} from './helpers/validateScaleValue'

const updatePokerTemplateScaleValue = {
  description: 'Update a scale value for a scale in a poker template',
  type: new GraphQLNonNull(UpdatePokerTemplateScaleValuePayload),
  args: {
    scaleId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    scaleValue: {
      type: new GraphQLNonNull(TemplateScaleInput)
    },
    index: {
      type: GraphQLInt
    }
  },
  async resolve(
    _source,
    {scaleId, scaleValue, index},
    {authToken, dataLoader, socketId: mutatorId}
  ) {
    const r = await getRethink()
    const now = new Date()
    const operationId = dataLoader.share()
    const subOptions = {operationId, mutatorId}
    const viewerId = getUserId(authToken)

    // AUTH
    const scale = await r
      .table('TemplateScale')
      .get(scaleId)
      .run()
    if (!scale || scale.removedAt) {
      return standardError(new Error('Did not find an active scale'), {userId: viewerId})
    }
    if (!isTeamMember(authToken, scale.teamId)) {
      return standardError(new Error('Team not found'), {userId: viewerId})
    }

    // VALIDATION
    const endIndex = scale.values.length - 1
    if (index > endIndex || index < 0) {
      return standardError(new Error('Invalid index'), {userId: viewerId})
    }
    const {color, label, value, isSpecial} = scaleValue
    if (isSpecial && (label || value)) {
      return standardError(new Error('Cannot update the label or value for a special scale'), {
        userId: viewerId
      })
    }
    if (!validateColorValue(color)) {
      return standardError(new Error('Invalid scale color'), {userId: viewerId})
    }
    if (label && !validateScaleLabel(label)) {
      return standardError(new Error('Invalid scale label'), {userId: viewerId})
    }
    if (value && !validateScaleValue(value)) {
      return standardError(new Error('Invalid scale value'), {userId: viewerId})
    }

    await r
      .table('TemplateScale')
      .get(scaleId)
      .update((row) => ({
        values: row('values').changeAt(index || endIndex, scaleValue),
        updatedAt: now
      }))
      .run()

    const data = {scaleId}
    publish(
      SubscriptionChannel.TEAM,
      scale.teamId,
      'UpdatePokerTemplateScaleValuePayload',
      data,
      subOptions
    )
    return data
  }
}

export default updatePokerTemplateScaleValue
