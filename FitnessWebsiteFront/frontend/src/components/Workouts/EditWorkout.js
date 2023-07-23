import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css";
export default function EditWorkouts() {
  const WORKOUTS_URL = "/workouts";
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [ID, setID] = useState(null);
  const sendDataToAPI = () => {
    axiosPrivate
      .put(WORKOUTS_URL + `/${ID}`, {
        name,
        type,
        description,
      })
      .then(() => {
        navigate("/workouts");
      });
  };
  const isFormValid = () => {
    return (
      name.trim() !== "" && type.trim() !== "" && description.trim() !== ""
    );
  };

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setID(localStorage.getItem("ID"));
    setType(localStorage.getItem("type"));
    setDescription(localStorage.getItem("description"));
  }, []);

  return (
    <section>
      <h1>Edit {name}</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Workout name</label>
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
        <Form.Field>
          <label>Workout type</label>
          <br></br>
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
          <br></br>
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
          Edit
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
