const routes = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: {
      name: "Chat",
    },
    children: [
      {
        path: "chat",
        name: "Chat",
        component: () => import("@/views/Chat/index.vue"),
        redirect: {
          name: "ChatRoom",
        },

        children: [
          {
            // path: "chatroom/:i",
            path: "chatroom",
            name: "ChatRoom",
            component: () => import("@/views/Chat/ChatRoom/index.vue"),
          },
        ],
      },
      {
        path: "contacts",
        name: "Contacts",
        component: () => import("@/views/Contacts/index.vue"),

        children: [
          {
            path: ":id",
            name: "contactsId",
            component: () => import("@/components/UserInfo/index.vue"),
          },
        ],
      },
      {
        path: "friendsupdate",
        name: "FriendsUpdate",
        component: () => import("@/views/FriendsUpdate/index.vue"),
      },
      {
        path: "notice",
        name: "Notice",
        component: () => import("@/views/Notice/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("@/views/Register.vue"),
  },
];

export default routes;
