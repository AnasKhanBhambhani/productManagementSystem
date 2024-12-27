import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { AppSidebar } from "../components/app-sidebar";
import { json, Outlet,} from "@remix-run/react";
import { requireUserSession } from "../session.server";
export const meta: MetaFunction = () => {
    return [
        { title: "New Remix App" },
        { name: "description", content: "Welcome to Remix!" },
    ];
};
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserSession(request);
    return json({ message: `Welcome user ${userId}` });
};
export default function Dashboard() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
            </main>
            <Outlet />
        </SidebarProvider>
    );
}
