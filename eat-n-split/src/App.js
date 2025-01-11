import { useState } from "react";
import "./App.css";

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

function App() {
    return (
        <main className="container">
            <FriendsList />
            <SplitBill />
        </main>
    );
}

function FriendsList() {
    const [addFriendForm, setAddFriendForm] = useState(false);

    function handleIsActive() {
        setAddFriendForm((addFriendForm) => !addFriendForm);
    }

    return (
        <section className="friends-list">
            {initialFriends.map((friend) => {
                return (
                    <FriendCard
                        name={friend.name}
                        image={friend.image}
                        balance={friend.balance}
                        key={friend.id}
                    />
                );
            })}
            <Button onAddFriendForm={handleIsActive}>
                {addFriendForm ? "Close Form" : "Add Friend"}
            </Button>
            <AddFriendForm addFriendForm={addFriendForm} />
        </section>
    );
}

function FriendCard({ name, image, balance }) {
    return (
        <div className="friend-data">
            <img src={image} alt="Friend's" />
            <div className="friend-info">
                <p className="name">{name}</p>
                <p className="money-state">Your balance is {balance}€</p>
            </div>
            <Button>Close</Button>
        </div>
    );
}

function AddFriendForm({ addFriendForm }) {
    return (
        <form style={{ display: addFriendForm ? "block" : "none" }}>
            <div>
                <label>Friend's name 😍?</label>
                <input type="text" placeholder="Friend's name ..." />
            </div>
            <div>
                <label>Friend's photo 📸?</label>
                <input
                    type="text"
                    placeholder="Friend's photo ..."
                    value="https://i.pravatar.cc/48"
                />
            </div>
            <Button>Confirm</Button>
        </form>
    );
}

function SplitBill() {
    return (
        <aside>
            <h2>Split a bill with (Clark)</h2>
            <div>
                💸
                <label>Bill Value</label>
                <input type="number" />
            </div>
            <div>
                🧍🏻‍♂️
                <label>Your expense</label>
                <input type="number" />
            </div>
            <div>
                👫
                <label>Clark's expense</label>
                <input type="number" disabled />
            </div>
            <div>
                🤑
                <label>Who's paying the bell?</label>
                <select>
                    <option value="you">You</option>
                    <option value="other">Clark</option>
                </select>
            </div>
            <Button>Split Bill</Button>
        </aside>
    );
}

function Button({ children, onAddFriendForm }) {
    return <button onClick={onAddFriendForm}>{children}</button>;
}

export default App;
