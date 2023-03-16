/* eslint-disable prettier/prettier */
const CONSTANT = {
  App: {
    appVersion: '1.0.0',
    delayTime: 300,

    dimen: {
      buttonPadding: 15,
    },
    BOUNDRIES: [
      [40.737077, -74.071807],
      [40.734849, -74.065991],
      [40.736851, -74.076889],
      [40.734071, -74.080318],
      [40.730809, -74.081207],
      [40.727685, -74.080045],
      [40.725138, -74.072431],
      [40.72822, -74.062767],
      [40.732394, -74.063591],
      [40.737077, -74.071807],
    ],
    colors: {
      Icon_Color: '#A7C829',
      boxBgColor: ' rgba(1, 4, 23, 1)',
      themeColor: '#e15e3e',
      placeholderColor: '#a6a6a6',
      inputBackground: '#f9fafc',

      logoColor: '#c03b2b',
      buttonColor: '#e15e3e',
      textColor: '#6e6e6e',
      whiteColor: 'white',
      blue: '#4684cf',
      fadedThemeColor: '#fca488',
      blackColor: 'black',
      coalColor: '#2D3034',

      yellow: '#FFBC36',
      green: '#007C00',
      darkGrey: '#4B4B4B',
      lightGrey: '#9C9C9C',
      superlightGrey: '#F4F4F4',
      navBarColor: '#FF572226',
      midGrey: '#7f8387',
      borderColor: '#707070',
      mealTitleColor: '#212121',

      //inukin color

      i_outline: '#999999',
      i_inputBackground: '#F9FAFC',
      i_red: '#F15223',
      i_black: '#000000',
      i_background: '#FFFFFF',
      i_lightBlack: '#3B3B3B',
      i_grey: '#F7F8FA',
      i_lightGrey: '#A3A3A3',
      i_superGrey: '#BFBFBF',
      i_nanogrey: '#A1A1A1',
      i_ultraLight: '#E8E9EB',
      i_yellow: '#FEAF18',
      i_white: '#FFFFFF',
      i_solidblue: '#172B4D',
      i_backgroundAccount: '#F9FAFC',
      i_textGrey: '#B2B2B2',
      i_textEdit: '#172B4D',
      i_imageBack: '#0055AE',
      i_time: '#7A869A',
    },
    fontSize: {
      xSmall: 10,
      small: 12,
      smallMedium: 14,
      medium: 16,
      largeMedium: 18,
      large: 20,
      xLarge: 22,
      xxLarge: 24,
      xxxLarge: 26,
      superLarge: 32,
      extremeLarge: 42,
    },
    stackNames: {
      DrawerStack: 'DrawerStack',
    },
    staticImages: {
      home: require('../assets/images/home.png'),
      dashboard: require('../assets/images/dashboard.png'),
      events: require('../assets/images/event.png'),
      prayer: require('../assets/images/prayer.png'),
      more: require('../assets/images/more.png'),
      homeA: require('../assets/images/homeA.png'),
      //   dashboardA: require('../assets/images/dashboardA.png'),
      eventsA: require('../assets/images/eventA.png'),
      prayerA: require('../assets/images/prayerA.png'),
      moreA: require('../assets/images/moreA.png'),
      profileD: require('../assets/images/profiledrop.png'),
      listen: require('../assets/images/listen.png'),

      //   //  profile: require('../utility/images/profilepic.png'),
      //    // camera: require('../utility/images/camera.png'),

      //     avatar: require('../assets/icons/avatar.png'),
      //     edit: require('../assets/icons/edit.png'),
      //     star: require('../assets/icons/star.png'),
      //     rahul: require('../assets/icons/rahul.png'),
      //     maud: require('../assets/icons/maud.png'),
      //     rachma: require('../assets/icons/rachma.png'),
      //     annabelle: require('../assets/icons/annabelle.png'),
      //     rightArrow: require('../assets/icons/rightarrow.png'),
      //     message: require('../assets/icons/Message.png'),
      //     plus: require('../assets/icons/plus.png'),
      //     user: require('../assets/icons/User.png'),
      //     home: require('../assets/icons/home-f.png'),
      //     bell: require('../assets/icons/bell.png'),
      //     trophy: require('../assets/icons/trophy.png'),
      //     back: require('../assets/icons/back.png'),
    },
    screenImages: {
      bg_Image: require('../assets/images/bgImg.png'),
      bg_Dark: require('../assets/images/bgBlack.jpg'),
      bell: require('../assets/images/bell.png'),
      logo: require('../assets/images/logo.png'),
      moon: require('../assets/images/moon.png'),
      moon_one: require('../assets/images/moon1.png'),
      calender: require('../assets/images/calender.png'),
      paypal: require('../assets/images/paypal.png'),
      blue_masjid: require('../assets/images/blue_masjid.png'),
      banner: require('../assets/images/banner.png'),
      star: require('../assets/images/star2x.png'),
      speakar: require('../assets/images/speakar.png'),
      masjid: require('../assets/images/masjid.png'),
      base: require('../assets/images/base.png'),
      contactImg: require('../assets/images/contactImg.png'),
      askImam: require('../assets/images/askImam.png'),
      newMuslim: require('../assets/images/newMuslim.png'),
    },
    tabMenu: {
      homeTAb: 'home',
      dashTab: 'dashboard',
      eventTab: 'event',
      prayerTab: 'prayer',
      moreTab: 'more',
      askImamTab:'ask_Imam',
      serviceTab:'service',
      newMuslimTab:'new_Muslim',
      weekSchoolTab:'weekend_School',
      marriageTab:'marriage_Service',
      ramzanTab:'ramdan_Service',
      funeralTab:'funeral_Service',
      consultTab:'consult_tab',
      newsLetterTab:'news_letter',
      generalTab:'general',
    },
    screenNames: {
      splash: 'splash',
      login: 'login',
      signup: 'signup',
      otp: 'otp',
      forgot: 'forgot',
      home: 'home',
      event: 'event',
      profile: 'profile',
      setting: 'setting',
      eventDetail: 'eventDetail',
      services: 'services',
      servicesDetail: 'servicesDetail',
      MoreScreen: 'more',
      Announce: 'announce',
      AnnounceDetail: 'anounceDetail',
      liveStream: 'liveStream',
      liveStreamss: 'https://vimeo.com/event/2318472/chat/',
      profileAccount: 'profileAccount',
      profileFollow: 'profileFollow',
      notification: 'notification',
      score: 'score',
      edit: 'edit',
      submitPhoto: 'submitPhoto',
      SettingScreen: 'settingScreen',
      ChangePassword: 'changePassword',
      ProfileScreen: 'profileScreen',
      ContactUs: 'contactUs',
      EditProfile: 'editProfile',
      QiblaScreen: 'qiblaScreen',
      QuranScreen: 'quranScreen',
      QuranTransScreen: 'quranTransScreen',
      HadeesScreen: 'hadeesScreen',
      AskImamScreen: 'askImamScreen',
      AskImamSettingScreen: 'askImamSettingScreen',
      ContactForm: 'contactForm',
      ContactListScreen: 'contactListScreen',
      HadeethsInfoScreen: 'hadeethsInfoScreen',
      BookDetailsScreen: 'bookDetailsScreen',
      NewMuslimScreen: 'newMuslimScreen',
      MarriageServicesScreen: 'marriageServicesScreen',
      WeekendSchoolScreen: 'weekendSchoolScreen',
      CunsultationScreen: ' cunsultationScreen',
      FuneralServicesScreen: 'funeralServicesScreen',
      FeedbackScreen: 'feedbackScreen',
      GeneralAssemblyScreen: 'generalAssemblyScreen',
      NewsLetterScreen: 'newsLetterScreen',
      Chat: 'chat',
      ChatList: 'chatList',
      Imamchat: 'Imamchat',
      Ramdan: 'ramdan',
    },
  },
  Api: {
    BaseUrl: 'http://65.1.62.192:4000/v1/',
    googleAuthKey: 'AIzaSyDQrCOcJGqu7GE-e8qabpXqrAbKj-inv9g', //Nabedish Client
    googleMapApi: 'AIzaSyAEFP-8rOX8NH9HoJf849hqKKsY6GKvGKg',
    asynckeys: 'LocoLogicLocalStorage',
    userCredentials: 'savedUserCredentials',
    TOKEN: '4YPM6ZV3NWCNC2TYM6IO',
    DailyVerse: 'https://community.sadathussain.com/api/daily-verse',
    Announcement: 'https://community.sadathussain.com/api/post?category_id=2',
    endPoints: {
      login: 'login',
      signup: 'signup',
      profile: 'users',
      profileDetail: 'users',

      generateOtp: 'auth/reset-password/generate-otp',
      validateOtp: 'auth/reset-password/validate-otp',
      changePassword: 'auth/reset-password/change-password',
      register: 'auth/register',

      logout: 'api/logout?token=',
      getUserInfo: 'api/userdata?token=',
      editProfile: 'api/update/profile',
      editImage: 'api/update/profile/image',
      getDeliveries: 'api/deliveries?token=',
      locationDetail:
        'https://maps.googleapis.com/maps/api/place/details/json?placeid=',
      searchLocation:
        'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?inputtype=textquery&key=',
      geocoding: 'https://maps.google.com/maps/api/geocode/json?key=',
      updateLocation: 'api/update/location',
      updateDeliveryStatus: 'api/delivery/status',
      endDuty: 'api/driver/endduty',
      dashboadapi: 'api/driver/dashboard',
      devliveryResponse: 'api/driver/response',
    },
  },
};

export default CONSTANT;
