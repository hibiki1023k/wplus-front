async function getToken() {
  try {
    const token_response = await fetch("/api/getCookie", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!token_response.ok) {
      throw new Error("Token not found", token_response.status);
    }
    const token = await token_response.json();
    console.log("Token Received", token);
    return token;
  } catch (error) {
    console.log("Error fetching data", error);
  }
}

export default async function Request(path, method, bodyInfo) {
  const body = bodyInfo && JSON.stringify({ ...bodyInfo });
  const headers = {
    "Content-Type": "application/json",
  };

  if (path !== "login" && path !== "getCookie") {
    const token = await getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(`/api/${path}/`, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method !== "GET" && method !== "DELETE" ? body : undefined,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Request Error:", error);
    return { error: error.message || "Unknown error occurred" };
  }
}
