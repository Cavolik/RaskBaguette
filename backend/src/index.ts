import { app } from './app';
import { connectToMongoDB } from './database';

void (async function startup() {
  try {
    await connectToMongoDB();
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
})();
