import { useState } from "react";
import "./NewUserForm.css";

export default function NewUserForm() {
  const [error, setError] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState({
    city: '',
    street: '',
    number: '',
    zipcode: '',
  });
  const [phoneNumber, setPhoneNumber] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://fakestoreapi.com/users`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            email: email,
            name: {
              firstname: firstName,
              lastname: lastName,
            },
            address: {
              city: address.city,
              street: address.street,
              number: address.number,
              zipcode: address.zipcode,
            },
            phone: phoneNumber,
          }),
        }
      );

      if (response.ok) {
        console.log("User created successfully.");
      } else {
        console.log("User creation failed.");
        setError("User creation failed.");
      }

      const result = await response.json();
      return result;

    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="NewForm">
      <h2 style={{fontWeight:"bolder"}}>Sign Up</h2>
      <br />
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <br />  
        <label>
          Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>{" "}
        <br />

        <label>
          Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>{" "}
        <br />
        <br />
        <label>
          Email: <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>{" "}
        <br />

        <label>
          First Name: <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>{" "}
        <br />

        <label>
          Last Name: <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>{" "}
        <br />
        <br />
        <label>
          Address: <br />
          City: <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          Street: <input type="text" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
          Number: <input type="text" value={address.number} onChange={(e) => setAddress({ ...address, number: e.target.value })} />
          Zipcode: <input type="text" value={address.zipcode} onChange={(e) => setAddress({ ...address, zipcode: e.target.value })} />
        </label>{" "}
        <br />

        <label>
          Phone Number: <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </label>{" "}
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
