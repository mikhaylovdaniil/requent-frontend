import NotesView from "@/views/NotesView.vue";
import HomeView from "../views/HomeView.vue";

const route = (path, name, component) => {
  return {
    path,
    name,
    component,
  };
};

/* Routes with '@' at start added to navbar item */
const routes = [
  route("/", "@home", HomeView),
  route("/notes", "@notes", NotesView),
];
export default routes;
