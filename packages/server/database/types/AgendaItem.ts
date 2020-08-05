import shortid from 'shortid'

export interface AgendaItemInput {
  id?: string
  commenter?: any
  createdAt?: Date
  isActive?: boolean
  isComplete?: boolean
  sortOrder?: number
  teamId: string
  teamMemberId: string
  updatedAt?: Date
  content: string
  meetingId?: string
  pinned?: boolean
  pinnedParentId?: string
}

export default class AgendaItem {
  id: string
  commenter?: any
  content: string
  createdAt: Date
  isActive: boolean
  isComplete: boolean
  sortOrder: number
  teamId: string
  teamMemberId: string
  updatedAt: Date
  meetingId?: string
  pinned?: boolean
  pinnedParentId?: string

  constructor(input: AgendaItemInput) {
    const {
      id,
      commenter,
      createdAt,
      isActive,
      isComplete,
      sortOrder,
      teamId,
      teamMemberId,
      updatedAt,
      content,
      meetingId,
      pinned,
      pinnedParentId
    } = input
    const now = new Date()
    this.id = id || shortid.generate()
    this.commenter = commenter
    this.createdAt = createdAt || now
    this.isActive = isActive ?? true
    this.isComplete = isComplete ?? false
    this.sortOrder = sortOrder || 0
    this.teamId = teamId
    this.teamMemberId = teamMemberId
    this.updatedAt = updatedAt || now
    this.content = content || ''
    this.meetingId = meetingId
    this.pinned = pinned
    this.pinnedParentId = pinnedParentId
  }
}
