const request = require('supertest')

const app = require('../app')

describe('GET /', () => {
  test('GET / => index page of websites', () => {
    return request(app)
      .get('/')
      .expect('Content-Type', /html/)
      .expect(200)
  })
})

describe('Get /artists', () => {
  test('Get /artists => list of artists', () => {
    return request(app).get('/artists')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            [expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              avatar: expect.any(String),
              bio: expect.any(String)
            })]
          ))
      })
  })
})

describe('Get /artist/0', () => {
  test('Get /artist/0 => Get information of artist with id 0', async () => {
    return request(app).get('/artist/0')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 0,
            name: expect.any(String),
            avatar: expect.any(String),
            bio: expect.any(String)
          })
        )
      })
  })
})

describe('Get /artists', () => {
  test('Get /artists => list of artists', () => {
    return request(app).get('/artists')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            [expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
              avatar: expect.any(String),
              bio: expect.any(String)
            })]
          ))
      })
  })
})
describe('Get /artworks', () => {
  test('Get /artworks => list of artworks', () => {
    return request(app).get('/artworks')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            [expect.objectContaining({
              id: 0,
              author_id: expect.any(Number),
              url: expect.any(String)
            })]
          ))
      })
  })

  test('Get /artworks/by/author/{authorId} => list of artworks of specified author', () => {
    return request(app).get('/artworks/by/author/0')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining(
            [expect.objectContaining({
              id: 0,
              author_id: 0,
              url: expect.any(String)
            })]
          ))
      })
  })
})

describe('Get /artwork', () => {
  test('Get /artwork/0 => Get information of artwork with id 0', async () => {
    return request(app).get('/artwork/0')
      .expect(200)
      .expect('Content-type', /json/).then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: 0,
            author_id: expect.any(Number),
            url: expect.any(String)
          })
        )
      })
  })
})

describe('Post /artist', () => {
  test('Post /artist => create a new artist', () => { })
})
describe('Post /artwork', () => {
  test('POST /artwork => create a new artwork', () => {

    // request(app)
    //     .post('/artwork')

    //     // Item send code

    //     .send({
    //         author_id: 0,
    //         url: ''
    //     })

    //     .expect('Content-Type', /json/)

    //     .expect(201)

    //     .then((response) => {
    //         expect(response.body).toEqual(
    //         )
    //     })
  })
})
