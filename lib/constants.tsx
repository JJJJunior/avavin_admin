import {LayoutDashboard, Shapes, ShoppingBag, Tag, Users} from "lucide-react";

export const navLinks = [
  {
    url: "/dashboard",
    icon: <LayoutDashboard/>,
    label: "Dashboard",
  },
  {
    url: "/dashboard/collections",
    icon: <Shapes/>,
    label: "Collections",
  },
  {
    url: "/dashboard/products",
    icon: <Tag/>,
    label: "Products",
  },
  {
    url: "/dashboard/orders",
    icon: <ShoppingBag/>,
    label: "Orders",
  },
  {
    url: "/dashboard/customers",
    icon: <Users/>,
    label: "Customers",
  },
];
