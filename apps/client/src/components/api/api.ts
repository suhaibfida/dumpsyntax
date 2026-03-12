const api_Url = import.meta.env.VITE_API_URL;
export const apiCreate = async <T>(data: T) => {
  const res = await fetch(`${api_Url}/api/v1/dashboard/createdocument`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
  if (!res) {
    throw new Error("Document creation failed");
  }
  return;
};
export const apiJoin = async <T>(data: T) => {
  const res = await fetch(`${api_Url}/api/v1//joindocument`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });
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
  const res = await fetch(`${api_Url}/dashboard`, {
    method: "GET",
    credentials: "include",
  });
  const data = await res.json();
  return data;
};
