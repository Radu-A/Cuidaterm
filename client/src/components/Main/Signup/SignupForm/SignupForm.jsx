import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserLoggedContext } from "../../../../context/userLoggedContext";
import axios from "axios";

const SignupForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [matchMessage, setMatchMessage] = useState(null);
  const { updateUserLogged } = useContext(UserLoggedContext);
  const passRe = /^[\w\-.@]{8,16}$/;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
//Objeto usuario nuevo
  const onSubmit = (data) => {
    const newUser = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
//Objeto login
    const newLogin = {
      email: data.email,
      password: data.password,
    };

    const handleLogin = async () => {
      try {
        // const res = await fetch(`/auth/login`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify(newLogin),
        // });
        // const resData = await res.json();

        const response = await axios.post("/auth/login", newLogin);
        const resData = await response.data;

        setMessage(resData.message);
        const user = {
          user_id: resData.user_id,
          username: resData.username,
          email: resData.email,
        };
        updateUserLogged();
      } catch (error) {
        console.log(error);
      }
    };

    const handleSignup = async () => {
      try {
        const response = await axios.post(`/api/users`, newUser);
        const resData = await response.data;
        setMessage(resData.message);
        handleLogin();
      } catch (error) {
        console.log(error);
      }
    };

    if (data.password === data.re_password) {
      handleSignup();

      setTimeout(() => {
        navigate("/form");
      }, 500);
    } else {
      setMatchMessage("The second password doesn't match");
    }
  };

  return (
    <article className="login-form-article">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="User name"
          {...register("username", {
            required: "Required field",
            minLength: {
              value: 3,
              message: "At least 3 characters",
            },
          })}
        />
        <p className="error-message">
          {errors.username && errors.username.message}
        </p>

        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Required field" })}
        />
        <p className="error-message">{errors.email && errors.email.message}</p>
{/* Validacion de formulario */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Required field",
            minLength: {
              value: 8,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
            maxLength: {
              value: 16,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
            pattern: {
              value: passRe,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
          })}
        />
        <p className="error-message">
          {errors.password && errors.password.message}
        </p>

        <input
          type="password"
          placeholder="Repeat Password"
          {...register("re_password", {
            required: "Required field",
            minLength: {
              value: 8,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
            maxLength: {
              value: 16,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
            pattern: {
              value: passRe,
              message:
                "Password should have between 6-12 alphanumeric characters or: / . - _",
            },
          })}
        />
        <p className="error-message">
          {errors.password && errors.password.message}
        </p>
        {errors.repeat && <p>{errors.repeat.message}</p>}

        <input type="submit" id="signup-button" value="Registro" />
      </form>
      {message && <p className="error-message">{message}</p>}
      {matchMessage && <p className="error-message">{matchMessage}</p>}
    </article>
  );
};

export default SignupForm;
