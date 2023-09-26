import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import Main from "../Main/Main";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Profile from "../Profile/Profile";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { api } from '../../utils/MainApi';

function App() {
  const userIdInLocalStorage = localStorage.getItem('userData');
  const [currentUser, setCurrentUser] = useState({
    name: null,
    email: null,
    loggeIn: !!userIdInLocalStorage,
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const [savedMovies, setSavedMovies] = useState([]);
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      api.getContent(token)
        .then((userData) => {
          setLoggedIn(true);
          setCurrentUser(userData);
          localStorage.setItem('userData', JSON.stringify(userData));
          setIsLoad(true);
        })
        .catch((err) => {
          console.log(err);
          setLoggedIn(false);
          localStorage.removeItem('jwt');
          localStorage.removeItem('userData');
          setIsLoad(false);
        });
    } else {
      setLoggedIn(false);
      setIsLoad(false);
    }
  }, []);


  function handleLogin(email, password) {
    setRequestError(null);
    api.authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('email', email);
          setLoggedIn(true);
          navigate("/movies");
        }
      })
      .catch((err) => {
        setRequestError(err);
        console.log(`ошибка ${err}`)
      });
  }

  function handleRegister(name, email, password) {
    api.register({ name, email, password }).then(() => {
      navigate("/signin", { replace: true });
    })
      .catch(err => {
        setRequestError(err);
        console.log(err);
      });
  }

  function signOut() {
    localStorage.removeItem("jwt");
    localStorage.clear();
    setLoggedIn(false);
  }

  function handleSignOut() {
    api.logout();
    setCurrentUser({
      name: '',
      email: '',
    });
    localStorage.clear();
    setLoggedIn(false);
    navigate("/signin", { replace: true });
  }

  function handleSaveMovie(movie) {
    api.saveMovie(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (!loggedIn) return;
    Promise.all([api.getUserInfo(), api.getSavedMovies()])
      .then(([user, movies]) => {
        setCurrentUser({
          name: user.name,
          email: user.email
        });
        setSavedMovies(movies);
        localStorage.removeItem('shortMovies');
      })
      .catch((err) => {
        console.error('Ошибка при получении данных:', err);
      });
  }, [loggedIn]);

  function handleDeleteMovie(movie) {
    api.deleteMovie(movie._id)
      .then(() => {
        setSavedMovies(savedMovies =>
          savedMovies.filter(savedMovie => savedMovie._id !== movie._id)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <>
          <Routes>
            <Route
              path='/'
              element={<Main loggedIn={loggedIn} />}
            />
            <Route
              path='/profile'
              element={<ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isLoad={isLoad}
                setIsLoad={setIsLoad}
                onSignOut={signOut}
                handleSignOut={handleSignOut}
                setCurrentUser={setCurrentUser}
                requestError={requestError}
              />}
            />

            <Route
              path='/movies'
              element={<ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                savedMovies={savedMovies}
                handleSaveMovie={handleSaveMovie}
                handleDeleteMovie={handleDeleteMovie}
              />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRoute
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  savedMovies={savedMovies}
                  handleSaveMovie={handleSaveMovie}
                  handleDeleteMovie={handleDeleteMovie}
                />}
            />
            <>
              <Route
                path='*'
                element={<NotFound />}
              />

              <Route
                path='/signup'
                element={loggedIn ? (
                  <Navigate to='/movies' replace />
                ) : (
                  <Register
                    onRegister={handleRegister}
                    requestError={requestError} />
                )
                }
              />

              <Route
                path='/signin'
                element={loggedIn ? (
                  <Navigate to='/movies' replace />
                ) : (

                  <Login onLogin={handleLogin}
                    requestError={requestError}
                  />
                )
                }
              />
            </>

          </Routes>
        </>
      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
