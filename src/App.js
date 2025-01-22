import { useState } from "react";
import "./index.css";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

function Button({ children, onAddForm }) {
    return (
        <button className="button" onClick={onAddForm}>
            {children}
        </button>
    );
}

export default function App() {
    const [friendsList, setFriendsList] = useState(initialFriends);
    const [showAddForm, setShowAddForm] = useState(false);

    function handleAddForm() {
        setShowAddForm((show) => !show);
    }

    return (
        <main className="app">
            <aside className="sidebar">
                <FriendList friendsList={friendsList} />
                {showAddForm && <FormAddFriend />}
                <Button onAddForm={handleAddForm}>
                    {showAddForm ? "Close" : "Add Friend"}
                </Button>
            </aside>
        </main>
    );
}

function FriendList({ friendsList }) {
    return (
        <ul>
            {friendsList.map((friend) => (
                <FriendData friend={friend} />
            ))}
        </ul>
    );
}

function FriendData({ friend }) {
    return (
        <li>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>
            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} ${Math.abs(friend.balance)}
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes you ${friend.balance}
                </p>
            )}
            {friend.balance === 0 && <p>You and {friend.name} are even</p>}
        </li>
    );
}

function FormAddFriend() {
    return (
        <form className="form-add-friend">
            <label>🧑🏻‍🎄 Name</label>
            <input type="text" placeholder="Friend's name" />

            <label>🌄 Image</label>
            <input type="text" placeholder="Friend's image" />
        </form>
    );
}
