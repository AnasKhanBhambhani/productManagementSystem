import type { MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { redirect } from "react-router";
export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};
export const loader = ()=>{
  return redirect('/home')
}
export default function Index() {
  return (
    <>
     <Outlet/>
    </>
  );
}
