import { News } from '.'

let news

beforeEach(async () => {
  news = await News.create({ date: 'test', title: 'test', content: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = news.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.date).toBe(news.date)
    expect(view.title).toBe(news.title)
    expect(view.content).toBe(news.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = news.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(news.id)
    expect(view.date).toBe(news.date)
    expect(view.title).toBe(news.title)
    expect(view.content).toBe(news.content)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
