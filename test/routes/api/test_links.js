const assert = require('assert');
const HttpStatus = require('http-status-codes');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/links', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['cohorts', 'meetings', 'links', 'users']);
    testSession = session(app);
  });

  describe('GET /', () => {
    it('returns a list of Links for a Meeting', async () => {
      /// request user list
      const response = await testSession
        .get('/api/links?meetingId=1')
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK);
      assert(response.body?.length, 2);

      const sections = response.body;
      assert.strictEqual(sections[0].desc, 'Introductions and Kickoff');
    });
  });

  describe('GET /:id', () => {
    it('returns the Link specified by the id', async () => {
      const response = await testSession
        .get('/api/links/1')
        .set('Accept', 'application/json')
        .expect(HttpStatus.OK);
      assert(response.body);
      
      const section = response.body;
      assert.strictEqual(section.desc, 'Introductions and Kickoff');
    });
  });

  context('authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'admin.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new Link', async () => {
        const response = await testSession
          .post('/api/links')
          .set('Accept', 'application/json')
          .send({
            MeetingId: 1,
            position: 3,
            type: "OTHER",
            href: "https://test.com",
            desc: "Link 3"
          })
          .expect(HttpStatus.CREATED);
        assert(response.body.id);
        
        const link = await models.Link.findByPk(response.body.id);
        assert.strictEqual(link.MeetingId, 1);
        assert.strictEqual(link.position, 3);
        assert.strictEqual(link.type, "OTHER");
        assert.strictEqual(link.href, "https://test.com");
        assert.strictEqual(link.desc, "Link 3");
      });
    });

    describe('PATCH /:id', () => {
      it('updates an existing Link specified by id', async () => {
        const link = await models.Link.findByPk(1);
        assert.strictEqual(link.MeetingId, 1);
        assert.strictEqual(link.position, 1);
        assert.strictEqual(link.type, "SLIDES");
        assert.strictEqual(link.href, "https://via.placeholder.com/150");
        assert.strictEqual(link.desc, "Introductions and Kickoff");

        const response = await testSession
          .patch('/api/links/1')
          .set('Accept', 'application/json')
          .send({
            MeetingId: 2,
            position: 3,
            type: "OTHER",
            href: "https://test.com",
            desc: "Last"
          })
          .expect(HttpStatus.OK);
        
        await link.reload();
        assert.strictEqual(link.MeetingId, 1); // MeetingId should not be allowed to change in edit
        assert.strictEqual(link.position, 3);
        assert.strictEqual(link.type, "OTHER");
        assert.strictEqual(link.href, "https://test.com");
        assert.strictEqual(link.desc, "Last");
      });
    });

    describe('DELETE /:id', () => {
      it('deletes an existing Link specified by id', async () => {
        const response = await testSession
          .delete('/api/links/1')
          .set('Accept', 'application/json')
          .expect(HttpStatus.OK);
        
        const link = await models.Link.findByPk(1);
        assert.strictEqual(link, null);
      });
    });
  });
});
