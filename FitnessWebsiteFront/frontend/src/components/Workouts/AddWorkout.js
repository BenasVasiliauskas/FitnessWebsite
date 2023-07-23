import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css"; // Import the CSS file for custom styles

export default function AddWorkouts() {
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  // Function to check if any of the fields are empty
  const isFormValid = () => {
    return (
      name.trim() !== "" && type.trim() !== "" && description.trim() !== ""
    );
  };

  const sendDataToAPI = () => {
    axiosPrivate
      .post(WORKOUTS_URL, {
        name,
        type,
        description,
      })
      .then(() => {
        navigate("/workouts");
      });
  };

  return (
    <section>
      <h1>Add Workout</h1>
      <br />
      <Form>
        <Form.Field>
          <label>Workout name</label>
          <br />
          <input
            name="fname"
            type="text"
            autoComplete="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Workout name"
          />
        </Form.Field>
        <Form.Field>
          <label>Workout type</label>
          <br />
          <input
            name="ftype"
            type="text"
            autoComplete="off"
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Workout type"
          />
        </Form.Field>
        <Form.Field>
          <label>Workout description</label>
          <br />
          <input
            name="fdescription"
            type="text"
            autoComplete="off"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Workout description"
          />
        </Form.Field>
        <Button
          style={{ color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
          className={isFormValid() ? "submitButton" : "invalidButton"}
          disabled={!isFormValid()}
        >
          Add
        </Button>
        <Link to="/workouts">
          <Button style={{ backgroundColor: "#A9A9A9", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
