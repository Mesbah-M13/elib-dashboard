// console.log("Meta env", import.meta.env);

const config = Object.freeze({
  backEndDomain: import.meta.env.VITE_BACKEND_DOMAIN,
});

console.log("Backend domain:", config.backEndDomain);

export { config };
