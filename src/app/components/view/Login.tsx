import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { authService } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { isNull } from "lodash";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isNull(authService.getLoggedUser())) {
      void navigate("/");
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = authService.authenticate(formData);
      authService.setLoggedUser(await res);
      return navigate("/");
    } catch {
      console.error("Something goes wrong :(");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Login</h1>
      <form
        className="flex flex-col gap-6"
        onSubmit={(e) => void handleSubmit(e)}
      >
        <Input
          variant="secundary"
          type="text"
          placeholder="Email"
          value={formData.email}
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <Input
          variant="secundary"
          type="password"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit">Login</Button>
      </form>
      <span
        className="hover:cursor-pointer"
        onClick={() => void navigate("/register")}
      >
        Sign Up
      </span>
    </div>
  );
};

export { Login };
