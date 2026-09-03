import { seedUsers } from "../lib/seed";

seedUsers()
  .then((users) => {
    console.log("Seeded demo users:", users.map((u: any) => `${u.name} <${u.email}>`).join(", "));
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
