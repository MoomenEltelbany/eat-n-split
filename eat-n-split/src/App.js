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
            <section className="friends-list">
                <div className="friend-data">
                    <img
                        src="https://i.pravatar.cc/48?u=933372"
                        alt="Friend's"
                    />
                    <div className="friend-info">
                        <p className="name">Clark</p>
                        <p className="money-state">You owe Anna 7€</p>
                    </div>
                    <button>Close</button>
                </div>
                <div className="friend-data">
                    <img
                        src="https://i.pravatar.cc/48?u=933372"
                        alt="Friend's"
                    />
                    <div className="friend-info">
                        <p className="name">Clark</p>
                        <p className="money-state">You owe Anna 7€</p>
                    </div>
                    <button>Close</button>
                </div>
                <div className="friend-data">
                    <img
                        src="https://i.pravatar.cc/48?u=933372"
                        alt="Friend's"
                    />
                    <div className="friend-info">
                        <p className="name">Clark</p>
                        <p className="money-state">You owe Anna 7€</p>
                    </div>
                    <button>Close</button>
                </div>
                <button>Add friend</button>
                <form>
                    <div>
                        <label>Friend's name 😍?</label>
                        <input type="text" placeholder="Friend's name ..." />
                    </div>
                    <div>
                        <label>Friend's photo 📸?</label>
                        <input type="text" placeholder="Friend's photo ..." />
                    </div>
                </form>
            </section>
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
                <button>Split Bill</button>
            </aside>
        </main>
    );
}

export default App;
