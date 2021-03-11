import app from './src/app.js';
import { logger } from './src/utils/logger.js';
import { notFound, errorHandler } from './src/middleware/error.middleware.js'

app.use(notFound)
app.use(errorHandler)

const PORT = app.get('port');

app.listen(PORT, () => {
    logger.success(`Server running in ${process.env.NODE_ENV} on port ${PORT}`);
});
