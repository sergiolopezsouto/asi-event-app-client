import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ErrorNotFoundView from "../views/ErrorNotFoundView.vue";
import LoginForm from "@/components/LoginForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import EventListToday from "@/components/EventListToday.vue";
import EventListUpcoming from "@/components/EventListUpcoming.vue";
import EventCategories from "@/components/EventCategories.vue";
import EventForm from "@/components/EventForm.vue";
import EventProfile from "@/components/EventProfile.vue";
import EventUsers from "@/components/EventUsers.vue";
import EventDetail from "@/components/EventDetail.vue";

import auth from "@/common/auth";
import { getStore } from "@/common/store";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { public: true },
  },
  {
    path: "/today",
    name: "Today",
    component: EventListToday,
    meta: { public: true },
  },
  {
    path: "/upcoming",
    name: "Upcoming",
    component: EventListUpcoming,
    meta: { public: true },
  },
  {
    path: "/event/new",
    name: "EventCreate",
    component: EventForm,
  },
  {
    path: "/events/:id",
    name: "EventDetail",
    component: EventDetail,
    meta: { public: true },
  },
  {
    path: "/categories",
    name: "Categories",
    component: EventCategories,
    meta: { public: true },
  },
  {
    path: "/login",
    name: "Login",
    component: LoginForm,
    meta: { public: true, isLoginPage: true },
  },
  {
    path: "/register",
    name: "Register",
    component: RegisterForm,
    meta: { public: true, isLoginPage: true },
  },
  {
    path: "/createevent",
    name: "CreateEvent",
    component: EventForm,
    meta: { public: true, isLoginPage: false },
  },
  {
    path: "/profile",
    name: "Profile",
    component: EventProfile,
    meta: { public: true, isLoginPage: false },
  },
  {
    path: "/users",
    name: "Users",
    component: EventUsers,
    meta: { public: true },
  },
  {
    path: "/:catchAll(.*)*",
    component: ErrorNotFoundView,
    meta: { public: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  // Lo primero que hacemos antes de cargar ninguna ruta es comprobar si
  // el usuario est?? autenticado (revisando el token)
  auth.isAuthenticationChecked.finally(() => {
    // por defecto, el usuario debe estar autenticado para acceder a las rutas
    const requiresAuth = !to.meta.public;

    const requiredAuthority = to.meta.authority;
    const userIsLogged = getStore().state.user.logged;
    const loggedUserAuthority = getStore().state.user.authority;

    if (requiresAuth) {
      // p??gina privada
      if (userIsLogged) {
        if (requiredAuthority && requiredAuthority != loggedUserAuthority) {
          // usuario logueado pero sin permisos suficientes, le redirigimos a la p??gina de login
          alert(
            "Acceso prohibido para el usuario actual; intenta autenticarte de nuevo"
          );
          auth.logout();
          next("/login");
        } else {
          // usuario logueado y con permisos adecuados
          next();
        }
      } else {
        // usuario no est?? logueado, no puede acceder a la p??gina
        alert("Esta p??gina requiere autenticaci??n");
        next("/login");
      }
    } else {
      // p??gina p??blica
      if (userIsLogged && to.meta.isLoginPage) {
        // si estamos logueados no hace falta volver a mostrar el login
        next({ name: "Home", replace: true });
      } else {
        next();
      }
    }
  });
});

export default router;
