import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import "./Style.css";
import { useAuth } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import {
  callOutline,
  globeOutline,
  logOutOutline,
  mailOutline,
  moonOutline,
} from "ionicons/icons";
const Index: React.FC = () => {
  const { currentUser } = useAuth();

  const auth = getAuth();
  const { i18n } = useTranslation("global");
  const [darkMode, setDarkMode] = useState(false);
  const [presentToast] = useIonToast();
  // Handle language change
  const handleLanguageChange = (event: CustomEvent) => {
    i18n.changeLanguage(event.detail.value);

    document.documentElement.dir = String(i18n.dir);
    document.documentElement.lang = String(i18n.language);

    presentToast({
      message: `Language changed to ${
        event.detail.value === "en"
          ? "English"
          : event.detail.value === "ar"
          ? "Arabic"
          : "-"
      }`,
      duration: 1500,
      position: "bottom",
    });
  };

  // Toggle dark/light theme
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark", newDarkMode);

    presentToast({
      message: `Theme changed to ${newDarkMode ? "dark" : "light"} mode`,
      duration: 1500,
      position: "bottom",
    });
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      presentToast({
        message: "Logging out...",
        duration: 1500,
        position: "bottom",
      });
      // Add your logout logic here
      console.log("User logged out");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* User Profile Card */}
        <IonCard>
          <IonCardHeader className="ion-text-center">
            <IonAvatar
              style={{ width: "80px", height: "80px", margin: "0 auto" }}
            >
              <img
                src={`https://ui-avatars.com/api/?name=${currentUser?.email}`}
                alt="avatar"
              />
            </IonAvatar>
            <IonCardTitle className="ion-padding-top">
              {currentUser?.displayName}
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              <IonItem lines="none">
                <IonIcon icon={mailOutline} slot="start" />
                <IonLabel>{currentUser?.email}</IonLabel>
              </IonItem>

              <IonItem lines="none">
                <IonIcon icon={callOutline} slot="start" />
                <IonLabel>{currentUser?.phoneNumber}</IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Settings */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Settings</IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <IonList>
              {/* Theme Toggle */}
              <IonItem>
                <IonIcon icon={moonOutline} slot="start" />
                <IonLabel>Dark Mode</IonLabel>
                <IonToggle
                  checked={darkMode}
                  onIonChange={toggleDarkMode}
                  slot="end"
                />
              </IonItem>

              {/* Language Selector */}
              <IonItem>
                <IonIcon icon={globeOutline} slot="start" />
                <IonLabel>Language</IonLabel>
                <IonSelect
                  value={i18n.language}
                  onIonChange={handleLanguageChange}
                  interface="popover"
                >
                  <IonSelectOption value="en">English</IonSelectOption>
                  <IonSelectOption value="ar">Arabic</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* Logout Button */}
        <div className="ion-padding">
          <IonButton expand="block" color="danger" onClick={handleLogout}>
            <IonIcon icon={logOutOutline} slot="start" />
            Logout
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Index;
