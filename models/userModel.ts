const database = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
    role: "admin",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
    role: "user",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
    role: "user",
  },
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (user) {
      return user;
    }
  },

  createOne: (name: string, id: number) => {
    const newUser = {
      id: id,
      name: name,
      email: "",
      password: "",
      role: "user"
    }
    database.push(newUser)
  },

  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    if (user) {
      return user;
    }
  },

  findAdmin: (id: number) => {
    const user = database.find((user) => user.id === id)
    if (user) {
      return user.role;
    }
  }
};

export { database, userModel };
