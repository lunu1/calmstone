import 'dotenv/config';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI, { dbName: 'calmstone' });

  const email = 'admin@site.com';
  const password = 'admin123';

  let admin = await Admin.findOne({ email });
  if (!admin) {
    admin = new Admin({ email, password, name: 'Admin', role: 'admin', isAdmin: true });
    await admin.save(); // triggers pre-save hash
    console.log('[SEED] created', admin._id.toString());
  } else {
    admin.password = password; // reset + re-hash
    await admin.save();
    console.log('[SEED] password reset for', email);
  }

  await mongoose.disconnect();
};

run().catch((e) => { console.error(e); process.exit(1); });
