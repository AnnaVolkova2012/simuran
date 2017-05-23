import request from 'supertest-as-promised'
import { masterKey } from '../../config'
import express from '../../services/express'
import routes, { News } from '.'

const app = () => express(routes)

let news

beforeEach(async () => {
  news = await News.create({})
})

test('POST /news 201 (master)', async () => {
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, date: 'test', title: 'test', content: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.date).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('POST /news 401', async () => {
  const { status } = await request(app())
    .post('/')
  expect(status).toBe(401)
})

test('GET /news 200', async () => {
  const { status, body } = await request(app())
    .get('/')
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /news/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`/${news.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(news.id)
})

test('GET /news/:id 404', async () => {
  const { status } = await request(app())
    .get('/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /news/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`/${news.id}`)
    .send({ access_token: masterKey, date: 'test', title: 'test', content: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(news.id)
  expect(body.date).toEqual('test')
  expect(body.title).toEqual('test')
  expect(body.content).toEqual('test')
})

test('PUT /news/:id 401', async () => {
  const { status } = await request(app())
    .put(`/${news.id}`)
  expect(status).toBe(401)
})

test('PUT /news/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, date: 'test', title: 'test', content: 'test' })
  expect(status).toBe(404)
})

test('DELETE /news/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`/${news.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /news/:id 401', async () => {
  const { status } = await request(app())
    .delete(`/${news.id}`)
  expect(status).toBe(401)
})

test('DELETE /news/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
