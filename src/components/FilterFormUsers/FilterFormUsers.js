import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FilterFormUsers.scss";

const FilterFormUsers = () => {
  const [user, setUser] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [checkedM, setCheckM] = useState(false);
  const [checkedF, setCheckF] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://venbest-test.herokuapp.com/");
        setUser(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const filterName = user.filter((user) => {
    if (name.length !== 0) {
      return user.name.toLowerCase().includes(name.toLowerCase());
    }
    if (lastName.length !== 0) {
      return user.lastname.toLowerCase().includes(lastName.toLowerCase());
    }
    if (age.length !== 0) {
      return user.age.toString().includes(age.toLowerCase());
    }
    if (checkedM === true) {
      return user.sex.includes("m");
    }
    if (checkedF === true) {
      return user.sex.includes("f");
    }
    return user;
  });

  return (
    <div className="container">
      <div className="container_form">
        <h2>VENBEST</h2>
        <input
          type="text"
          value={name}
          placeholder="Search for name..."
          onClick={() => {
            setLastName("");
            setAge("");
            setCheckF(false);
            setCheckM(false);
          }}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          value={lastName}
          placeholder="Search for lastname..."
          onClick={() => {
            setName("");
            setAge("");
            setCheckF(false);
            setCheckM(false);
          }}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input
          type="text"
          value={age}
          placeholder="Search for age..."
          onClick={() => {
            setName("");
            setLastName("");
            setCheckF(false);
            setCheckM(false);
          }}
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>
          Male:
          <input
            onChange={() => {
              setCheckM(true);
              setCheckF(false);
              setName("");
              setLastName("");
              setAge("");
            }}
            type="checkbox"
            checked={checkedM}
          />
        </label>
        <label>
          Female:
          <input
            onChange={() => {
              setCheckF(true);
              setCheckM(false);
              setName("");
              setLastName("");
              setAge("");
            }}
            checked={checkedF}
            type="checkbox"
          />
        </label>
      </div>
      {filterName.map((users, index) => {
        return (
          <ul key={index} className="list_users">
            <li className="list_item">Имя: {users.name}</li>
            <li className="list_item">Фамилия: {users.lastname}</li>
            <li className="list_item">Возраст: {users.age}</li>
            <li className="list_item">
              Пол: {users.sex === "f" ? "Женский" : "Мужской"}
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default FilterFormUsers;
