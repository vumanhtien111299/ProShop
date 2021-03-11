import dotenv from 'dotenv'

let path = ''
switch (process.env.NODE_ENV) {
    case 'development':
        path = '.env.development.local'
    case 'production':
        path = '.env.production.local'
    default:
        path = '.env.development.local'
}

dotenv.config({ path: '.env' })
