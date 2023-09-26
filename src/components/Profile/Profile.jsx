import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';
import { useFormValidator } from '../../hooks/useFormValidator';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { api } from '../../utils/MainApi';

const Profile = ({
  loggedIn,
  handleSignOut,
  setCurrentUser,
  requestError,
}) => {
  const { name, email } = useContext(CurrentUserContext);
  const {
    values,
    setValues,
    errors,
    isValid,
    setIsValid,
    handleChange,
  } = useFormValidator();

  const [responseError, setResponseError] = useState(null);
  const [responseSuccess, setResponseSuccess] = useState(null);
  const [isDataChanged, setIsDataChanged] = useState(false);

  useEffect(() => {
    if (name && email) {
      setValues({
        name: name,
        email: email,
      });
    }
  }, [name, email, setValues]);

  useEffect(() => {
    if (name !== values.name || email !== values.email) {
      setIsDataChanged(true);
    } else {
      setIsDataChanged(false);
    }
  }, [name, email, values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    api.setUserInfo({ name: values['name'], email: values['email'] })
      .then((data) => {
        setCurrentUser({ ...data, loggeIn: true });
        setResponseSuccess('Данные успешно изменены');
        setIsValid(true);
        setTimeout(() => {
          setResponseSuccess(null);
        }, 2000);
      })
      .catch((err) => {
        setResponseError('Пользователь с таким email уже зарегистрирован');
        setTimeout(() => {
          setResponseError(null);
        }, 3000);
      })
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <div className='profile__content'>
          <h1 className='profile__title'>{`Привет, ${name || ''}!`}</h1>

          <form
            id='profile__form'
            className='profile__form'
            onSubmit={handleSubmit}
          >
            <div className='profile__container'>
              <label className='profile__data'>
                <p className='profile__data-name'>Имя</p>
                <input
                  className='profile__data-input'
                  type='text'
                  placeholder='Введите имя'
                  name='name'
                  value={values?.name || ''}
                  onChange={handleChange}
                  required
                  minLength='2'
                  maxLength='23'
                />
              </label>
              <span className={`profile__error ${errors.name ? 'profile__error_active' : ''}`}>
                  {errors.name}
                </span>
              <label className='profile__data'>
                <p className='profile__data-name'>E-mail</p>
                <input
                  className='profile__data-input'
                  type='text'
                  name='email'
                  placeholder='Укажите e-mail'
                  value={values?.email || ''}
                  onChange={handleChange}
                />
                
              </label>
              <span className={`profile__error ${errors.email ? 'profile__error_active' : ''}`}>
                  {errors.email}
                </span>
            </div>
            <span className='profile__success-message'>{responseSuccess}</span>
        <span className={"profile__error_active"}>{responseError}</span>
            <div className='profile__btn-container'>
              <button
                className={`profile__btn-submit ${
                  isValid && isDataChanged ? '' : 'profile__btn-submit_disabled'
                }`}
                type='submit'
                disabled={!isValid || !isDataChanged}
              >
                Редактировать
              </button>
              <Link
                className='profile__btn-exit'
                to='/signin'
                onClick={handleSignOut}>
                Выйти из аккаунта
              </Link>
            </div>
           
          </form>
        </div>
      </section>
    </>
  );
};

export default Profile;



























// import React from 'react';
// import { Link } from "react-router-dom";
// import { useEffect, useContext, useState, useRef } from 'react';
// import Header from '../Header/Header';
// import { user } from '../../utils/const';
// import { useFormValidator } from '../../hooks/useFormValidator';
// import { CurrentUserContext } from '../../context/CurrentUserContext';
// import { regexEmail } from '../../utils/regex';

// const Profile = ({ isLoad, setIsLoad, handleUserUpdate, loggedIn, handleSignOut }) => {
//     const currentUser = useContext(CurrentUserContext);
//     const [isFormValid, setIsFormValid] = useState(false);
//     function validateForm() {
//         const isNameValid = userData.name.length >= 2 && userData.name.length <= 23;
//         // Добавьте другие проверки валидности для email и других полей, если необходимо.
//         const isEmailValid = regexEmail.test(userData.email);
//         setIsFormValid(isNameValid && isEmailValid);
//       }
//     // Создаем два состояния: одно для текущих данных, другое для данных, введенных пользователем.
//     const [userData, setUserData] = useState({
//         name: '',
//         email: '',
//     });

//     useEffect(() => {
//         // Заполняем состояние данными текущего пользователя, если currentUser существует.
//         if (currentUser) {
//             setUserData({
//                 name: currentUser.name,
//                 email: currentUser.email,
//             });

//         }
//     }, [currentUser]);
    

//     const handleChange = (evt) => {
//         const { name, value } = evt.target;

//         // Обновляем состояние данных, введенных пользователем.
//         setUserData({
//             ...userData,
//             [name]: value,
//         });
//         validateForm();
//     }

//     const handleSubmit = async (evt) => {
//         evt.preventDefault();
//         setIsLoad(true);
//         try {
//           // Создаем объект пользователя для обновления.
//           const updatedUser = {
//             name: userData.name,
//             email: userData.email,
//           };
    
//           // Отправляем данные на сервер и обновляем состояние текущего пользователя.
//           await handleUserUpdate(updatedUser);
    
//           // Может потребоваться добавить обработку успешного обновления, например, вывод сообщения.
//         } catch (error) {
//           console.error(error);
//           setIsLoad(false);
//           // Может потребоваться добавить обработку ошибки, например, вывод сообщения об ошибке.
//         }
//       };

//     return (
//         <>
//             <Header loggedIn={loggedIn}/>
//             <section className='profile'>
//                 <div className='profile__content'>
//                 <h1 className='profile__title'>{`Привет, ${userData.name || ''}!`}</h1>

//                     <form id='profile__form' className='profile__form' onSubmit={handleSubmit}>
//                         <div className='profile__container'>
//                             <label className='profile__data'>
//                                 <p className='profile__data-name'>Имя</p>
//                                 <input className='profile__data-input' type='text'
//                                     placeholder='Введите имя'
//                                     name='name'
//                                     value={userData.name}
//                                     onChange={handleChange}
//                                     required
//                                     minLength='2'
//                                     maxLength='23' />
//                             </label>
//                             <label className='profile__data'>
//                                 <p className='profile__data-name'>E-mail</p>
//                                 <input className='profile__data-input' type='text'
//                                     name='email'
//                                     placeholder='Укажите e-mail'
//                                     value={userData.email}
//                                     onChange={handleChange} />
//                             </label>
//                         </div>
//                         <div className='profile__btn-container'>
//                             <button className={`profile__btn-submit ${isFormValid ? '' : 'profile__btn-submit_disabled'}`}
//                             type='submit'
//                             disabled={!isFormValid}>
//                                 Редактировать
//                             </button>
//                             <Link className='profile__btn-exit' to='/signin' onClick={handleSignOut}> Выйти из аккаунта</Link>
//                         </div>
//                     </form>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Profile;
