import {
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSpinner,
  IonText,
  IonToast,
} from "@ionic/react";
import "./Style.css";
import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { app } from "../../firebase/config";
import { lockClosedOutline, logoGoogle, mailOutline } from "ionicons/icons";

const Index: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const auth = getAuth(app);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // If successful, the user will be redirected by the auth state listener
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to sign in");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // If successful, the user will be redirected by the auth state listener
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || "Failed to sign in with Google");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen className="ion-padding">
        <div className="login-container">
          <div className="logo-container">
            <IonImg
              src="/assets/logo.svg"
              alt="App Logo"
              className="app-logo"
            />
            <IonText color="primary">
              <h1>Welcome Back</h1>
            </IonText>
            <IonText>
              <p>Sign in to continue to your account</p>
            </IonText>
          </div>

          <form onSubmit={handleEmailLogin} className="login-form">
            <IonItem className="ion-margin-bottom">
              <IonIcon slot="start" icon={mailOutline} />
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
                required
              />
            </IonItem>

            <IonItem className="ion-margin-bottom">
              <IonIcon slot="start" icon={lockClosedOutline} />
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
                required
              />
            </IonItem>

            <IonText className="forgot-password" color="medium">
              <p>Forgot Password?</p>
            </IonText>

            <IonButton
              expand="block"
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading ? <IonSpinner name="dots" /> : "Sign In"}
            </IonButton>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <IonButton
            expand="block"
            fill="outline"
            className="google-button"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <IonIcon slot="start" icon={logoGoogle} />
            Sign in with Google
          </IonButton>

          <div className="signup-prompt">
            <IonText color="medium">
              <p>
                Don't have an account?{" "}
                <span className="signup-link">Sign Up</span>
              </p>
            </IonText>
          </div>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={error || "An error occurred"}
          duration={3000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Index;
