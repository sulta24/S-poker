# ♠️ S-Poker — Texas Hold'em Online Game

🎥 **Demo:** [https://youtu.be/Ql5WW0ta3jU](https://youtu.be/Ql5WW0ta3jU)

**S-Poker** is an online implementation of Texas Hold'em Poker, designed for both playing with friends and solo mode.  
The app includes betting logic, player actions (fold, check, bet), winner determination, and a visualized poker table.  
Future plans include a full multiplayer system and the development of AI opponents.

---

## 🚀 Installation and Run

**Tech Stack:** `React`, `Node.js`

### Installation:

```bash
npm install
```

> ⚠️ **Important:** Use **React 16**, as some dependencies do not support newer versions.

### Run:

```bash
npm start
```

This will launch a local server on **port 3000**.  
For more details, check the `server.js` file.

---

## 🧩 Project Structure and Development

- Poker logic is implemented in the `Poker.js` file, based on open-source code and manually refined.
- UI components (cards, board, control panel) are organized in the `components/` folder.
- The architecture separates logic from the UI, making debugging and scaling easier.
- The interface is not yet optimized for mobile devices.

---

## ✨ Unique Features

- Custom-built poker engine with full customization support.
- Minimalistic and modern visual design.
- Complete control over gameplay and player actions.
- All core game logic runs on the client side.

---

## ⚖️ Trade-offs and Simplifications

- AI players can currently only check and continue when no human player is present.
- Betting is implemented only for the main player.
- Multiplayer is under development, but the architecture is already designed with it in mind.
- The interface needs responsiveness improvements and better UX/UI design.

---

## 🐞 Known Issues

- Possible dependency installation errors.  
  Make sure all libraries are compatible with **React 16**.
- Some interface components may behave inconsistently or need further polishing.
- No player registration or session management is currently implemented.

---

## 🧠 Why This Stack

- **React** — a popular and convenient library for building user interfaces.
- **Node.js** — a lightweight and flexible framework for server logic that integrates well with React.
