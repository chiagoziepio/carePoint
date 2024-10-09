import { useNavigate } from "react-router-dom";

const RedirectPage = () => {
  const navigate = useNavigate();
  setTimeout(() => {
    navigate("/changepassword");
  }, 5000);
  return (
    <div className="h-full flex-grow res p-[10px] md:flex justify-center items-center  ">
      <div className="bg-white w-full md:w-[300px] h-[200px] rounded-[10px] flex justify-center items-center mt-[40px] md:mt-0">
        <h4 className="outfit-small text-[19px] text-center">Redirecting...</h4>
      </div>
    </div>
  );
};

export default RedirectPage;
