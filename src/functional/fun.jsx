import axios from "axios";
import { useEffect, useState } from "react";

function Axios() {
    const [data, setData] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

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

    const handleEdit = (val) => {
        setEditingId(val.id);
        setEditingTitle(val.title);
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3000/posts/${editingId}`, { title: editingTitle }, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            console.log(response);
            setEditingId(null);
            setEditingTitle("");
            fetchData(); // Refresh data after edit
        });
    };

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

    const dat = data.map((val, ind) => (
        <div key={ind}>
            <li>{val.title}</li>
            <button onClick={() => del(val)}>Delete</button>
            <button onClick={() => handleEdit(val)}>Edit</button>
        </div>
    ));

    return (
        <>
            <h1>Hi, Todo with Axios</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Add new post" />
                <input type="submit" value="Submit" />
            </form>

            <ul>
                {dat}
            </ul>

            {editingId && (
                <form onSubmit={handleEditSubmit}>
                    <input 
                        type="text" 
                        value={editingTitle} 
                        onChange={(e) => setEditingTitle(e.target.value)} 
                    />
                    <input type="submit" value="Update" />
                </form>
            )}
        </>
    );
}

export default Axios;
