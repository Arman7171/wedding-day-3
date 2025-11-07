// Allow side-effect CSS imports like: import "./App.css"
declare module "*.css";

// If you also use CSS Modules, add these:
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
