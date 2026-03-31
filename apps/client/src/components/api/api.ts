const api_Url = import.meta.env.VITE_API_URL;
export const apiCreate = async <T>(title: T) => {
  console.log(JSON.stringify(title));
  const res = await fetch(`${api_Url}/dashboard/createdocument`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(title),
    credentials: "include",
  });
  if (!res) {
    throw new Error("Document creation failed");
  }
  return;
};
export const apiJoin = async <T>(data: T) => {
  const res = await fetch(`${api_Url}/joindocument`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  console.log("api 2");
  if (!res) {
    throw new Error("Operation failed");
  }
  return;
};
export const apiMessage = async <T>(data: T) => {
  await fetch(`${api_Url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};
export const apiSave = async <T>(data: T) => {
  await fetch(`${api_Url}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
};
export const apiShow = async () => {
  console.log("hesdllo");
  const res = await fetch(`${api_Url}/showdocument`, {
    method: "GET",
    headers: { "content-type": "application/json" },
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Api error");
  }
  const data = await res.json();
  console.log("hello" + data);
  return data;
};
