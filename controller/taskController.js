import { v4 as uuidv4 } from "uuid";

export let data = [];
let validStatus = { TODO: "TODO", IN_PROGRESS: "IN_PROGRESS", DONE: "DONE" };

export const addTask = (req, res) => {
  let newTask = req.body;
  if (!(newTask.status in validStatus)) {
    return res.status(400).send({ Message: "Not a Valid Status" });
  }
  if (newTask.status == undefined || newTask.title == undefined) {
    res.status(400).send({ ErrorType: "Bad Request" });
  } else {
    newTask["uID"] = uuidv4();
    data.push(newTask);
    console.log(data.length);
    res.status(201).send(newTask);
  }
};

export const updateTask = (req, res) => {
  let newTask = req.body;
  let id = req.params.taskID;
  if (newTask.title == undefined && newTask.status == undefined) {
    return res.status(400).send("No update parametes provided");
  }

  if (!(newTask.status in validStatus)) {
    return res.status(400).send({ Message: "Not a Valid Status" });
  }

  //   console.log(id);
  //   console.log(data);
  let taskToBePatched = data.find((task) => {
    return task.uID == id;
  });

  if (taskToBePatched != undefined) {
    data = data.filter((task) => {
      return task.uID != id;
    });
    console.log(taskToBePatched);
    console.log(newTask);
    data.push({ ...taskToBePatched, ...newTask });
    return res.status(200).send({ Message: "Updated Successfully" });
  } else {
    res.status(404).send({ Message: " NotFound" });
  }
};

export const deleteTask = (req, res) => {
  let id = req.params.taskID;
  console.log(id);
  let taskToBeDeleted = data.find((task) => {
    return task["uID"] == id;
  });
  if (taskToBeDeleted != undefined) {
    data = data.filter((u) => {
      return u.uID != id;
    });
    res.status(200).send({ Messgae: "Deletion Successful" });
  } else {
    res.status(404).send({ Message: " NotFound" });
  }
};

export const getTask = (req, res) => {
  if (data.length == 0) {
    return res.status(200).send({ Message: "No Task Present" });
  } else {
    res.status(200).json(data);
  }
};
