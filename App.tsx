// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  *
//  * @format
//  */
// import HelloWord from './android/app/src/components/buoi1/Helloword';
// import Prop from './android/app/src/components/buoi1/Prop';
// import State from './android/app/src/components/buoi1/State';
// import LinearEquationSolver from './android/app/src/components/buoi1/linearEquationSolver';
// import ParentComponent from './android/app/src/components/buoi2/Propstate';
// import React from 'react';
// import type {PropsWithChildren} from 'react';
// import {
//   FlatList,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import Calculator from './android/app/src/components/buoi3/caculator';
// import BMICalculator from './android/app/src/components/buoi3/bmi';
// // import Layout from './android/app/src/components/buoi4/layout';
// import Flat from './android/app/src/components/buoi4/flatlist';
// import StudentManager from './android/app/src/components/buoi5/mgstudent';
// import Sanpham3Sqlite from './android/app/src/components/buoi6/Sanpham3Sqlite';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

// function Section({children, title}: SectionProps): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';
//   return (
//     <View style={styles.sectionContainer}>
//       <Text
//         style={[
//           styles.sectionTitle,
//           {
//             color: isDarkMode ? Colors.white : Colors.black,
//           },
//         ]}>
//         {title}
//       </Text>
//       <Text
//         style={[
//           styles.sectionDescription,
//           {
//             color: isDarkMode ? Colors.light : Colors.dark,
//           },
//         ]}>
//         {children}
//       </Text>
//     </View>
//   );
// }

// function App(): JSX.Element {
//   const isDarkMode = useColorScheme() === 'dark';

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//   };

//   return (
//     // <SafeAreaView style={backgroundStyle}>
//     //   <StatusBar
//     //     barStyle={isDarkMode ? 'light-content' : 'dark-content'}
//     //     backgroundColor={backgroundStyle.backgroundColor}
//     //   />
//     //   <ScrollView
//     //     contentInsetAdjustmentBehavior="automatic"
//     //     style={backgroundStyle}>
//     //     <Header />
//     //     <View
//     //       style={{
//     //         backgroundColor: isDarkMode ? Colors.black : Colors.white,
//     //       }}>
//     //       <HelloWord></HelloWord>
//     //       <Section title="Step One">
//     //         Edit <Text style={styles.highlight}>App.tsx</Text> to change this
//     //         screen and then come back to see your edits. Okey dokey!
//     //       </Section>
//     //       <Section title="See Your Changes">
//     //         <ReloadInstructions />
//     //       </Section>
//     //       <Section title="Debug">
//     //         <DebugInstructions />
//     //       </Section>
//     //       <Section title="Learn More">
//     //         Read the docs to discover what to do next:
//     //       </Section>
//     //       <LearnMoreLinks />
//     //     </View>
//     //   </ScrollView>
//     // </SafeAreaView>
//     // <Prop name='Mai Tram' age={20}></Prop>
//     // <State/>
//     // <LinearEquationSolver></LinearEquationSolver>
//     // <Calculator/>
//     // <BMICalculator/>
//     // <Layout/>
//     // <Flat/>
//     // <StudentManager/>
//     <Sanpham3Sqlite></Sanpham3Sqlite>
//     // <ParentComponent></ParentComponent>
//     // <HelloWord></HelloWord>
//   );
// }

// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   highlight: {
//     fontWeight: '700',
//   },
// });

// export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigatorProduct from './android/app/src/components/buoi6/AppNavigatorProduct'; 
import AppTabs from './android/app/src/components/buoi6/AppTabs';

const App = () => {
  return (
    <NavigationContainer>
      {/* <AppNavigatorProduct /> */}
      <AppTabs />
    </NavigationContainer>
  );
};

export default App;
