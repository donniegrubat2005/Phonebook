import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/pages/auth/Login.vue";
import Register from "./components/pages/auth/Register.vue";
import Home from "./components/pages/home/Home.vue";
import Dashboard from "./components/pages/home/Dashboard.vue";
import Contact from "./components/pages/contact/Contact.vue";
import ContactList from "./components/pages/contact/ContactList.vue";
import CreateContact from "./components/pages/contact/CreateForm.vue";
import EditContact from "./components/pages/contact/EditForm.vue";
import Profile from "./components/pages/profile/Profile.vue";
import UserList from "./components/pages/profile/UserList.vue";
import ChangePassword from "./components/pages/profile/ChangePassword.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/",
            name: "login",
            component: Login
        },
        {
            path: "/register",
            name: "/register",
            component: Register
        },
        {
            path: "/home",
            name: "home",
            component: Home,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: "/dashboard",
                    name: "dashboard",
                    component: Dashboard,
                    meta: {
                        title: "Dashboard",
                        description: "This is dashboard page"
                    }
                },
                {
                    path: "/contacts",
                    name: "contact",
                    component: Contact,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: "list",
                            name: "contactlist",
                            component: ContactList,
                            meta: {
                                title: "Contact List"
                            }
                        },
                        {
                            path: "create",
                            name: "createcontact",
                            component: CreateContact,
                            meta: {
                                title: "Create Contact"
                            }
                        },
                        {
                            path: ":id/edit",
                            name: "editcontact",
                            component: EditContact,
                            meta: {
                                title: "Edit Contact"
                            }
                        }
                    ]
                },
                {
                    path: "/profile",
                    name: "profile",
                    component: Profile,
                    meta: {
                        meta: {
                            requiresAuth: true
                        },
                        title: "Profile",
                        description: "This is profile page"
                    },
                    children: [
                        {
                            path: "list",
                            name: "userlist",
                            component: UserList,
                            meta: {
                                title: "User List"
                            }
                        },
                        {
                            path: ":id/changepassword",
                            name: "changepassword",
                            component: ChangePassword,
                            meta: {
                                title: "Change Password"
                            }
                        }
                    ]
                }
            ]
        }
    ],
    linkActiveClass: "active",
    linkExactActiveClass: "active"
});
export default router;
