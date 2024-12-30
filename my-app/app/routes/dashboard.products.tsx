import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { Card } from "../components/ui/card";
// import banner from '../assets/download (1).jpeg';
import { fetchProducts } from "~/Apis/product";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import { Products } from "~/types/product";
import { Button } from "../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { requireUserSession } from "~/session.server";
import { useState } from "react";
export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const loader: LoaderFunction = async ({ request }) => {
    const data = await fetchProducts();
    const logStatus = await requireUserSession(request);
    const newData = {
        data: [...data],
        status: logStatus,
    }
    return json(newData);
}
export default function Product() {
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState<Products | null>(null);
    const data = useLoaderData<typeof loader>();
    const handleEdits = (item: Products) => {
        setSelectedProduct(item)
        navigate(`./edit`)
    }
    return (
        <div className=" my-16 w-full h-full max-w-[1500px] mx-auto mr-5">
            <h1 className=" text-center text-3xl my-10">Your Products</h1>
            <div className="flex flex-wrap  p-1 gap-7 justify-center">
                {data?.data.map((item: Products) => (
                    <Card key={item.id} className="bg-slate-100 text-center">
                        <div className=" flex justify-center m-2 rounded-lg">
                            <img src={item.ProductImage} alt="banner" width='200px' height='200px' className="rounded-lg" />
                        </div>
                        <div className="p-10 w-64">
                            <div className="col-span-2 text-lg font-bold capitalize rounded-md">
                                Name: {item.name}
                            </div>
                            <div className="col-span-2 rounded-md">
                                Description: {item.description}
                            </div>
                            <div className="col-span-2 rounded-md">
                                Price: {item.price}
                            </div>
                        </div>
                        {data?.status === 'admin' &&

                            <Dialog >
                                <DialogTrigger asChild>
                                    <Button variant="outline" onClick={() => { handleEdits(item) }}>Edit Product</Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]" onCloseAutoFocus={() => console.log("close called")}>
                                    <DialogHeader>
                                        <DialogTitle>Edit Product Profile</DialogTitle>
                                        <DialogDescription>
                                            Make changes to your profile here. Click save when you are done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <Form method="post">
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    defaultValue={selectedProduct?.name || ''}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Description
                                                </Label>
                                                <Input
                                                    id="description"
                                                    name="description"
                                                    defaultValue={selectedProduct?.description || ''}
                                                    className="col-span-3"
                                                />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="username" className="text-right">
                                                    Price
                                                </Label>
                                                <Input
                                                    id="price"
                                                    name="price"
                                                    defaultValue={selectedProduct?.price || ''}
                                                    className="col-span-3"
                                                />
                                            </div>
                                        </div>
                                    </Form>
                                    <DialogFooter>
                                        <Button type="submit">Save changes</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        }
                    </Card>
                ))}
            </div>
        </div>
    );
}
