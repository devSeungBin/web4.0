import "./MainSignUpBox.scss";
import LoginLayout from "../../Layouts/LoginLayouts/LoginLayout";
import SignUpBox from "./SignUpBox";

function MainSignUpBox({ onSubmitHandler, todoList }) {
  return (
    <LoginLayout>
      <div className="MainSignUpBox">
        <SignUpBox onSubmitHandler={onSubmitHandler} todoList={todoList} />
      </div>
    </LoginLayout>
  );
}

export default MainSignUpBox;
