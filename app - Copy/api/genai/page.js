"use client";

import { useState } from 'react';
import styles from './Chat.module.css';

export default function Home() {
  const [message, setMessage] = useState('');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Minecraft Chat</h1>
      <div className={styles.chatWindow}>
        <p>Test message</p>
      </div>
      <form className={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Send</button>
      </form>
    </div>
  );
}