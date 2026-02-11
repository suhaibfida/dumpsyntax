interface Create {
  data: string;
}
export const ApiCreate = async (data: Create) => {
  const res = await fetch(
    "http://localhost:3000/api/v1/dashboard/createdocument",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    },
  );
  if (!res) {
    throw new Error("Document creation failed");
  }
  return;
};
export const ApiJoin = async (data: Create) => {
  const res = await fetch("http://localhost:3000/api/v1/joindocument", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res) {
    throw new Error("Operation failed");
  }
  return;
};
