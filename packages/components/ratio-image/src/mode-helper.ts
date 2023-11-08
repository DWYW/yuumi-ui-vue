export function useMode() {
  function getModeStyle(mode: string) {
    const modeStyle: {[x:string]: object } = {
      'scaleToFill': { backgroundSize: '100% 100%' },
      'aspectFit': { backgroundSize: 'contain', backgroundPosition: 'center' },
      'aspectFill': { backgroundSize: 'cover', backgroundPosition: 'center' },
      'top': { backgroundPosition: 'top center' },
      'bottom': { backgroundPosition: 'bottom center' },
      'center': { backgroundPosition: 'center' },
      'left': { backgroundPosition: 'center left' },
      'right': { backgroundPosition: 'center right' },
      'top left': { backgroundPosition: 'top left' },
      'top right': { backgroundPosition: 'top right' },
      'bottom left': { backgroundPosition: 'bottom left' },
      'bottom right': { backgroundPosition: 'bottom right' },
    }

    return modeStyle[mode] || {}
  }

  return {
    getModeStyle
  }
}