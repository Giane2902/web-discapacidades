import { useEffect } from "react";
import Users from "../../components/Admin/Users";
import { useDispatch, useSelector } from "react-redux";
import { userStartLoading } from "../../actions/users";

function UsersPage() {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userStartLoading());
  }, [dispatch]);

  return (
    <>
      <Users users={users} />
    </>
  );
}

export default UsersPage;
