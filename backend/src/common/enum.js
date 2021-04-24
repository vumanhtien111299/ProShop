export const AWS_ACCESS_BUCKET = {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

export const BUCKET = process.env.AWS_BUCKET;

export const AWS_FOLDER = {
    IMAGE: 'image/',
    FILE: 'file/',
}

export const SMTP_CONFIG = {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT,
    SERVICE: process.env.SMTP_SERVICE,
    SECURE: true,
    AUTH: {
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASS,
    },
};

export const MAILER_FROM = `ProdShop`;
