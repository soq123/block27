import { useState } from "react";
import axios from "axios";

export default function SignUpForm({ setToken }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    const username = formData.get("username")
    const password = formData.get("password")
    const newUser = {username, password}
    try {
      const {data} = await axios.post("https://fsa-jwt-practice.herokuapp.com/signup", newUser);
      console.log("Signup Result: ", data);
      setToken(data.token);
      setSuccessMessage(data.message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <h2>Signup</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <form action={handleSubmit}>
        <label>
          Username:{" "}
          <input
            type="text" 
            name="username"
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            name="password"
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}