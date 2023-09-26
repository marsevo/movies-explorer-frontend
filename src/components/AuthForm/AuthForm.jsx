import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormValidator } from "../../hooks/useFormValidator";
import { useEffect } from "react";

const AuthForm = ({ settings, onSubmit, requestError }) => {
  const { values, errors, handleChange, isValid } = useFormValidator({
    name: '',
    email: '',
    password: '',
  });
  const [responseError, setResponseError] = useState(null);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (isValid) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.log('error in catch', error);
      }
    }
  };

  useEffect(() => {
    let timeoutId;
    if (requestError) {
      setResponseError(requestError);
      timeoutId = setTimeout(() => {
        setResponseError(null);
      }, 2000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [requestError]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Link className="form__link" to={"/"}>
        <img className="form__logo" src={logo} alt="Логотип" />
      </Link>

      <h1 className="form__title">{settings.title}</h1>

      {settings.type === "register" && (
        <div className="form__input">
          <label className="form__input-label">Имя</label>
          <input
            className="form__input-field"
            type="text"
            name="name"
            placeholder="Введите имя"
            minLength="2"
            maxLength="40"
            required
            value={values.name}
            onChange={handleChange}
          />
          <span className={`form__error ${errors.name ? "form__error_active" : ""}`}>
            {errors.name}
          </span>
        </div>
      )}

      <div className="form__input">
        <label className="form__input-label">E-mail</label>
        <input
          className="form__input-field"
          type="email"
          name="email"
          placeholder="Введите email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className={`form__error ${errors.email ? "form__error_active" : ""}`}>
          {errors.email}
        </span>
      </div>

      <div className="form__input">
        <label className="form__input-label">Пароль</label>
        <input
          className="form__input-field"
          type="password"
          name="password"
          placeholder="Введите пароль"
          minLength="8"
          maxLength="16"
          required
          value={values.password}
          onChange={handleChange}
        />
        <span className={`form__error ${errors.password ? "form__error_active" : ""}`}>
          {errors.password}
        </span>
      </div>

      {/* Вывод сообщения об ошибке запроса */}
      <span className={"form__error form__error_active"}>
        {requestError ? responseError : null}
      </span>

      {settings.type === "register" && (
        <button
          className={`form__button form__button_space-reg ${isValid ? "" : "form__button_disabled"
            }`}
          type="submit"
          disabled={!isValid}
        >
          {settings.buttonText}
        </button>
      )}

      {settings.type === "login" && (
        <button
          className={`form__button form__button_space-log ${isValid ? "" : "form__button_disabled"
            }`}
          type="submit"
          disabled={!isValid}
        >
          {settings.buttonText}
        </button>
      )}

      <span className="form__button-text">
        {settings.relocationText}
        <Link className="form__button-text-link" to={settings.relocationRoute}>
          {settings.relocationLink}
        </Link>
      </span>
    </form>
  );
};

export default AuthForm;
