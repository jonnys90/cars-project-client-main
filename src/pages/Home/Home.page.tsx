import { FC, useState, FormEvent, ChangeEventHandler, useEffect } from "react";
import { Button, Label, TextInput, Alert } from "flowbite-react";
import qs from "qs";
import axios from "axios";
import { useDispatch } from "react-redux";

import validateLogin from "../../validation/login.validation";
import { authActions } from "../../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const HomePage: FC = () => {
  const [username, setUsername] = useState<string | number>(0);
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setUsername(e.target.value);
  };
  const handleBlur = () => {
    if (username === 0) return;
    const error = validateLogin({ username });
    if (error) {
      setErrorMsg(error);
    } else {
      setErrorMsg("");
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        data: qs.stringify({ username }),
        url: "http://localhost/rest/setUser.asp",
      };
      let { data } = await axios(options);
      if (data.error) {
        throw new Error(data.error);
      }
      dispatch(authActions.login(username + ""));
      toast.success("התחברות בוצעה בהצלחה");
      navigate(ROUTES.ORDERS);
    } catch (err: any) {
      if (err.message == "user not exists") {
        toast.error("משתמש לא קיים");
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <form
      className="flex max-w-md flex-col gap-4 w-screen mx-auto pt-20"
      onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="שם המשתמש" />
        </div>
        <TextInput
          id="username"
          type="text"
          placeholder="שלמה"
          value={username === 0 ? "" : username}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        />
        {errorMsg && <Alert color="failure">{errorMsg}</Alert>}
      </div>
      <Button type="submit" disabled={!!errorMsg}>
        התחבר
      </Button>
    </form>
  );
};

export default HomePage;
