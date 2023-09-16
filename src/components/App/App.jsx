import React from "react";
import { Route, Routes } from "react-router-dom";
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";

function App() {
  return (
    <CurrentUserContext.Provider value={{}}>
      <div className="page">
        <>
          <Routes>

            <Route
              path='/'
              element={<Main />}
            />

            <Route
              path='*'
              element={<NotFound />}
            />

            <Route
              path='/signup'
              element={<Register />}
            />

            <Route
              path='/signin'
              element={<Login />}
            />

            <Route
              path='/profile'
              element={<Profile />}
            />

            <Route
              path='/movies'
              element={<Movies />}
            />

            <Route
              path='/saved-movies'
              element={<SavedMovies />}
            />
          </Routes>
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
