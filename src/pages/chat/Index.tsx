import React, { useState, useEffect, useRef } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonFooter,
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
  IonText,
  IonSpinner,
  useIonViewDidEnter,
} from "@ionic/react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import "./Style.css";
import { app } from "../../firebase/config";

// Replace with your Firebase config

// Initialize Firebase
const db = getFirestore(app);

interface Message {
  id: string;
  text: string;
  userId: string;
  userName: string;
  timestamp: Date;
}

const Index: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const contentRef = useRef<HTMLIonContentElement>(null);

  // Mock user data (in a real app, you would use Firebase Authentication)
  const currentUser = {
    id: "user1",
    name: "Ahmed Khaled",
    avatar: "https://eayni-assets.s3.amazonaws.com/app/profiles/user2.jpg",
  };

  useEffect(() => {
    // Query messages from Firestore
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          text: data.text,
          userId: data.userId,
          userName: data.userName,
          timestamp: data.timestamp,
        };
      });

      setMessages(newMessages);
      setLoading(false);

      // Scroll to bottom on new messages
      setTimeout(() => {
        contentRef.current?.scrollToBottom(300);
      }, 100);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newMessage.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        userId: currentUser.id,
        userName: currentUser.name,
        timestamp: serverTimestamp(),
      });

      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useIonViewDidEnter(() => {
    contentRef.current?.scrollToBottom(300);
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formatTime = (timestamp: any) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Chat Room</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="ion-padding">
        {loading ? (
          <div className="loading-container">
            <IonSpinner name="dots" />
            <p>Loading messages...</p>
          </div>
        ) : (
          <IonList>
            {messages.map((message) => (
              <IonItem
                key={message.id}
                className={
                  message.userId === currentUser.id ? "my-message" : ""
                }
              >
                {message.userId !== currentUser.id && (
                  <IonAvatar slot="start">
                    <img
                      src={`https://ui-avatars.com/api/?name=${message.userName}`}
                      alt="avatar"
                    />
                  </IonAvatar>
                )}
                <div className="message-content">
                  <IonLabel className="message-header">
                    <h2>
                      {message.userId === currentUser.id
                        ? "You"
                        : message.userName}
                    </h2>
                    <p> {formatTime(message.timestamp)}</p>
                  </IonLabel>
                  <IonText className="message-text">
                    <p>{message.text}</p>
                  </IonText>
                </div>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>

      <IonFooter>
        <form onSubmit={sendMessage} className="message-form">
          <IonItem>
            <IonInput
              placeholder="Type a message"
              value={newMessage}
              onIonInput={(e) => setNewMessage(e.detail.value || "")}
              clearInput
            />
            <IonButton type="submit" disabled={newMessage.trim() === ""}>
              Send
            </IonButton>
          </IonItem>
        </form>
      </IonFooter>
    </IonPage>
  );
};

export default Index;
