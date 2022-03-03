import Auth from "../components/Login/Auth";
import Connect from "../components/Login/Connect";

const Home = () => {
  return (
    <>
      {/* choose your login provider just display the btn to connect he wallet */}
      <Connect />
      {/* happen when user is connected */}
      <Auth />
    </>
  );
};

export default Home;
