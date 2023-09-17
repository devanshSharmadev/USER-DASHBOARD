import './App.scss';
import Header from './components/Header';
import Button from '@mui/material/Button';
import UserForm from './components/UserForm';
import React, { useState, useEffect } from "react";
import UserCard from './components/Card';
import Grid from "@mui/material/Grid";
import { dark } from '@mui/material/styles/createPalette';
import Paginator from './components/Paginator';
const ITEMS_PER_PAGE = 6;
let PageSize = 10;
let START = 0
let END = 6
const initialFormData = {
  id: "",
  name: "",
  age: 0,
  dob: "",
  gender: "male",
  food: "pizza",
  hobbies: "",
};
function App() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpenView, setDialogOpenView] = useState(false);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);
  const [users, setUsers] = useState(localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : []);
  const [usersToDisplay, setUsersToDisplay] = useState(users.slice(START, END))
  const [firstTime, setFirstTime] = useState(true)
  const [formDataForView, setFormDataForView] = useState({});

  const handleOpenDialog = (type) => {
    if (type == "CREATE") {
      setDialogOpen(true);
    }
    if (type == "VIEW") {
      setDialogOpenView(true)
    } if (type == "EDIT") {
      setDialogOpenEdit(true)
    }

  };

  const handleSubmit = (data) => {
    // Update the state with the submitted data
    console.log(data, users.length)
    if (users.length % 6 == 0) {
      setCurrentPage(currentPage + 1)
      handlePageChange(currentPage + 1)
    }
    setUsers([...users, data]);

    setFirstTime(false)
  };

  const handleEdit = (data) => {
    console.log(data)
    const updatedItems = users.map(item => {
      if (item.id === data.id) {
        return { ...item, name: data.name, age: data.age, dob: data.dob, gender: data.gender, food: data.food, hobbies: data.hobbies };
      }
      return item;
    });
    console.log(updatedItems)
    localStorage.setItem('users', JSON.stringify(updatedItems));
    setUsers(updatedItems)
    setUsersToDisplay(updatedItems.slice(START, END))
  }

  useEffect(() => {
    console.log(users)
    if (!firstTime) {
      localStorage.setItem('users', JSON.stringify(users));
    }
    console.log("localStorage users:", localStorage.getItem('users'));
    setUsersToDisplay(users.slice(START, END))

  }, [users, firstTime]);

  const handleDelete = (id) => {
    console.log(users.length)
    if ((users.length - 1 % 6) == 0) {
      setCurrentPage(currentPage - 1)
      handlePageChange(currentPage - 1)
    }
    const updatedUsers = users.filter((user) => user.id !== id);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setUsersToDisplay(updatedUsers.slice(START, END))
  };

  const handleView = (data) => {
    console.log("REACHED HERE")
    console.log(data)
    setFormDataForView(data)

    handleOpenDialog("VIEW")
  }

  const handleEdit2 = (data) => {
    console.log(data)
    setFormDataForView(data)
    handleOpenDialog("EDIT")
  }

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Update the screenWidth state whenever the window is resized
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    // Add an event listener for the "resize" event
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6; // Change this to the desired number of items per page
  const totalItems = users.length; // Change this to the total number of items

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    START = 6 * (newPage - 1)
    END = 6 * (newPage)
    console.log(newPage, START, END)
    setUsersToDisplay(users.slice(START, END))
  };

  return (
    <div className="App">
      <Header />
      <div className="Body-content">
        <div className="top_div">
          <div className="left">
            <h3>LIST OF USERS</h3>
          </div>
          <div className="right">
            <Button variant="contained" color="primary" onClick={() => handleOpenDialog("CREATE")}>
              Add Users
            </Button>

          </div>
        </div>
        <UserForm open={dialogOpen} onClose={() => setDialogOpen(false)} onSubmit={handleSubmit} type="CREATE" data={initialFormData} />
        <UserForm open={dialogOpenView} onClose={() => setDialogOpenView(false)} onSubmit={handleSubmit} type="VIEW" data={formDataForView} />
        <UserForm open={dialogOpenEdit} onClose={() => setDialogOpenEdit(false)} onSubmit={handleEdit} type="EDIT" data={formDataForView} />

        {
          screenWidth > 912 ?
            <div className="card-container">
              <Grid container spacing={2}>
                {usersToDisplay.map((item, index) => (
                  <Grid item xs={4}>
                    <UserCard key={index} id={item.id} name={item.name} age={item.age} dob={item.dob} gender={item.gender} food={item.food} hobbies={item.hobbies} handleDelete={handleDelete} handleView={handleView} handleEdit={handleEdit2} />
                  </Grid>
                ))}
              </Grid>
            </div>
            :
            null
        }

        {
          (screenWidth <= 912 && screenWidth > 590) ?
            <div className="card-container">
              <Grid container spacing={2}>
                {usersToDisplay.map((item, index) => (
                  <Grid item xs={6}>
                    <UserCard key={index} id={item.id} name={item.name} age={item.age} dob={item.dob} gender={item.gender} food={item.food} hobbies={item.hobbies} handleDelete={handleDelete} handleView={handleView} handleEdit={handleEdit2} />
                  </Grid>
                ))}
              </Grid>
            </div>
            :
            null
        }

        {
          screenWidth <= 590 ?
            <div className="card-container">
              <Grid container spacing={2}>
                {usersToDisplay.map((item, index) => (
                  <Grid item xs={12}>
                    <UserCard key={index} id={item.id} name={item.name} age={item.age} dob={item.dob} gender={item.gender} food={item.food} hobbies={item.hobbies} handleDelete={handleDelete} handleView={handleView} handleEdit={handleEdit2} />
                  </Grid>
                ))}
              </Grid>
            </div>
            :
            null
        }
        <div className='paginator'>
          <Paginator
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}

          />
        </div>

      </div>
    </div>
  );
}

export default App;
