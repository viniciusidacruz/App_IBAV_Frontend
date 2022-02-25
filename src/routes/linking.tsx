import * as Linking from 'expo-linking'
import { LinkingOptions } from '@react-navigation/native/lib/typescript/src/types'

export const linkink: LinkingOptions<any> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      home: 'home',
      members: 'members',
      membersReport: 'membersReport',
      preLoad: 'preLoad',
      register: 'register',
      sendReport: 'sendReport',
      signIn: 'signIn',
      visitorsReport: 'visitorsReport'
    }
  }
}
