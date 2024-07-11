import { Link, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="h-screen overflow-hidden">
        <div className="flex flex-col justify-center border-b-2 border-gray-400 p-2 ">
            <Link to={"/"}><div className="text-center font-bold text-3xl">Home</div></Link>
        </div>
        <div className="flex flex-col min-h-screen pt-40 items-center ">
            <div className="bg-gray-200 w-1/2 h-1/2 rounded-md p-4 shadow-xl">
                <h1 className="text-4xl font-semibold">Oops!</h1>
                <p className="text-xl ">Sorry, an unexpected error has occurred.</p>
                <p>
                    <i>Error Code: {error.statusText || error.message}</i>
                </p>
                <Link to={"/"} className="">
                    <div className="mt-4 mx-4 p-2 bg-gray-400 rounded-full text-center font-semibold text-3xl italic shadow-lg">Click here to return home</div>
                </Link>
            </div>
        </div>
    </div>
  );
}