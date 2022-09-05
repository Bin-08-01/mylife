import "./home.css";
import {useEffect} from "react";
import {getAllUsers} from "../../redux/apiRequest";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

const HomePage = () => {
  // "?" : optional chaining
  // ": ? ": ternary operator
  const user = useSelector((state)=>state.auth.login?.currentUser);
  const userList = useSelector((state)=>state.users.users?.allUsers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //DUMMY DATA
  // const userData = [
  //   {
  //     username: "anhduy1202",
  //   },
  //   {
  //     username: "kelly1234",
  //   },
  //   {
  //     username: "danny5678",
  //   },
  //   {
  //     username: "kenny1122",
  //   },
  //   {
  //     username: "jack1234",
  //   },
  //   {
  //     username: "loi1202",
  //   },
  //   {
  //     username: "nhinhi2009",
  //   },
  //   {
  //     username: "kellynguyen1122",
  //   },
  //
  // ];

  useEffect(()=>{
    if(!user){
      navigate("/login");
    }
    if(user?.accessToken){
      getAllUsers(user?.accessToken,dispatch);
    }
  },[]);

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container">
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
