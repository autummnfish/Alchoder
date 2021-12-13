import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import {   bookmarkOutline, informationCircleOutline, beerOutline, beerSharp, receiptOutline, informationCircleSharp, receiptSharp} from 'ionicons/icons';
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'お酒を登録する',
    url: '/page/Home',
    iosIcon: beerOutline,
    mdIcon: beerSharp
  },
  {
    title: '飲酒ログ',
    url: '/page/DrinkLog',
    iosIcon: receiptOutline,
    mdIcon: receiptSharp
  },
  {
    title: 'Info',
    url: '/page/Info',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  }
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Alchoder</IonListHeader>
          <IonNote>飲んだお酒を登録しましょう</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
