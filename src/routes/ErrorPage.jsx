import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="p-8 text-center">
      <h1 className="text-2xl font-bold text-red-600">Oops! Something went wrong.</h1>
      <p className="mt-4 text-gray-600">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;
