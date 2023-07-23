import React, { useEffect, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css";

export default function AddExercise() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountOfReps, setReps] = useState("");
  const [amountOfSets, setSets] = useState("");
  const [category, setCategory] = useState("");
  const [workoutId, setWorkoutid] = useState(null);

  useEffect(() => {
    const storedWorkoutId = localStorage.getItem("ID");
    setWorkoutid(storedWorkoutId);
  }, []);

  const isFormValid = () => {
    return (
      (name.trim() !== "") !== "" &&
      description.trim() !== "" &&
      amountOfReps.trim() !== "" &&
      amountOfSets.trim() !== "" &&
      category.trim() !== ""
    );
  };
  const sendDataToAPI = () => {
    const payload = {
      Name: name,
      Description: description,
      AmountOfReps: parseInt(amountOfReps, 10),
      AmountOfSets: parseInt(amountOfSets, 10),
      Category: category,
      // Optional properties can be omitted or provided if necessary
      ImageUrl: "",
      VideoUrl: "",
    };

    axiosPrivate
      .post("/workouts/" + workoutId + "/exercises", payload)
      .then(() => {
        navigate("/exercises");
      })
      .catch((error) => {
        console.log("API Error:", error);
        // Handle the error, such as logging or displaying an error message
      });
  };
  return (
    <section>
      <h1>Add exercise</h1>
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
          <label>Exercise description</label>
          <br></br>
          <input
            name="fdesc"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Exercise description"
          />
        </Form.Field>
        <Form.Field>
          <label>Rep amount</label>
          <br></br>
          <input
            name="freps"
            type="number"
            autoComplete="off"
            required
            placeholder="Amount of reps"
            onChange={(e) => setReps(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Set amount</label>
          <br></br>
          <input
            name="fsets"
            type="number"
            autoComplete="off"
            required
            onChange={(e) => setSets(e.target.value)}
            placeholder="Amount of sets"
          />
        </Form.Field>
        <Form.Field>
          <label>Exercise category</label>
          <br></br>
          <input
            name="fcategry"
            type="text"
            autoComplete="off"
            required
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Exercise category"
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
        <Link to={"/exercises"}>
          <Button style={{ backgroundColor: "gray", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
