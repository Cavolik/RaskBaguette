import { app } from './app';
import { connectToMongoDB } from './database';
import { User } from "./models/user";
import { hashPassword } from "./utils/authUtils";


void (async function startup() {
  try {
    await connectToMongoDB();
    const exists = await User.exists({userName: 'admin'});
    if(exists === null){
      void (await User.create({firstName: 'Admin', lastName: 'User', userName: 'admin', password: hashPassword('admin')}));
    }
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  } catch (error: unknown) {
    console.error(error);
    process.exit(1);
  }
})();
