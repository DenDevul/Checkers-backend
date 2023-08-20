import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.CONNECTION_STRING);

const email = process.env.EMAIL,
  password = process.env.PASSWORD;
if (!email || !password) throw new Error('Auth for pocket base not provided!');

try {
  const authData = await pb.admins.authWithPassword(email, password);
} catch (error) {
  console.error(error);
  process.exit(1);
}

pb.autoCancellation(false);

export default pb;
