import { useUser_LoginLazyQuery } from "../graphql/generated/graphql";
import useStorage from "../hooks/useStorage";

const SignIn = () => {
  const { setItem } = useStorage();
  const [signIn] = useUser_LoginLazyQuery();

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: { elements: { address: any } };
  }) {
    event.preventDefault();
    const addressElement = event.currentTarget.elements.address;

    try {
      const data = await signIn({
        variables: {
          address: addressElement.value,
        },
      });

      if (data != null) {
        setItem("jwt", data?.data?.signin.jwt, "session");
        setItem("refreshToken", data?.data?.signin?.refreshToken, "session");
      }
    } catch (error) {
      console.log("page error", error);
    }
  }

  return (
    <>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input name="address" type="text" required placeholder="address" />
        <button type="submit">Sign in</button>
      </form>
    </>
  );
};

export default SignIn;
