import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

export default function EditWorkouts() {
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [ID, setID] = useState(null);
  const sendDataToAPI = () => {
    axiosPrivate
      .put(WORKOUTS_URL + `/${ID}`, {
        name,
      })
      .then(() => {
        navigate("/");
      });
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setID(localStorage.getItem("ID"));
  }, []);

  return (
    <section>
      <h1>Edit {name}</h1>
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workout Name"
          />
        </Form.Field>
        <Button
          style={{ backgroundColor: "green", color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
        >
          Edit
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
