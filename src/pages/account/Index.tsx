import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Style.css";
import WelcomeContainer from "../../components/welcome/WelcomeContainer";

const Index: React.FC = () => {
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
            <IonTitle size="large">Account Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <WelcomeContainer name="Account Page page" />
      </IonContent>
    </IonPage>
  );
};

export default Index;
