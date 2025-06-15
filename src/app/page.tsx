"use client";

import { gql, useApolloClient, useQuery } from "@apollo/client";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const CHECK_AUTH = gql`
  query CheckAuth {
    checkAuth
  }
`;

export default function Home() {
  const { token, setToken } = useAuthStore();
  const { data, loading, error } = useQuery(CHECK_AUTH, {
    skip: !token,
  });
  const client = useApolloClient();

  const logout = () => {
    setToken(null);
    client.clearStore();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(
        "client cache",
        // @ts-expect-error (it's there)
        client.cache.data.data?.ROOT_QUERY?.checkAuth
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [client]);

  console.log("token", token, "user id", data?.checkAuth?.id);

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => setToken("user-1")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!token}
          >
            Login as user-1
          </button>
          <button
            onClick={() => setToken("user-2")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!token}
          >
            Login as user-2
          </button>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Logout
          </button>
          <button
            onClick={() =>
              client.cache.updateQuery({ query: CHECK_AUTH }, () => ({
                checkAuth: {
                  id: "user-3",
                },
              }))
            }
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!token}
          >
            Alter cache
          </button>
        </div>

        <div className="p-4 bg-gray-100 rounded text-gray-800">
          <h2 className="text-lg font-semibold mb-2">Auth Status:</h2>
          <p>State: {token ? "Connected" : "Not connected"}</p>
          <p>
            Query Result:{" "}
            {loading
              ? "Loading..."
              : error
              ? "Error"
              : JSON.stringify(data?.checkAuth)}
          </p>
        </div>
      </div>
    </main>
  );
}
