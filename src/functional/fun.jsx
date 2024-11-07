import axios from "axios";
import { useEffect, useState } from "react";

function Axios() {
    const [data, setData] = useState([]);

    function fetchData() {
        axios.get("http://localhost:3000/posts", {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response.data);
            setData(response.data);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    const del = (val) => {
        axios.delete(`http://localhost:3000/posts/${val.id}`).then((response) => {
            console.log(response);
            fetchData(); // Refresh data after deletion
        });
    };

    const dat = data.map((val, ind) => (
        <div key={ind}>
            <li>{val.title}</li>
            <button onClick={() => del(val)}>Delete</button>
        </div>
    ));

    const handleSubmit = (e) => {
        e.preventDefault();
        const newPost = {
            title: e.target[0].value
        };

        axios.post("http://localhost:3000/posts", newPost, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response);
            fetchData(); // Refresh data after adding a new post
        });
    };

    return (
        <>
            <h1>Hi, Todo with Axios</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" />
                <input type="submit" value="Submit" />
            </form>

            <ul>
                {dat}
            </ul>
        </>
    );
}

export default Axios;
