import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from "@ionic/react";
import { useTranslation } from "react-i18next";

interface ContainerProps {
  name: string;
}

const WelcomeContainer: React.FC<ContainerProps> = ({ name }) => {
  const [t] = useTranslation("global");

  return (
    <IonCard>
      <IonCardHeader>
        <IonCardTitle>
          {t("header.text")} {name}
        </IonCardTitle>
        <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent>
        Here's a small text description for the card content. Nothing more,
        nothing less.
      </IonCardContent>
    </IonCard>
  );
};

export default WelcomeContainer;
