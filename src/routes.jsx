// Import necessary components and functions from react-router-dom.

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Contact } from "./pages/Contact";
import { AddContact } from "./pages/AddContact";
import { CreateUser } from "./pages/CreateUser";
import { ShowUsers } from "./pages/ShowUsers";
import { ContactCard } from "./pages/ContactCard";

export const router = createBrowserRouter(
    createRoutesFromElements(
    // CreateRoutesFromElements function allows you to build route elements declaratively.
    // Create your routes here, if you want to keep the Navbar and Footer in all views, add your new routes inside the containing Route.
    // Root, on the contrary, create a sister Route, if you have doubts, try it!
    // Note: keep in mind that errorElement will be the default page when you don't get a route, customize that page to make your project more attractive.
    // Note: The child paths of the Layout element replace the Outlet component with the elements contained in the "element" attribute of these child paths.

      // Root Route: All navigation will start from here.
      <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >

        {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
        
        <Route path="/" element={<ShowUsers />} />
        <Route path="/createuser" element={<CreateUser />} />
        <Route path="/contact/agendas/:slug/contacts" element={<Contact />} />
        <Route path= "/card" element={<ContactCard />} />
        <Route path="/contact/agendas/:slug/add" element={<AddContact />} />
        <Route path="/contact/agendas/:slug/edit/:id" element={<AddContact />} />
        
      </Route>
    )
);