export const getSessionStorage = () => {
  const stn = process.env.NEXT_PUBLIC_SESSION_STORAGE_NAME as string;
  // This is a secure way to share sessionStorage between tabs.
  if (typeof window !== "undefined") {
    if (!sessionStorage.length) {
      // Ask other tabs for session storage
      // ! console.log(`Calling ${stn}`);
      localStorage.setItem(stn, String(Date.now()));
    }
    window.addEventListener("storage", (event: any) => {
      // ! console.log("storage event", event);
      if (event.key == stn) {
        // Some tab asked for the sessionStorage -> send it
        localStorage.setItem("sessionStorage", JSON.stringify(sessionStorage));
        localStorage.removeItem("sessionStorage");
      } else if (event.key == "sessionStorage" && !sessionStorage.length) {
        // sessionStorage is empty -> fill it
        const data = JSON.parse(event.newValue);
        for (let key in data) {
          sessionStorage.setItem(key, data[key]);
        }
      }
    });
  }
};
