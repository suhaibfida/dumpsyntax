interface Signup {
  username: string;
  email: string;
  password: string;
}
export const signup = async (data: Signup) => {
  const res = await fetch("/signup", {
    method: "POST",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res) {
    throw new Error("Signup failed");
  }
  return;
};
