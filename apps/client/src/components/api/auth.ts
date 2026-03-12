interface Signup {
  username: string;
  email: string;
  password: string;
}
interface Login {
  usernameOrEmail: string;
  password: string;
}
const api_Url = import.meta.env.VITE_API_URL;
console.log("HELLO" + api_Url);

export const signup = async (data: Signup) => {
  console.log(data);
  const res = await fetch(`${api_Url}/signup`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(res);
  if (!res) {
    throw new Error("Signup failed");
  }
  return;
};

export const login = async (data: Login) => {
  const res = await fetch(`${api_Url}/login`, {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  console.log(res + "hello");
  if (!res) {
    throw new Error("Signup failed");
  }
  return res;
};
