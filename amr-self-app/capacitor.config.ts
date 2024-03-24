import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'amr.self.app',
  appName: 'AMR Self-Reporting App',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
