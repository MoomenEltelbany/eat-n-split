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
    const [friendsList, setFriendsList] = useState(initialFriends);
    const [activeSplitBillForm, setActiveSplitBillForm] = useState(false);
    const [chosenFriend, setChosenFriend] = useState("");

    return (
        <main className="container">
            <FriendsList
                friendsList={friendsList}
                setFriendsList={setFriendsList}
                setActiveSplitBillForm={setActiveSplitBillForm}
                activeSplitBillForm={activeSplitBillForm}
            />
            <SplitBill activeSplitBillForm={activeSplitBillForm} />
        </main>
    );
}

function FriendsList({
    friendsList,
    setFriendsList,
    setActiveSplitBillForm,
    activeSplitBillForm,
}) {
    const [addFriendForm, setAddFriendForm] = useState(false);

    function handleIsActive() {
        setAddFriendForm((addFriendForm) => !addFriendForm);
    }

    return (
        <section className="friends-list">
            {friendsList.map((friend) => {
                return (
                    <FriendCard
                        name={friend.name}
                        image={friend.image}
                        balance={friend.balance}
                        key={friend.id}
                        setActiveSplitBillForm={setActiveSplitBillForm}
                        activeSplitBillForm={activeSplitBillForm}
                    />
                );
            })}
            <Button onAddFriendForm={handleIsActive}>
                {addFriendForm ? "Close Form" : "Add Friend"}
            </Button>
            <AddFriendForm
                addFriendForm={addFriendForm}
                friendsList={friendsList}
                setFriendsList={setFriendsList}
            />
        </section>
    );
}

function FriendCard({
    name,
    image,
    balance,
    setActiveSplitBillForm,
    activeSplitBillForm,
}) {
    return (
        <div className="friend-data">
            <img src={image} alt="Friend's" />
            <div className="friend-info">
                <p className="name">{name}</p>
                <p className="money-state">You and {name} are even</p>
            </div>
            <Button setActiveSplitBillForm={setActiveSplitBillForm}>
                {activeSplitBillForm ? "Close" : "Select"}
            </Button>
        </div>
    );
}

function AddFriendForm({ addFriendForm, setFriendsList }) {
    const [friendName, setFriendName] = useState("");
    const [friendImage, setFriendImage] = useState("https://i.pravatar.cc/48");

    function handleAddFriendList() {
        const newFriend = {
            name: friendName,
            image: friendImage,
            balance: 0,
            id: `${friendName}-${friendImage}`,
        };

        setFriendsList((friends) => [...friends, newFriend]);

        setFriendName("");
    }
    return (
        <form style={{ display: addFriendForm ? "block" : "none" }}>
            <div>
                <label>Friend's name 😍?</label>
                <input
                    type="text"
                    placeholder="Friend's name ..."
                    value={friendName}
                    onChange={(e) => setFriendName(e.target.value)}
                />
            </div>
            <div>
                <label>Friend's photo 📸?</label>
                <input
                    type="text"
                    placeholder="Friend's photo ..."
                    value={friendImage}
                />
            </div>
            <Button onAddFriendList={handleAddFriendList}>Confirm</Button>
        </form>
    );
}

function SplitBill({ activeSplitBillForm }) {
    return (
        <>
            {activeSplitBillForm && (
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
            )}
        </>
    );
}

function Button({
    children,
    onAddFriendForm,
    onAddFriendList,
    setActiveSplitBillForm,
}) {
    function handleClick(e) {
        e.preventDefault();
        if (onAddFriendForm) onAddFriendForm();
        if (onAddFriendList) onAddFriendList();
        if (setActiveSplitBillForm) setActiveSplitBillForm((prev) => !prev);
    }

    return <button onClick={(e) => handleClick(e)}>{children}</button>;
}

export default App;
