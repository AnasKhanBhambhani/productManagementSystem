import type { MetaFunction } from "@remix-run/node";
export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};

export default function Product() {
    return (
        <div className=" my-16 w-full h-full max-w-[1500px] mx-auto mr-5 bg-orange-400">
products
     </div>
    );
}
