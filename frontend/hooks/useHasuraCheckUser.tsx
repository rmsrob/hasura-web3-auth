import { useEffect, useState } from "react";
import {
  User_Check_AddressDocument,
  useUser_Check_AddressQuery,
  useUser_Insert_OneMutation,
} from "../graphql/generated/graphql";

const useHasuraCheckUser = (address: string, chainId: number) => {
  const [user, setUser] = useState({ data: null, loading: true });

  const { data, loading, error } = useUser_Check_AddressQuery({
    variables: {
      address,
    },
    onError: (err) => console.log(`user query on db got err: ${err}`),
  });

  const [addUser] = useUser_Insert_OneMutation({
    variables: {
      user: {
        address,
        chainId,
      },
    },
    onError: (err) => console.log(`user mutation on db got err: ${err}`),
    refetchQueries: [User_Check_AddressDocument, "USER_CHECK_ADDRESS"],
  });

  useEffect(() => {
    // if we got already some data pass it directly (shorter glitchy)
    setUser((user) => ({ data: user.data, loading: true }));
    // if there is not that address already in our db
    if (data?.user.length === 0 && !loading && !error) {
      const au = addUser();
      Promise.resolve(au as any).then((u) =>
        setUser({ data: u.data?.insert_user_one?.id, loading: false })
      );
    }
    // if we already got that address in our db
    if (data?.user.length !== 0 && !loading && !error) {
      setUser({ data: data?.user[0].id, loading: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return user;
};

export default useHasuraCheckUser;
