import axios from "axios";

const authAPI = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/`
});

export const registerService = ({ name, email, password, profile, location }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/register", { name, email, password, profile, location })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logInService = ({ email, password }) =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/login", { email, password })
      .then(response => {
        const user = response.data.user;
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const verifyService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .get("/verify")
      .then(response => {
        const user = response.data.user.user;
        console.log("USER DATA SUCCES FROM verifyservice in auth", response);
        resolve(user);
      })
      .catch(error => {
        reject(error);
      });
  });

export const logOutService = () =>
  new Promise((resolve, reject) => {
    authAPI
      .post("/logout")
      .then(() => {
        resolve();
        console.log("USER LOGGED OUT FROM THE SERVICE");
      })
      .catch(error => {
        reject(error);
      });
  });

export const uploadImage = theFile => {
  return new Promise((resolve, reject) => {
    authAPI
      .post("/upload", theFile)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const editUser = (id, updatedUser) => {
  return new Promise((resolve, reject) => {
    console.log("updated", updatedUser);
    authAPI
      .patch(`/user/${id}/edit`, updatedUser)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};
