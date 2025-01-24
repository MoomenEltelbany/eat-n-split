import { useState } from "react";
import "./index.css";

// Todo: Handle the Select buttons and how to toggle them
// Todo: Update the name in the bill automatically

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

function Button({ children, onClick }) {
    return (
        <button className="button" onClick={onClick}>
            {children}
        </button>
    );
}

export default function App() {
    const [friendsList, setFriendsList] = useState(initialFriends);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showSplitForm, setShowSplitForm] = useState(false);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleAddForm() {
        setShowAddForm((show) => !show);
        setShowSplitForm(false);
        setSelectedFriend(null);
    }

    function handleAddFriend(friend) {
        setFriendsList((friends) => [...friends, friend]);
        setShowAddForm(false);
    }

    function handleSelectedFriend(friend) {
        setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));

        if (friend?.id !== selectedFriend?.id) {
            setShowSplitForm(null);
        }

        setShowSplitForm((show) => !show);
        setShowAddForm(false);
    }

    return (
        <main className="app">
            <section className="sidebar">
                <FriendList
                    friendsList={friendsList}
                    onSelection={handleSelectedFriend}
                    selectedFriend={selectedFriend}
                />
                {showAddForm && <FormAddFriend onAddFriend={handleAddFriend} />}
                <Button onClick={handleAddForm}>
                    {showAddForm ? "Close" : "Add Friend"}
                </Button>
            </section>
            {showSplitForm && <FormSplitBill selectedFriend={selectedFriend} />}
        </main>
    );
}

function FriendList({ friendsList, onSelection, selectedFriend }) {
    return (
        <ul>
            {friendsList.map((friend) => (
                <FriendData
                    key={friend.id}
                    friend={friend}
                    onSelection={onSelection}
                    selectedFriend={selectedFriend}
                />
            ))}
        </ul>
    );
}

function FriendData({ friend, onSelection, selectedFriend }) {
    const isSelected = friend.id === selectedFriend?.id;

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
            <Button onClick={() => onSelection(friend)}>
                {isSelected ? "Close" : "Select"}
            </Button>
        </li>
    );
}

function FormAddFriend({ onAddFriend }) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("https://i.pravatar.cc/48");

    function handleAddFriend(e) {
        e.preventDefault();

        if (!name) return;

        const friend = {
            name,
            image,
            balance: 0,
            id: crypto.randomUUID(),
        };

        onAddFriend(friend);
        setName("");
    }

    return (
        <form className="form-add-friend" onSubmit={(e) => handleAddFriend(e)}>
            <label>🧑🏻‍🎄 Name</label>
            <input
                type="text"
                placeholder="Friend's name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>🌄 Image</label>
            <input
                type="text"
                placeholder="Friend's image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                disabled
            />
            <Button>Add</Button>
        </form>
    );
}

function FormSplitBill({ selectedFriend }) {
    const [totalAmount, setTotalAmount] = useState("");
    const [userExpense, setUserExpense] = useState("");

    const friendExpense = function (totalAmount, userExpense) {
        if (userExpense > totalAmount) return totalAmount;

        return totalAmount - userExpense;
    };

    return (
        <form className="form-split-bill">
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>💰 Bill value</label>
            <input
                type="text"
                value={totalAmount}
                onChange={(e) => setTotalAmount(Number(e.target.value))}
            />

            <label>🧍🏻 Your expense: </label>
            <input
                type="text"
                value={userExpense}
                onChange={(e) => setUserExpense(Number(e.target.value))}
            />

            <label>👫 {selectedFriend.name}'s expense: </label>
            <input
                type="text"
                disabled
                value={
                    userExpense > totalAmount ? 0 : totalAmount - userExpense
                }
            />

            <label>🤑 Who is paying the bill? </label>
            <select>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}
