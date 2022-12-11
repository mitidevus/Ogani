module.exports = {
  type: 'object',
  properties: {
    fullname: { type: 'string', 'minLength': 1 },
    email: { type: 'string', format: 'email' },
    address: {type: 'string', 'minLength':6},
    password: { type: 'string', 'minLength': 3 },
  },
  required: ['fullname', 'email', 'address', 'password'],
  additionalProperties: false,
};