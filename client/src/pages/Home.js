import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import Card from "../components/Card";
import { FiPlus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import {
   Box,
   Typography,
   Button,
   Dialog,
   DialogTitle as MuiDialogTitle,
   DialogContent as MuiDialogContent,
   DialogActions as MuiDialogActions,
   IconButton,
   TextField,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";

import {
   getTodos,
   createTodo,
   removeTodo,
   markAsCompleted,
} from "../helper/profileHelper";

const styles = (theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(2),
      backgroundColor: "#16234d",
      color: "#fff",
   },
   closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
   },
});

const DialogTitle = withStyles(styles)((props) => {
   const { children, classes, onClose, ...other } = props;
   return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
         <Typography variant="h6">{children}</Typography>
         {onClose ? (
            <IconButton
               aria-label="close"
               className={classes.closeButton}
               onClick={onClose}
            >
               <CloseIcon />
            </IconButton>
         ) : null}
      </MuiDialogTitle>
   );
});

const DialogContent = withStyles((theme) => ({
   root: {
      padding: theme.spacing(2),
      backgroundColor: "#16234d",
      color: "#fff",
   },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
   root: {
      margin: 0,
      padding: theme.spacing(1),
      backgroundColor: "#16234d",
      color: "#fff",
   },
}))(MuiDialogActions);

export default function Home() {
   const context = useContext(UserContext);
   const [profileName, setProfileName] = useState("");
   const [test, setTest] = useState(false);
   const [todos, setTodos] = useState([]);
   const [todo, setTodo] = useState("");
   const [open, setOpen] = useState(false);

   const handleClickOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   const logout = () => {
      context.setUser(null);
      localStorage.removeItem("jwt");
   };

   const _createTodo = () => {
      createTodo(todo).then((data) => {
         if (data.todo) {
            todos.push(data.todo);
            setTodo({ ...todos });
            setTodo("");
            setOpen(false);
         }
      });
   };

   const _getTodos = () => {
      getTodos().then((data) => {
         console.log("data: ", data);
         if (!data.error) {
            setTodos(data.todos);
         } else {
            console.log("data: ", data);
         }
      });
   };

   const _deleteTodo = (id) => {
      removeTodo(id).then((data) => {
         if (!data.error) {
            let list = todos.filter((todo) => todo._id != id);
            console.log("data: list", list);
            setTodos(list);
         }
      });
   };

   const checkTodo = (id) => {
      let index = todos.findIndex((todo) => todo._id === id);
      markAsCompleted(id, !todos[index].markascompleted).then((data) => {
         if (!data.error) {
            todos[index].markascompleted = !todos[index].markascompleted;
            setTodo({ ...todos });
         }
      });
   };

   useEffect(() => {
      if (localStorage.getItem("jwt")) {
         _getTodos();
         let info = JSON.parse(localStorage.getItem("jwt"));
         context.setUser({ id: info.id, name: info.name, token: info.token });
         setProfileName(context.user?.name);
         console.log(todos);
      } else {
         logout();
         console.log("Redirecting");
         return <Redirect to="/" />;
      }
   }, []);

   if (!context.user?.id) {
      return <Redirect to="/" />;
   }

   const dialog = () => {
      return (
         <Dialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth={true}
         >
            <DialogTitle id="customized-dialog-title" onClose={handleClose}>
               New Task
            </DialogTitle>
            <DialogContent dividers>
               <Box>
                  <TextField
                     id="outlined-multiline-static"
                     placeholder="Enter todo..."
                     multiline
                     rows={5}
                     variant="outlined"
                     style={{ width: "100%" }}
                     value={todo}
                     onChange={(e) => {
                        setTodo(e.target.value);
                     }}
                     color="primary"
                  />
               </Box>
            </DialogContent>
            <DialogActions>
               <Box display="flex" justifyContent="space-bwteen">
                  <Box>
                     <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                     </Button>
                  </Box>
                  <Box>
                     <Button autoFocus onClick={_createTodo} color="primary">
                        Add Todo
                     </Button>
                  </Box>
               </Box>
            </DialogActions>
         </Dialog>
      );
   };

   return (
      <div>
         <Navbar profileName={profileName} />
         <div className="main">
            <div className="content col-sm-12 col-md-8 col-lg-7 m-auto">
               <div className="info">
                  <p>
                     All Tasks for today{" "}
                     <span>
                        <svg
                           aria-hidden="true"
                           focusable="false"
                           data-prefix="far"
                           data-icon="smile"
                           className="svg-inline--fa fa-smile fa-w-16"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 496 512"
                        >
                           <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
                        </svg>
                     </span>
                  </p>
                  <p>{test}</p>
                  <button onClick={logout}>Logout</button>
               </div>

               <div className="floatingBtn">
                  <button className="addTodo" onClick={handleClickOpen}>
                     <FiPlus />
                  </button>
               </div>

               <div className="todoSection px-4">
                  {todos.map((todo, index) => (
                     <div key={todo._id}>
                        <Card
                           index={index}
                           text={todo.todo}
                           markascompleted={todo.markascompleted}
                           checkTodo={() => {
                              checkTodo(todo._id);
                           }}
                           deleteTodo={() => {
                              _deleteTodo(todo._id);
                           }}
                        />
                     </div>
                  ))}
               </div>
            </div>
         </div>
         {dialog()}
      </div>
   );
}
