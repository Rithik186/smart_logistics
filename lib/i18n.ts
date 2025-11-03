// Multi-language support with translations for English, Hindi, and Tamil
export type Language = 'en' | 'hi' | 'ta'

export const translations = {
  en: {
    nav: {
      overview: 'Overview',
      localities: 'Localities',
      analytics: 'Analytics',
      settings: 'Settings',
    },
    dashboard: {
      welcome: 'Welcome to SmartLogistics',
      subtitle: 'Monitor and manage your returnable delivery boxes across all localities',
      upcomingFeature: 'Upcoming Feature',
      comingSoon: 'Coming Soon',
    },
    metrics: {
      totalBoxes: 'Total Boxes',
      activeLocalities: 'Active Localities',
      inTransit: 'In Transit',
      alerts: 'Alerts',
      systemHealth: 'System Health',
      boxUtilization: 'Box Utilization',
    },
    recentActivity: {
      title: 'Recent Activity',
      subtitle: 'Latest box movements and updates',
    },
    systemStatus: {
      title: 'System Status',
      subtitle: 'Current operational status',
      trackingSystem: 'Tracking System',
      qrScanner: 'QR Scanner Network',
      databaseSync: 'Database Sync',
      alertSystem: 'Alert System',
    },
  },
  hi: {
    nav: {
      overview: 'अवलोकन',
      localities: 'स्थान',
      analytics: 'विश्लेषण',
      settings: 'सेटिंग्स',
    },
    dashboard: {
      welcome: 'SmartLogistics में स्वागत है',
      subtitle: 'सभी स्थानों पर अपने पुनः प्रयोज्य डिलीवरी बॉक्स की निगरानी और प्रबंधन करें',
      upcomingFeature: 'आने वाली सुविधा',
      comingSoon: 'जल्द आ रहा है',
    },
    metrics: {
      totalBoxes: 'कुल बॉक्स',
      activeLocalities: 'सक्रिय स्थान',
      inTransit: 'पारगमन में',
      alerts: 'सतर्कता',
      systemHealth: 'सिस्टम स्वास्थ्य',
      boxUtilization: 'बॉक्स उपयोग',
    },
    recentActivity: {
      title: 'हाल की गतिविधि',
      subtitle: 'नवीनतम बॉक्स आंदोलन और अपडेट',
    },
    systemStatus: {
      title: 'सिस्टम स्थिति',
      subtitle: 'वर्तमान परिचालन स्थिति',
      trackingSystem: 'ट्रैकिंग सिस्टम',
      qrScanner: 'QR स्कैनर नेटवर्क',
      databaseSync: 'डेटाबेस सिंक',
      alertSystem: 'सतर्कता प्रणाली',
    },
  },
  ta: {
    nav: {
      overview: 'கண்ணோட்டம்',
      localities: 'இடங்கள்',
      analytics: 'பகுப்பாய்வு',
      settings: 'அமைப்புகள்',
    },
    dashboard: {
      welcome: 'SmartLogistics இற்கு வரவேற்கிறோம்',
      subtitle: 'அனைத்து இடங்களிலும் உங்கள் மீண்டும் பயன்படுத்தக்கூடிய டெலிவரி பெட்டிகளை கண்காணிக்கவும் நிர்வகிக்கவும்',
      upcomingFeature: 'விரைவில் வரும் அம்சம்',
      comingSoon: 'விரைவில் வருகிறது',
    },
    metrics: {
      totalBoxes: 'மொத்த பெட்டிகள்',
      activeLocalities: 'செயல்படும் இடங்கள்',
      inTransit: 'பகிரப்பாக்கின் போது',
      alerts: 'எச்சரிக்கைகள்',
      systemHealth: 'கணினி ஆரோக்கியம்',
      boxUtilization: 'பெட்டி பயன்பாடு',
    },
    recentActivity: {
      title: 'சமீபத்திய செயல்பாடு',
      subtitle: 'சமீபத்திய பெட்டி இயக்கங்கள் மற்றும் புதுப்பிப்புகள்',
    },
    systemStatus: {
      title: 'கணினி நிலை',
      subtitle: 'தற்போதைய செயல்பாட்டு நிலை',
      trackingSystem: 'கண்காணிப்பு முறை',
      qrScanner: 'QR ஸ்கேனர் நெட்வொர்க்',
      databaseSync: 'தரவுத்தளம் ஒத்திசைவு',
      alertSystem: 'எச்சரிக்கை அமைப்பு',
    },
  },
}

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}
