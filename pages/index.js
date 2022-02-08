const App = (props) => <LoginForm />;
import GoogleIcon from "../components/Global/Svg/GoogleIcon";
function LoginForm() {
  return (
    <div id="loginform">
      <FormHeader title="Login" />
      <Form />
      <OtherMethods />
    </div>
  );
}

const FormHeader = (props) => <h2 id="headerTitle">{props.title}</h2>;

const Form = (props) => (
  <div>
    <FormInput
      description="Username"
      placeholder="Enter your username"
      type="text"
    />
    <FormInput
      description="Password"
      placeholder="Enter your password"
      type="password"
    />
    <FormButton title="Log in" />
  </div>
);

const FormButton = (props) => (
  <div id="button" className="row">
    <button>{props.title}</button>
  </div>
);

const FormInput = (props) => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} />
  </div>
);

const OtherMethods = (props) => (
  <div id="alternativeLogin">
    <label>Or sign in with:</label>
    <div id="iconGroup">
      {/* <Facebook />
      <Twitter /> */}
      <Google />
    </div>
  </div>
);

// const Facebook = (props) => <a href="#" id="facebookIcon"></a>;

// const Twitter = (props) => <a href="#" id="twitterIcon"></a>;

const Google = (props) => (
  <a href="">
    <GoogleIcon width="50" height="50" />
  </a>
);

export default App;
