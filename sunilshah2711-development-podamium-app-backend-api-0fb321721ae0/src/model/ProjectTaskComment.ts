import { Model } from 'objection'
import objectionSoftDelete from 'objection-js-soft-delete'
import { User } from './User';

const softDelete = objectionSoftDelete({
  columnName: 'deleted_at',
  deletedValue: new Date(),
  notDeletedValue: null,
});

export class ProjectTaskComment extends softDelete(Model) {
  static tableName = 'project_task_comments'

  id: number
  uuid: string
  project_id: number
  user_id: number
  task_id: number
  workspace_id: number
  comment: string
  updated_by: number
  deleted_by: number
  deleted_at: string

  static relationMappings = {
    created_by: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      filter: query => query.select('name as user'),
      join: {
        from: 'project_task_comments.user_id',
        to: 'user.id'
      }
    }
  }
}