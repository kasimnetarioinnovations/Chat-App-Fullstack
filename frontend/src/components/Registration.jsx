import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  try {
    const response = await fetch(`${backendurl}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (response.ok) {
        localStorage.setItem("currentUser", JSON.stringify(result.user));
          window.location.href = "/chat";
      alert("User registered successfully");
      setFormData({ name: '', email: '', password: '' });
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    alert("Server error: " + error.message);
  }
};
useEffect(() => {
  socket.emit("user-connected", currentUser._id);

  return () => {
    socket.emit("user-disconnected", currentUser._id);
  };
}, []);



  const styles = {
    container: {
      fontFamily: "'Segoe UI', sans-serif",
      background: 'linear-gradient(to right, #83a4d4, #b6fbff)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0
    },
    formBox: {
      backgroundColor: '#fff',
      padding: '30px 40px',
      borderRadius: '10px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
      maxWidth: '400px',
      width: '100%'
    },
    heading: {
      textAlign: 'center',
      marginBottom: '25px',
      color: '#333'
    },
    formGroup: {
      marginBottom: '20px'
    },
    label: {
      display: 'block',
      fontWeight: '600',
      marginBottom: '5px',
      color: '#555'
    },
    input: {
      width: '100%',
      padding: '10px 15px',
      border: '1px solid #ccc',
      borderRadius: '6px',
      fontSize: '15px'
    },
    button: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#4a90e2',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Registration Form</h2>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="naam">Name</label>
          <input
            style={styles.input}
            type="text"
            id="name"
            name="name"
            placeholder="Type your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            style={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Type your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label} htmlFor="password">Password</label>
          <input
            style={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="Type your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button style={styles.button} type="submit">Register Now</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
