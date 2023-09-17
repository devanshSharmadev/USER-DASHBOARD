import React, { useState, useEffect } from "react";
import "./header.scss";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const initialFormData = {
  id: "",
  name: "",
  age: 0,
  dob: "",
  gender: "male",
  food: "pizza",
  hobbies: "",
};

const UserForm = (props) => {
  const { open, onClose, onSubmit, type, data } = props;
  console.log(data);
  const [formData, setFormData] = useState(data);
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (type == "EDIT") {
      onSubmit(formData);
      setFormData(initialFormData);
    } else {
      const newId = Date.now().toString();
      const updatedFormData = { ...formData, id: newId };
      console.log(updatedFormData);
      onSubmit(updatedFormData);
      setFormData(initialFormData);
    }
    onClose()
  };

  useEffect(() => {
    // Update formData when data prop changes (e.g., when editing a user)
    if (data) {
      setFormData(data);
    }
  }, [data]);
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        {props.type == "CREATE" ? <DialogTitle>ADD USER</DialogTitle> : null}
        {props.type == "VIEW" ? <DialogTitle>VIEW USER</DialogTitle> : null}
        {props.type == "EDIT" ? <DialogTitle>EDIT USER</DialogTitle> : null}
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "4px" }}
                disabled={type === "VIEW"}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Age"
                variant="outlined"
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                fullWidth
                style={{ marginTop: "4px" }}
                disabled={type === "VIEW"}
              />
            </Grid>
            <Grid item xs={6}>
              <label>DOB:</label>
              <br />
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                disabled={type === "VIEW"}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={type === "VIEW"}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  disabled={type === "VIEW"}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  disabled={type === "VIEW"}
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Favourite Food
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={formData.food}
                  onChange={handleInputChange}
                  name="food"
                  disabled={type === "VIEW"}
                >
                  <MenuItem value={"pizza"}>Pizza</MenuItem>
                  <MenuItem value={"burger"}>Burger</MenuItem>
                  <MenuItem value={"pasta"}>Pasta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-multiline-static"
                label="Hobbies"
                multiline
                rows={4}
                value={formData.hobbies}
                onChange={handleInputChange}
                fullWidth
                name="hobbies"
                disabled={type === "VIEW"}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ marginBottom: "12px", marginRight: "12px" }}>
          {type == "CREATE" || type == "EDIT" ? (
            <>
              <Button onClick={onClose} variant="outlined" color="error">
                Cancel
              </Button>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          ) : null}

          {type == "VIEW" ? (
            <Button onClick={onClose} variant="outlined" color="error">
              Close
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserForm;
