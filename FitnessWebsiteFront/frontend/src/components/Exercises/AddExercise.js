import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";

export default function AddAd() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [repAmount, setReps] = useState("");
  const [amountOfSets, setSets] = useState("");
  const [exerciseID, setExerciseID] = useState(null);
  useEffect(() => {
    setExerciseID(localStorage.getItem("ID"));
  }, []);
  const sendDataToAPI = () => {
    axiosPrivate
      .post("/workouts/" + `${exerciseID}` + "/exercises", {
        name,
        repAmount,
        amountOfSets,
      })
      .then(() => {
        navigate("/exercises");
      });
  };
  return (
    <section>
      <h1>Create exercise</h1>
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
            onChange={(e) => setName(e.target.value)}
            placeholder="Exercise name"
          />
        </Form.Field>
        <Form.Field>
          <label>Rep amount</label>
          <br></br>
          <input
            name="lname"
            type="text"
            autoComplete="off"
            placeholder="Rep amount"
            onChange={(e) => setReps(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Set amount</label>
          <br></br>
          <input
            name="fprice"
            type="number"
            autoComplete="off"
            required
            onChange={(e) => setSets(e.target.value)}
            placeholder="Set amount"
          />
        </Form.Field>

        <Button
          style={{ backgroundColor: "green", color: "#fff" }}
          type="submit"
          onClick={sendDataToAPI}
        >
          Add
        </Button>
        <Link to={"/exercises"}>
          <Button style={{ backgroundColor: "red", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
