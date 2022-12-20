import { redirect } from "@remix-run/node";

export const laoder = ({ params }: { params: { [key: string]: string } }) => {
  if (params["*"] === "exp") {
    return redirect("/expenses");
  }

  throw new Response("Not found", { status: 404 });
};
