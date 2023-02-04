const request = require('supertest');
const app = require('./index');

describe('Blog API', () => {
  describe('Create blog post', () => {
    it('should return 401 if user is not logged in', (done) => {
      request(app)
        .post('/api/blog/create')
        .send({ title: 'Test Blog', description: 'Test Description' })
        .expect(401, done);
    });

    it('should return 201 and the created blog if user is logged in', (done) => {
      // Login to get the JWT token
      request(app)
        .post('/api/user/login')
        .send({ email: 'email1@test.com', password: 'password1' })
        .end((err, res) => {
          if (err) return done(err);
        
          const token = res.body;
          // Create the blog post
          request(app)
            .post('/api/blog/create')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Blog', description: 'Test Description' })
            .expect(201)
            .end(done);
        });
    });
  });

  describe('Update blog', () => {
    it('should return 401 if user is not logged in', (done) => {
      request(app)
        .put('/api/blog/update/91b6613c-70eb-486b-b068-f7f16f50dd69')
        .send({ title: 'Test Blog', description: 'Test Description' })
        .expect(401, done);
    });    
    it('should return 200 and the updated blog if user is logged in', (done) => {
      // Login to get the JWT token
      request(app)
        .post('/api/user/login')
        .send({ email: 'email1@test.com', password: 'password1' })
        .end((err, res) => {
          if (err) return done(err);
        
          const token = res.body;
          // Update the blog post
          request(app)
            .put('/api/blog/update/91b6613c-70eb-486b-b068-f7f16f50dd69')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Test Blog', description: 'Test Description' })
            .expect(200)
            .end(done);
        });
    });
  });
  
  describe('Delete blog', () => {
    it('should return 401 if user is not logged in', (done) => {
        request(app)
            .delete('/api/blog/delete/91b6613c-70eb-486b-b068-f7f16f50dd69')
            .expect(401, done);
    });
    it('should return 200 and the deleted blog if user is logged in', (done) => {
        // Login to get the JWT token
        request(app)
            .post('/api/user/login')
            .send({ email : 'email1@test.com', password : 'password1' })
            .end((err, res) => {
                if (err) return done(err);
                
                const token = res.body;
                // Delete the blog post
                request(app)
                    .delete('/api/blog/delete/91b6613c-70eb-486b-b068-f7f16f50dd69')
                    .set('Authorization', `Bearer ${token}`)
                    .expect(200)
                    .end(done);
            }
        );
    });
    });
});

