'user strict'

// $.method('user.add').call({
//     name: 'hello2',
//     email: 'hello@email.com',
//     password: '123456',
//     nickname: 'Hello',
//     about: 'Hello Hello'
// }, console.log);
//
// $.method('user.get').call({
//     name: 'hello',
// }, console.log);

$.method('user.update').call({
    name: 'hello',
    nickname: 'hello world',
}, console.log);