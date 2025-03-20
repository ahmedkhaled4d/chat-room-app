import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonIcon,
  IonRow,
  IonCol,
  IonGrid,
} from "@ionic/react";
import { arrowForward } from "ionicons/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "./Home.css";

const Index: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Banner/Carousel Section with Swiper */}
        <div className="banner-section">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={0}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="banner-swiper"
          >
            <SwiperSlide>
              <div className="slide-content">
                <h1>Welcome to Our Platform</h1>
                <p>Discover amazing features and services</p>
                <IonButton>
                  Learn More <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-content">
                <h1>Special Offers</h1>
                <p>Check out our limited time promotions</p>
                <IonButton>
                  View Offers <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-content">
                <h1>Join Our Community</h1>
                <p>Connect with like-minded individuals</p>
                <IonButton>
                  Sign Up <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Sponsors Logos Horizontal Scrolling Section with Swiper */}
        <div className="sponsors-section">
          <h2>Our Sponsors</h2>
          <Swiper
            modules={[FreeMode]}
            spaceBetween={15}
            slidesPerView={3.5}
            freeMode={true}
            className="sponsors-swiper"
          >
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 1" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 2" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 3" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 4" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 5" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="sponsor-logo">
                <img src="/api/placeholder/200/100" alt="Sponsor 6" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* Main Content with Scrollbar */}
        <div className="scrollable-content">
          <IonGrid>
            <IonRow>
              <IonCol size="12" sizeMd="4">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Events</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      Join us at upcoming events and connect with our team in
                      person.
                    </p>
                    <IonButton fill="clear">See Calendar</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="12" sizeMd="4">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Resources</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>
                      Access helpful guides, tutorials, and documentation for
                      our products.
                    </p>
                    <IonButton fill="clear">Browse Resources</IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Index;
