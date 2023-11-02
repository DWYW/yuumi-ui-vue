## 自定义主题

基于 sass 的 Default Values;

``` js
// vite.config.js
{
  //...
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import 'path/global-variables.scss';`
      }
    }
  }
  //...
}
```


``` js
// vue.config.js
{
  //...
  css: {
    loaderOptions: {
      sass: {
        prependData: `import 'path/global-variables.scss';`
      }
    }
  },
  //...
}
```

``` scss
// global-variables.scss

$--color: (
  "primary": #0d6efd,
  "success": #00b450,
  "danger": #dc3545,
  "warn": #ffc107,
  "info": #0dcaf0,
  "white": #ffffff,
  "black": #000000,
  "light": mix(#000000, #FFFFFF, 4%),
  "dark": mix(#000000, #FFFFFF, 96%),
  "disabled": mix(#000000, #FFFFFF, 25%),
  "border": mix(#000000, #FFFFFF, 15%),
  "placeholder": mix(#000000, #FFFFFF, 15%),
  "divider": mix(#000000, #FFFFFF, 6%),
  "mask": rgba(#000000, 0.3),
);

$--text-color: (
  "primary": mix(#000000, #FFFFFF, 85%),
  "secondary": mix(#000000, #FFFFFF, 65%),
  "tertiary": mix(#000000, #FFFFFF, 45%),
);

$--shadow-color: (
  "primary":  rgba(0, 0, 0, 0.16),
  "secondary":rgba(0, 0, 0, 0.12),
  "tertiary": rgba(0, 0, 0, 0.08),
);

$--height: (
  "xm": 24px,
  "sm": 28px,
  "md": 32px,
  "lg": 38px,
  "xl": 46px
);

$--font-size: (
  "xm": 12px,
  "sm": 14px,
  "md": 16px,
  "lg": 20px,
  "xl": 24px
);

$--space: (
  "xxm": 4px,
  "xm": 8px,
  "sm": 16px,
  "md": 24px,
  "lg": 32px,
  "xl": 40px
);

$--border-radius: (
  "default": 4px,
  "mini": 2px,
  "round": 9999px,
  "circle": 100%
);
```