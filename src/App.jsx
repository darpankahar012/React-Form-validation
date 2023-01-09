import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./App.css";
import Select from "react-select";
import { colourOptions } from './data';

const departments = [
  { value: "Computer-Science", label: "Computer Science" },
  { value: "Physics", label: "Physics" },
  { value: "Chemistry", label: "Chemistry" },
  { value: "Mathematics", label: "Mathematics" }
];

export default function App() {
  const [successMsg, setSuccessMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setSuccessMsg("User registration is successful.");
    reset();
    setTimeout(() => {
      setSuccessMsg("");
    }, 3000);
  };



  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        {successMsg && <p className="success-msg">{successMsg}</p>}
          <label>Select Department of Interest</label>
        <div className="form-control">
          {/* <Controller
            name="department"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="colors"
                options={colourOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            )}
          /> */}

          
          <Select
                defaultValue={[colourOptions[2], colourOptions[3]]}
                isMulti
                name="colors"
                options={colourOptions}
                className="basic-multi-select"
                classNamePrefix="select"
              />

          {errors.department && (
            <p className="errorMsg">This is a required field.</p>
          )}
        </div>

        <div className="form-control">
          <label>Username</label>
          <input
            type="text"
            {...register("username", {
              required: "Username is required."
            })}
          />
          {errors.username && (
            <p className="errorMsg">{errors.username.message}</p>
          )}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input
            type="text"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)(?=.*[!@#$*])/.test(
                    value
                  )
              }
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit, and special symbol.
            </p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}
