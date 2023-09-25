import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { useModal } from "react-hooks-use-modal";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

const Agent = () => {
  axios.defaults.withCredentials = true;

  // Modal for adding a new agent
  // update modal
  const [Modal, open, close, isOpen] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [Modal2, open2, close2, isOpen2] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });

  // State to store the list of agents
  const [agentList, setAgentList] = useState([]);
  const [countries, setCountries] = useState([]);

  // Fetch the list of agents when the component mounts
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/agent/get")
      .then((response) => {
        setAgentList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:3001/country/getcountries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // State variables for adding a new agent
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countryId, setCountryId] = useState(null);
  // Function to add a new agent
  const addAgent = () => {
    axios
      .post("http://localhost:3001/api/agent/create", {
        name: name,
        email: email,
        password: password,
        countryId: countryId,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Agent Created Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  // State variables for updating an agent
  const [agentId, setAgentId] = useState(null);
  let [nameU, setNameU] = useState("");
  let [emailU, setEmailU] = useState("");
  let [passwordU, setPasswordU] = useState("");
  let [countryIdU, setCountryIdU] = useState(null);

  // Function to update an agent
  const updateAgent = () => {
    axios
      .put(`http://localhost:3001/api/agent/update/${agentId}`, {
        nameU: nameU,
        emailU: emailU,
        passwordU: passwordU,
        countryIdU: countryIdU,
      })
      .then(() => {
        Swal.fire({
          position: "top",
          icon: "success",
          title: "Agent Updated Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  // Function to delete an agent
  const deleteAgent = (id) => {
    axios
      .delete(`http://localhost:3001/api/agents/delete/${id}`)
      .then((response) => {
        setAgentList(agentList.filter((agent) => agent.agent_id !== id));
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  return (
    <div className="flex h-auto">
      <Sidebar />
      <div className="relative h-1/2 mt-20 w-1/2 overflow-x-auto ml-40 shadow-md sm:rounded-lg">
        <button
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={open}
        >
          Create Agent
        </button>
        {/* Agent creation modal */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
          <Modal>
            <div className="bg-white p-14 rounded-xl">
              {/* Modal header */}
              <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
                <h3 className="text-xl font-semibold dark:text-white">
                  Add an Agent
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                  data-modal-toggle="add-user-modal"
                  onClick={close}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              {/* Agent creation form */}
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter agent's name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                      />
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter agent's email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="Enter agent's password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Country
                      </label>
                      <select
                        type="password"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        onChange={(event) =>
                          setCountryId(event.target.value.split("-")[0])
                        }
                      >
                        <option>Null</option>

                        {countries?.map((country) => {
                          return (
                            <option>
                              {country.Id}-{country.Name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                </form>
              </div>
              {/* Agent creation button */}
              <div className="items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700">
                <button
                  onClick={addAgent}
                  className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                  Create Agent
                </button>
              </div>
            </div>
          </Modal>
        </div>
        {/* Agent list */}
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>

              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {agentList.map((agent) => (
              <tr
                key={agent.agent_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {agent.Name}
                </td>
                <td className="px-6 py-4">{agent.Email}</td>
                <td className="px-6 py-4">{agent.Password.slice(0, 3)}</td>
                <td className="px-2">
                  <button
                    onClick={() => {
                      setAgentId(agent.agent_id);
                      open2();
                      setNameU((nameU = agent.Name));
                      setEmailU((emailU = agent.Email));
                      setPasswordU((passwordU = agent.Password));
                    }}
                    className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                  >
                    <AiOutlineEdit />
                  </button>
                  <button
                    onClick={() => {
                      deleteAgent(agent.agent_id);
                    }}
                    className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                  >
                    <BsFillTrash3Fill />
                  </button>
                </td>
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
                  <Modal2>
                    <div className=" bg-white p-14 rounded-xl">
                      <button
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white"
                        data-modal-toggle="add-user-modal"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                      <section className="bg-white dark:bg-gray-900">
                        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
                            Update Postman with ID: {agentId}
                          </h2>
                          <form action="">
                            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                              <div className="sm:col-span-2">
                                <label
                                  forHtml="name"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Name{" "}
                                </label>
                                <input
                                  value={nameU}
                                  type="text"
                                  name="nameU"
                                  id="Name"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Type postman's name"
                                  required=""
                                  onChange={(e) => {
                                    setNameU(e.target.value);
                                  }}
                                />
                                <label
                                  for="LastName"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Email
                                </label>
                                <input
                                  value={emailU}
                                  type="email"
                                  name="lastnameU"
                                  id="LastName"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Type postman's lastname"
                                  required=""
                                  onChange={(e) => {
                                    setEmailU(e.target.value);
                                  }}
                                />
                                <label
                                  forHtml="phonenumber"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Password
                                </label>
                                <input
                                  value={passwordU}
                                  type="password"
                                  name="password"
                                  id="password"
                                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder="Type postman's phone number"
                                  required=""
                                  onChange={(e) => {
                                    setPasswordU(e.target.value);
                                  }}
                                />
                                <label
                                  htmlFor="password"
                                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                  Country
                                </label>
                                <select
                                  type="password"
                                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  onChange={(event) =>
                                    setCountryIdU(
                                      event.target.value.split("-")[0]
                                    )
                                  }
                                >
                                  <option>Null</option>

                                  {countries?.map((country) => {
                                    return (
                                      <option>
                                        {country.Id}-{country.Name}
                                      </option>
                                    );
                                  })}
                                </select>
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                updateAgent(agentId);
                              }}
                              type="submit"
                              className="bg-gradient-to-r text-white from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 w-14 h-25"
                            >
                              <AiOutlineEdit />
                            </button>
                          </form>
                        </div>
                      </section>
                    </div>
                  </Modal2>
                </div>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Agent;
