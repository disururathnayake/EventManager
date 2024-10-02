const { expect } = require('chai');
const { getAllUsers, deleteUser } = require('../controllers/adminController');
const User = require('../models/adminModel');
const { ObjectId } = require('mongodb');

describe('Admin Controller - getAllUsers', () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
  });

  it('should return 500 if there is an error fetching users', (done) => {
    // Mock the model to simulate an error
    User.findAllUsers = function (callback) {
      callback(new Error('Database error'), null);
    };

    getAllUsers(req, res);

    expect(res.statusCode).to.equal(500);
    expect(res.body).to.have.property('message', 'Error fetching users');
    done();
  });

  it('should return 200 and the users list if successful', (done) => {
    // Mock the model to return a fake users list
    User.findAllUsers = function (callback) {
      callback(null, [{ _id: '1', name: 'John Doe' }, { _id: '2', name: 'Jane Doe' }]);
    };

    getAllUsers(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);
    expect(res.body[0]).to.have.property('name', 'John Doe');
    done();
  });
});

describe('Admin Controller - deleteUser', () => {
  let req, res;

  beforeEach(() => {
    req = { params: {} };
    res = {
      status: function (statusCode) {
        this.statusCode = statusCode;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
  });

  it('should return 400 if the user ID is invalid', (done) => {
    req.params.id = 'invalid-id';

    deleteUser(req, res);

    expect(res.statusCode).to.equal(400);
    expect(res.body).to.have.property('message', 'Invalid user ID format');
    done();
  });

  it('should return 500 if there is an error deleting the user', (done) => {
    req.params.id = '5f50c31b7f2b8b2b4c6f55d2'; // Valid ObjectId
    User.deleteUserById = function (id, callback) {
      callback(new Error('Database error'), null);
    };

    deleteUser(req, res);

    expect(res.statusCode).to.equal(500);
    expect(res.body).to.have.property('message', 'Error deleting user');
    done();
  });

  it('should return 404 if the user does not exist', (done) => {
    req.params.id = '5f50c31b7f2b8b2b4c6f55d2'; // Valid ObjectId
    User.deleteUserById = function (id, callback) {
      callback(null, { deletedCount: 0 });
    };

    deleteUser(req, res);

    expect(res.statusCode).to.equal(404);
    expect(res.body).to.have.property('message', 'User not found');
    done();
  });

  it('should return 200 if the user is successfully deleted', (done) => {
    req.params.id = '5f50c31b7f2b8b2b4c6f55d2'; // Valid ObjectId
    User.deleteUserById = function (id, callback) {
      callback(null, { deletedCount: 1 });
    };

    deleteUser(req, res);

    expect(res.statusCode).to.equal(200);
    expect(res.body).to.have.property('message', 'User deleted successfully');
    done();
  });
});
