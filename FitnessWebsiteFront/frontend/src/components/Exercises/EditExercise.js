import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import "../ValidButton.css";
export default function EditExercise() {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amountOfReps, setReps] = useState("");
  const [amountOfSets, setSets] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [category, setCategory] = useState("");
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
          description,
          amountOfReps,
          amountOfSets,
          imageUrl,
          videoUrl,
          category,
        }
      )
      .then(() => {
        navigate("/exercises/detailed");
      });
  };
  const isFormValid = () => {
    return (
      name.trim() !== "" &&
      description.trim() !== "" &&
      amountOfReps.trim() !== "" &&
      amountOfSets.trim() !== "" &&
      imageUrl.trim() !== "" &&
      videoUrl.trim() !== "" &&
      category.trim() !== ""
    );
  };

  useEffect(() => {
    setID(localStorage.getItem("exerciseID"));
    setName(localStorage.getItem("exerciseName"));
    setDescription(localStorage.getItem("description"));
    setReps(localStorage.getItem("amountOfReps"));
    setSets(localStorage.getItem("amountOfSets"));
    setVideoUrl(localStorage.getItem("videoUrl"));
    setImageUrl(localStorage.getItem("imageUrl"));
    setCategory(localStorage.getItem("category"));
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
          <label>Exercise description</label>
          <br></br>
          <input
            name="fdesc"
            type="text"
            autoComplete="off"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Exercise description"
          />
        </Form.Field>
        <Form.Field>
          <label>Rep amount</label>
          <br></br>
          <input
            name="frep"
            type="number"
            autoComplete="off"
            required
            value={amountOfReps}
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
            name="fset"
            value={amountOfSets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="Amount of sets"
          />
        </Form.Field>
        <Form.Field>
          <label>Video url</label>
          <br></br>
          <input
            name="fvid"
            type="text"
            autoComplete="off"
            required
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Video url"
          />
        </Form.Field>
        <Form.Field>
          <label>Image url</label>
          <br></br>
          <input
            name="fimage"
            type="text"
            autoComplete="off"
            required
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Image url"
          />
        </Form.Field>
        <Form.Field>
          <label>Category</label>
          <br></br>
          <input
            name="fcategory"
            type="text"
            autoComplete="off"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
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
        <Link to="/exercises/detailed">
          <Button style={{ backgroundColor: "#a9a9a9", color: "#fff" }}>
            Back
          </Button>
        </Link>
      </Form>
    </section>
  );
}
