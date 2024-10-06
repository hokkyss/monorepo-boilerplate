import { UnistylesRegistry } from 'react-native-unistyles';

import palette from './palette.config';

const breakpoints = {
  lg: 992,
  md: 768,
  sm: 576,
  superLarge: 2000,
  tvLike: 4000,
  xl: 1200,
  xs: 0,
} as const;

const lightTheme = {
  colors: {
    background: palette.grey[0],
    typography: palette.grey[900],
  },
  margins: {
    lg: 8,
    md: 4,
    sm: 2,
    xl: 12,
  },
  mode: 'light',
} as const;

const darkTheme = {
  colors: {
    background: palette.grey[900],
    typography: palette.grey[0],
  },
  margins: {
    lg: 8,
    md: 4,
    sm: 2,
    xl: 12,
  },
  mode: 'dark',
} as const;

type AppBreakpoints = typeof breakpoints;
type AppThemes = {
  dark: typeof darkTheme;
  light: typeof lightTheme;
};

declare module 'react-native-unistyles' {
  export interface UnistylesBreakpoints extends AppBreakpoints {}
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addBreakpoints(breakpoints)
  .addThemes({
    dark: darkTheme,
    light: lightTheme,
  })
  .addConfig({
    adaptiveThemes: true,
    plugins: [
      {
        name: 'font scaling',
        onParsedStyle(styleKey, style, runtime) {
          const scalableProperties = [
            'gap',
            'columnGap',
            'rowGap',
            'width',
            'minWidth',
            'maxWidth',
            'height',
            'minHeight',
            'maxHeight',
            'top',
            'bottom',
            'left',
            'right',
            'start',
            'end',
            'padding',
            'paddingHorizontal',
            'paddingVertical',
            'paddingTop',
            'paddingBottom',
            'paddingLeft',
            'paddingRight',
            'paddingStart',
            'paddingEnd',
            'margin',
            'marginHorizontal',
            'marginVertical',
            'marginTop',
            'marginBottom',
            'marginLeft',
            'marginRight',
            'marginStart',
            'marginEnd',
          ] as const;

          scalableProperties.forEach((prop) => {
            const styleValue = style[prop];
            if (typeof styleValue === 'number') {
              style[prop] = styleValue * runtime.fontScale;
            }
          });

          return style;
        },
      },
    ],
  });

export default {};
