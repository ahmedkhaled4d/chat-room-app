import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../../components/ExploreContainer";
import "./Tab1.css";
import { useTranslation } from "react-i18next";

const Index: React.FC = () => {
  const [t] = useTranslation("global");
  // const [t, i18n] = useTranslation("global");
  // const handleChangeLanguage = (lang: string) => {
  //   i18n.changeLanguage(lang);
  // };
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <h1>{t("header.text")}</h1>
        <ExploreContainer name="Home Page page" />
      </IonContent>
    </IonPage>
  );
};

export default Index;
