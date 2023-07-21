import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

export default function AddWorkouts() {
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const sendDataToAPI = () => {
    axiosPrivate
      .post(WORKOUTS_URL, {
        name,
      })
      .then(() => {
        navigate("/");
      });
  };
  return (
    <section>
      <h1>Add Workout</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Workout Name</label>
          <br></br>
          <input
            name="fname"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => setName(e.target.value)}
            placeholder="Workout Name"
          />
        </Form.Field>
        <Button
          style={{ backgroundColor: "green", color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
        >
          Add
        </Button>
        <Link to="/">
          <Button style={{ backgroundColor: "#A9A9A9", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
