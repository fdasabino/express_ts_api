interface User {
  id: number;
  name: string;
  email: string;
  job: string;
}

const users: User[] = [
  { id: 1, name: "Dexter Morgan", job: "Forensics Analist", email: "dexthekiller@me.com" },
  {
    id: 2,
    name: "Debra Morgan",
    job: "Captain",
    email: "debrathecop@me.com",
  },
];

export const createUserService = async (
  name: string,
  job: string,
  email: string,
): Promise<User> => {
  return new Promise((resolve, reject) => {
    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      reject(new Error("User already exists..."));
      return;
    }

    const newUser: User = {
      id: users.length + 1,
      name,
      job,
      email,
    };

    users.push(newUser);
    resolve(newUser);
  });
};
