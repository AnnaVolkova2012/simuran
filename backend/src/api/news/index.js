import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export News, { schema } from './model'

const router = new Router()
const { date, title, content } = schema.tree

/**
 * @api {post} /news Create news
 * @apiName CreateNews
 * @apiGroup News
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date News's date.
 * @apiParam title News's title.
 * @apiParam content News's content.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ date, title, content }),
  create)

/**
 * @api {get} /news Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiUse listParams
 * @apiSuccess {Object[]} news List of news.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /news/:id Retrieve news
 * @apiName RetrieveNews
 * @apiGroup News
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /news/:id Update news
 * @apiName UpdateNews
 * @apiGroup News
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam date News's date.
 * @apiParam title News's title.
 * @apiParam content News's content.
 * @apiSuccess {Object} news News's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 News not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ date, title, content }),
  update)

/**
 * @api {delete} /news/:id Delete news
 * @apiName DeleteNews
 * @apiGroup News
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 News not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
