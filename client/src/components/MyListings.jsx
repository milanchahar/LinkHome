import { useEffect, useState } from "react";
import axios from "axios";

const MyListings = () => {
  const [myRooms, setMyRooms] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyRooms = async () => {
      const res = await axios.get("http://localhost:5001/api/listings");
      const filtered = res.data.filter(
        (room) => Number(room.ownerId) === Number(user.id),
      );
      setMyRooms(filtered);
    };
    fetchMyRooms();
  }, [user.id]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5001/api/listings/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      setMyRooms(myRooms.filter((room) => room.id !== id));
      alert("Deleted successfully!");
    } catch (err) {
      alert("Error deleting room.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Posted Rooms</h2>
      {myRooms.length === 0 ? (
        <p>You haven't posted any rooms yet.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {myRooms.map((room) => (
            <div
              key={room.id}
              style={{
                border: "2px solid #2c3e50",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h3>{room.title}</h3>
              <p>
                {room.area}, {room.city}
              </p>
              <button
                onClick={() => handleDelete(room.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                Remove Listing
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyListings;
