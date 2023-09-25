import React, { useRef, useEffect, useState } from "react";
import logo2 from "../../img/logo2.png";
import logoFigure from "../../img/loginFigure.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const user_rgx = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const email_rgx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const password_rgx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%])?.{8,24}$/;
const addressRegex = /^[A-Za-z0-9\s\.,\-/#]{1,100}$/;
const cityRegex = /^[a-zA-Z\s'-]{2,50}$/;
const phoneRegex = /^\d{9}$/;

const SignUp = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);
  const [nameFocus, setNameFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [addressFocus, setAddressFocus] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [countryId, setCountryId] = useState("");
  console.log(countryId);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = user_rgx.test(name);

    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = password_rgx.test(password);

    setValidPassword(result);
  }, [password]);

  useEffect(() => {
    const result = email_rgx.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = addressRegex.test(address);

    setValidAddress(result);
  }, [address]);

  useEffect(() => {
    const result = cityRegex.test(city);

    setValidCity(result);
  }, [city]);

  useEffect(() => {
    const result = phoneRegex.test(phone);

    setValidPhone(result);
  }, [phone]);

  useEffect(() => {
    setErrMsg("");
  }, [name, email, password, address, city, phone]);
  const [countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/widgets/getCountries")
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validName &&
      validEmail &&
      validPassword &&
      validAddress &&
      validCity &&
      validPhone
    ) {
      axios
        .post("http://localhost:3001/api/register", {
          name: name,
          email: email,
          password: password,
          address: address,
          city: city,
          phone: phone,
          countryId: Number(countryId),
        })
        .then(() => {
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Register Succesfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/signin");
        });
    } else {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Register error!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="h-screen w-full flex bg-orange-50">
      <div className="grid grid-cols-1 md:grid-cols-2 m-auto mt-10 shadow-lg bg-orange-50 sm:max-w-[1000px] h-[650px] rounded-lg">
        <form
          onSubmit={handleSubmit}
          className="  max-w-[350px] h-[500px] w-full rounded-lg mx-auto bg-orange-50  p-7"
        >
          <div className="w-14 mb-0">
            <img className="rounded-lg " src={logo2} />
          </div>
          <h2 className="text-2xl font-bold text-center py-1">Sign Up</h2>
          <div className="flex flex-col py-2 mb-2">
            <label htmlFor="name" className="text-xs ">
              Name
              {!validName && (name || nameFocus) && (
                <span className="invalid ">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              )}
              {validName && (
                <span className="valid">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
              )}
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              required
              name="name"
              className="text-xs  border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="Name"
              ref={userRef}
              autoComplete="off"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="nidnote"
              onFocus={() => setNameFocus(true)}
              onBlur={() => setNameFocus(false)}
              id="name"
            />

            <p
              id="eidnote"
              className={`instructions ${
                nameFocus && name && !validName ? "" : "hidden"
              } font-sans text-xs mt-2`}
            >
              <FontAwesomeIcon icon={faInfoCircle} className="" />
              <span className="font-bold ml-2 ">4 to 24 characters.</span>
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label htmlFor="email" className="text-xs ">
              Email
              {!validEmail && (email || emailFocus) && (
                <span className="invalid ">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              )}
              {validEmail && (
                <span className="valid">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
              )}
            </label>
            <input
              ref={userRef}
              onChange={(e) => setEmail(e.target.value)}
              required
              name="email"
              className="text-xs  border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="user@gmail.com"
              autoComplete="off"
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="eidnote"
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              id="email"
            />
            <p
              id="eidnote"
              className={`instructions ${
                emailFocus && email && !validEmail ? "" : "hidden"
              } font-sans text-xs mt-2`}
            >
              <span className="font-bold ml-2 ">Invalid email address</span>
              <br />
            </p>
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label htmlFor="password" className="text-xs ">
              Password
              {!validPassword && (password || passwordFocus) && (
                <span className="invalid ">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              )}
              {validPassword && (
                <span className="valid">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
              )}
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="password"
              placeholder="Password"
              required
              aria-invalid={validPassword ? "false" : "true"}
              aria-describedby="pidnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              id="password"
            />
            <p
              id="pidnote"
              className={`instructions ${
                passwordFocus && password && !validPassword ? "" : "hidden"
              } font-sans text-xs mt-2`}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              <span className="font-bold ml-2 "> 8 to 24 characters</span>
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at simbol">@</span>{" "}
              <span aria-label="hashtag">#</span>
              <span aria-label="dollar sign">$</span>
              <span aria-label="percent">%</span>
            </p>
          </div>
          <div className="flex flex-col py-2 mb-2">
            <label htmlFor="address" className="text-xs ">
              Address
              {!validAddress && (address || addressFocus) && (
                <span className="invalid ">
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-red-500 ml-2"
                  />
                </span>
              )}
              {validAddress && (
                <span className="valid">
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-green-500 ml-2"
                  />
                </span>
              )}
            </label>
            <input
              onChange={(e) => setAddress(e.target.value)}
              name="address"
              className="text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
              type="text"
              placeholder="Address"
              required
              ref={userRef}
              autoComplete="off"
              aria-invalid={validAddress ? "false" : "true"}
              aria-describedby="aidnote"
              onFocus={() => setAddressFocus(true)}
              onBlur={() => setAddressFocus(false)}
              id="address"
            />
          </div>
          <div className="flex flex-row py-2 mb-0 ">
            <div className="flex flex-col py-2 pr-4 mb-0">
              <label htmlFor="city" className="text-xs ">
                Country
                {!validCity && (city || cityFocus) && (
                  <span className="invalid ">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 ml-2"
                    />
                  </span>
                )}
                {validCity && (
                  <span className="valid">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500 ml-2"
                    />
                  </span>
                )}
              </label>
              <select
                onChange={(e) => setCountryId(e.target.value.split("-")[0])}
                name="country"
                className="w-full text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
                type="text"
                placeholder="Country"
                required
                ref={userRef}
                autoComplete="off"
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="cidnote"
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
                id="country"
              >
                {countries?.map((country) => {
                  return (
                    <option>
                      {country.Id} - {country.Name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col py-2 pr-4 mb-0">
              <label htmlFor="city" className="text-xs ">
                City
                {!validCity && (city || cityFocus) && (
                  <span className="invalid ">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 ml-2"
                    />
                  </span>
                )}
                {validCity && (
                  <span className="valid">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500 ml-2"
                    />
                  </span>
                )}
              </label>
              <input
                onChange={(e) => setCity(e.target.value)}
                name="city"
                className="w-full text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
                type="text"
                placeholder="City"
                required
                ref={userRef}
                autoComplete="off"
                aria-invalid={validCity ? "false" : "true"}
                aria-describedby="cidnote"
                onFocus={() => setCityFocus(true)}
                onBlur={() => setCityFocus(false)}
                id="city"
              />
            </div>
            <div className="flex flex-col py-2 pl-4 m-0">
              <label htmlFor="phone" className="text-xs ">
                Phone
                {!validPhone && (phone || phoneFocus) && (
                  <span className="invalid ">
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-red-500 ml-2"
                    />
                  </span>
                )}
                {validPhone && (
                  <span className="valid">
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="text-green-500 ml-2"
                    />
                  </span>
                )}
              </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
                className="w-full text-xs border border-transparent rounded-md shadow-lg shadow-gray-300  bg-orange-100 border p-2 border relative bg-red-50  rounded shadow-gray-300"
                type="text"
                placeholder="Phone"
                required
                ref={userRef}
                autoComplete="off"
                aria-invalid={validPhone ? "false" : "true"}
                aria-describedby="pHidnote"
                onFocus={() => setPhoneFocus(true)}
                onBlur={() => setPhoneFocus(false)}
                id="phone"
              />
              <p
                id="pHidnote"
                className={`instructions ${
                  phoneFocus && phone && !validPhone ? "" : "hidden"
                } font-sans text-xs mt-2`}
              >
                <span className="font-bold ml-2 text-xs">
                  {" "}
                  Must contain 9 numbers
                </span>
                <br />
              </p>
            </div>
          </div>
          <button className="text-xs border w-full bg-orange-500 hover:bg-orange-600 border-2 text-white  border border-transparent rounded-lg my-3 py-2">
            Sign Up
          </button>
        </form>
        <div className="w-full h-[550px] hidden md:block mt-10 ">
          <img className="w-full h-full " src={logoFigure} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
