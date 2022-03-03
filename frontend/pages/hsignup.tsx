import useStorage from "../hooks/useStorage";
import { useUser_SignupMutation } from "../graphql/generated/graphql";

const SignUp = () => {
  const { setItem } = useStorage();
  const [userSignupMutation] = useUser_SignupMutation();

  async function handleSubmit(event: {
    preventDefault: () => void;
    currentTarget: { elements: { address: any } };
  }) {
    event.preventDefault();
    const addressElement = event.currentTarget.elements.address;
    console.log("address", addressElement.value);

    try {
      const req = await userSignupMutation({
        variables: {
          address: addressElement.value,
        },
      });

      console.log("Signup result:", req.data);
      if (req?.data?.signup?.jwt) {
        setItem("jwt", req.data.signup.jwt, "session");
        setItem("refreshToken", req.data.signup.refreshToken, "session");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input name="address" type="text" required placeholder="address" />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
};

export default SignUp;
