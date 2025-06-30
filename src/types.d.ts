// Declaration file for JavaScript modules

// Declare JSX modules
declare module '*.jsx' {
  const Component: any;
  export default Component;
}

// Declare JS modules
declare module '*.js' {
  const Module: any;
  export default Module;
  export const AuthProvider: any;
}