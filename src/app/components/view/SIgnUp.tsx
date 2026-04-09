import { useEffect, useState } from "react";
import { Input } from "../Input";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { isNull } from "lodash";
import { authService } from "../../services/auth.service";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!isNull(authService.getLoggedUser())) {
      void navigate("/");
    }
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    void fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => {
        void navigate("/login");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1>Sign-Up</h1>
      <form className="flex flex-col gap-6" onSubmit={(e) => handleSubmit(e)}>
        <Input
          variant="secundary"
          type="text"
          placeholder="Username"
          value={formData.username}
          name="username"
          onChange={(e) => handleChange(e)}
        />
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
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};
