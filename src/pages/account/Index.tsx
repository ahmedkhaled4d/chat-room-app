import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Style.css";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
const Index: React.FC = () => {
  const { currentUser } = useAuth();
  const auth = getAuth();
  // const [t, i18n] = useTranslation("global");
  // const handleChangeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Account Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Hi {currentUser?.displayName || currentUser?.email || "Geust"}
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonButton expand="block" onClick={handleLogout}>
          Logout
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Index;
