import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

export default function EditAd() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [repAmount, setReps] = useState("");
  const [amountOfSets, setSets] = useState("");
  const [exerciseID, setID] = useState(null);
  const sendDataToAPI = () => {
    axiosPrivate
      .put(
        "/workouts/" +
          `${localStorage.getItem("ID")}` +
          "/exercises/" +
          `${localStorage.getItem("exerciseID")}`,
        {
          name,
          repAmount,
          amountOfSets,
        }
      )
      .then(() => {
        navigate("/exercises/detailed");
      });
  };

  useEffect(() => {
    setName(localStorage.getItem("exerciseName"));
    setReps(localStorage.getItem("repAmount"));
    setSets(localStorage.getItem("amountOfSets"));
    setID(localStorage.getItem("exerciseID"));
  }, []);

  return (
    <section>
      <h1>Edit exercise</h1>
      <br></br>
      <Form>
        <Form.Field>
          <label>Exercise name</label>
          <br></br>
          <input
            name="fname"
            type="text"
            autoComplete="off"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Exercise name"
          />
        </Form.Field>
        <Form.Field>
          <label>Rep amount</label>
          <br></br>
          <input
            name="lname"
            type="number"
            autoComplete="off"
            required
            value={repAmount}
            placeholder="Rep amount"
            onChange={(e) => setReps(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Amount of sets</label>
          <br></br>
          <input
            type="number"
            autoComplete="off"
            required
            name="fprice"
            value={amountOfSets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="Amount of sets"
          />
        </Form.Field>
        <Button
          style={{ backgroundColor: "green", color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
        >
          Edit
        </Button>
        <Link to="/exercises/detailed">
          <Button style={{ backgroundColor: "#a9a9a9", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
