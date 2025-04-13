export default defineNuxtPlugin(() => {
    const router = useRouter(); // Use Nuxt's composable to access the router
  
    router.onError((error) => {
      const messages = [
        "Importing a module script failed", // Safari
        "Failed to fetch dynamically imported module", // Edge & Chrome
      ];
  
      if (messages.some((message) => error?.message.includes(message))) {
        console.error("Dynamic import error detected:", error);
  
        // Optionally notify the user
        // alert("A loading error occurred. Reloading the page...");
  
        // Reload the page
        router.go(0);
      }
    });
  });
  