import instance from "@/middlewares";

export default {
  name: "user",
  state: () => ({
    user: null,
    userNames: [],
  }),
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setUserNames(state, names) {
      state.userNames = names;
    },
  },
  actions: {

    async getUserByUid({ commit }) {
      const uid = localStorage.getItem("uid");
      const user = await instance.get(`/api/users/${uid}`);
      if (user) {
        console.log(user.data);
        localStorage.setItem("username", user.data.name);
      }
      if (user) return commit("setUser", user.data);

      console.log(user.message);
    },
    async updateLikes({}, { likes }) {
      const response = await instance.put("/api/users/likes", { likes });
      if (response.ok) return console.log("ok");
      console.log(response.statusText);
    },
  },

  namespaced: true,
};
