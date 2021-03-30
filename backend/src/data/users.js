import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Manh Tien',
        email: 'manhtien@gmail.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    }
]

export default users
